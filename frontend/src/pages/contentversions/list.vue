<template>
    <main class="main-page"  id="">
        <template v-if="showHeader">
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid justify-content-between align-items-center">
                        <div  class="col " >
                            <div class=" text-2xl text-primary font-bold" >
                                {{ $t('contentVersions') }}
                            </div>
                        </div>
                        <div  class="col-fixed " >
                            <template v-if="auth.canView('contentversions/add')">
                                <router-link :to="`/contentversions/add`">
                                    <Button :label="$t('addNewContentVersion')" icon="pi pi-plus" type="button" class="p-button w-full bg-primary "  />
                                </router-link>
                            </template>
                        </div>
                        <div  class="col-12 md:col-3 " >
                            <span class="p-input-icon-left w-full">
                            <i class="pi pi-search" />
                            <InputText  :placeholder="$t('search')" class="w-full" :value="filters.search.value" @input="debounce(() => { filters.search.value = $event.target.value })"  />
                            </span>
                        </div>
                        
                    </div>
                </div>
            </section>
        </template>
        <section class="page-section " >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class="flex align-items-center">
                            <filter-tags :controller="page.filterController" />
                        </div>
                        <div >
                            <template v-if="showBreadcrumbs && $route.query.tag && !isSubPage">
                                <Breadcrumb :home="{icon: 'pi pi-home', to: '/contentversions'}" :model="pageBreadCrumb" />
                            </template>
                            <!-- page records template -->
                            <div class="page-records"  >
                                <DataTable :lazy="true"   :loading="loading"    v-model:selection="selectedItems"
                                     :value="records" dataKey="version_id" @sort="onSort($event)" class=" p-datatable-sm" :stripedRows ="true" :showGridlines="false" :rowHover="true" responsiveLayout="stack">
                                    <Column selectionMode="multiple" headerStyle="width: 2rem" />
                                        <Column  field="version_id" :header="$t('versionId')" >
                                            <template #body="{ data, index }">
                                                <router-link :to="`/contentversions/view/${data.version_id}`">
                                                    {{ data.version_id }}
                                                </router-link>
                                            </template>
                                        </Column>
                                        <Column  field="content_id" :header="$t('contentId')" >
                                            <template #body="{ data, index }">
                                                <Button class="p-button-text" icon="pi pi-eye" :label="$t('contents')" v-if="data.content_id" @click="app.openPageDialog({ page: 'contents/view', url: `/contents/view/${data.content_id}` , closeBtn: true })" />
                                            </template>
                                        </Column>
                                        <Column  field="created_at" :header="$t('createdAt')" >
                                            <template #body="{ data, index }">
                                                {{ data.created_at }}
                                            </template>
                                        </Column>
                                        <Column  field="content_type" :header="$t('contentType')" >
                                            <template #body="{ data, index }">
                                                {{ data.content_type }}
                                            </template>
                                        </Column>
                                        <Column  field="title" :header="$t('title')" >
                                            <template #body="{ data, index }">
                                                {{ data.title }}
                                            </template>
                                        </Column>
                                        <Column  field="description" :header="$t('description')" >
                                            <template #body="{ data, index }">
                                                {{ data.description }}
                                            </template>
                                        </Column>
                                        <Column  field="medium" :header="$t('medium')" >
                                            <template #body="{ data, index }">
                                                {{ data.medium }}
                                            </template>
                                        </Column>
                                        <Column  field="dimensions" :header="$t('dimensions')" >
                                            <template #body="{ data, index }">
                                                {{ data.dimensions }}
                                            </template>
                                        </Column>
                                        <Column  field="contagname_tag_names" :header="$t('contagnameTagNames')" >
                                            <template #body="{ data, index }">
                                                {{ data.contagname_tag_names }}
                                            </template>
                                        </Column>
                                        <Column  field="year_created" :header="$t('yearCreated')" >
                                            <template #body="{ data, index }">
                                                {{ data.year_created }}
                                            </template>
                                        </Column>
                                        <Column  field="art_image" :header="$t('artImage')" >
                                            <template #body="{ data, index }">
                                                <image-viewer image-size="small" image-preview-size="" :src="data.art_image" width="50px" height="50px" class="img-fluid" :num-display="1">
                                                </image-viewer>
                                            </template>
                                        </Column>
                                        <Column  headerStyle="width: auto" headerClass="text-center">
                                            <template #body="{ data, index }">
                                                <div class="flex justify-content-end">
                                                    <Menubar class="p-0 " ref="actionMenu" :model="getActionMenuModel(data)" />
                                                </div>
                                            </template>
                                        </Column>
                                    </DataTable>
                                </div>
                                <!-- Empty record -->
                                <template v-if="pageReady && !records.length">
                                    <div class="p-3 my-3 text-500 text-lg font-medium text-center">
                                        {{ $t('noRecordFound') }}
                                    </div>
                                </template>
                                <!-- end of empty record-->
                                <!-- pagination component-->
                                <template v-if="showFooter && pageReady">
                                    <div class="grid justify-content-between align-items-center">
                                        <div class="flex gap-2 flex-grow-0">
                                            <template v-if="auth.canView('contentversions')">
                                                <div v-if="selectedItems.length" class="m-2">
                                                    <Button @click="deleteItem(selectedItems)" icon="pi pi-trash" class="p-button-danger" :title="$t('deleteSelected')" />
                                                </div>
                                            </template>
                                        </div>
                                        <div v-if="paginate && totalPages > 1" class="flex-grow-1">
                                            <Paginator class="paginator-flat my-3" :first="recordsPosition - 1" @page="(event)=>{pagination.page = event.page + 1}" :rows="pagination.limit" :totalRecords="totalRecords">
                                                <template #start>
                                                    <span class="px-2">
                                                    {{ $t('records') }} <b>{{ recordsPosition }} {{ $t('of') }} {{ totalRecords }}</b>
                                                    </span>
                                                </template>
                                                <template #end>
                                                </template>
                                            </Paginator>
                                        </div>
                                    </div>
                                </template>
                                <!-- end of pagination component-->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid ">
                        <div  class="col comp-grid" >
                            <div class="">
                                <div class="button-container">
                                    <!-- 输入框 -->
                                    <input 
                                    type="text" 
                                    v-model="versionId" 
                                    placeholder="输入要回滚的版本 ID" 
                                    class="input-field"
                                    />
                                    <!-- 回滚按钮 -->
                                    <button
                                    class="button rollback-btn"
                                    v-on:click="rollback"
                                    >
                                    回滚版本
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
</template>
<script setup>
	import {  ref, toRefs, onMounted } from 'vue';
	import { ApiService } from 'src/services/api';
	import { usePageStore } from 'src/store/page';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { useListPage } from 'src/composables/listpage.js';
	
	const props = defineProps({
		primaryKey : {
			type : String,
			default : 'version_id',
		},
		pageStoreKey: {
			type: String,
			default: 'CONTENTVERSIONS',
		},
		pageName: {
			type: String,
			default : 'contentversions',
		},
		routeName: {
			type: String,
			default: 'contentversionslist',
		},
		apiPath: {
			type: String,
			default: 'contentversions/index',
		},
		autoLoad: {
			type: Boolean,
			default: true,
		},
		enableCache: {
			type: Boolean,
			default: false,
		},
		paginate: {
			type: Boolean,
			default: true,
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		showBreadcrumbs: {
			type: Boolean,
			default: true,
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		importButton: {
			type: Boolean,
			default: false,
		},
		multiCheckbox: {
			type: Boolean,
			default: true,
		},
		page: {
			type: Number,
			default: 1,
		},
		limit: {
			type: Number,
			default: 10,
		},
		mergeRecords: { // for infinite loading
			type: Boolean,
			default: false,
		},
		search: {
			type: String,
			default: '',
		},
		fieldName: null,
		fieldValue: null,
		queryParams: { 
			type: Object,
			default: () => ({})
		},
		sortBy: {
			type: String,
			default: '',
		},
		sortType: {
			type: String,
			default: 'desc', //desc or asc
		},
		isSubPage: {
			type: Boolean,
			default: false,
		},
		emptyRecordMsg: {
			type: String,
			default: () => $t('noRecordFound'),
		},
		titleBeforeDelete: {
			type: String,
			default: $t('deleteRecord'),
		},
		msgBeforeDelete: {
			type: String,
			default: () => $t('promptDeleteRecord'),
		},
		msgAfterDelete: {
			type: String,
			default: () => $t('recordDeletedSuccessfully'),
		},
		filterTagClass: {
			type: String,
			default: 'surface-card p-2 text-500 flex-grow-1 text-center m-1 mb-3 flex-grow-1 text-center',
		}
	});
	
	const app = useApp();
	const auth = useAuth();
	
	const defaultStoreState = {
		filters: {
			search: {
				tag: "Search",
				value: '',
				valueType: 'single',
				options: [],
			}
		},
		pagination: {
			page: props.page,
			limit: props.limit,
			sortBy: props.sortBy,
			sortType: props.sortType
		},
		primaryKey: props.primaryKey,
		enableCache: props.enableCache
	}
	const store = usePageStore(props.pageStoreKey,  defaultStoreState);
	
	// page hooks where logics resides
	const page = useListPage({ store, props });
	
	const {records, filters,  totalRecords,  selectedItems,  pagination,} = toRefs(store.state);
	const { pageReady, loading, } = toRefs(page.state);
	
	const {  pageBreadCrumb,   totalPages, recordsPosition, } = page.computedProps;
	
	const { load,    exportPage, debounce, onSort,  deleteItem,    } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('view'),
			to: `/contentversions/view/${data.version_id}`,
			icon: "pi pi-eye",
			visible: auth.canView('contentversions/view')
		},
		{
			label: () => $t('edit'),
			to: `/contentversions/edit/${data.version_id}`,
			icon: "pi pi-pencil",
			visible: auth.canView('contentversions/edit')
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.version_id) },
			icon: "pi pi-trash",
			visible: auth.canView('contentversions/delete')
		}
	]
	}
	
	onMounted(()=>{ 
		const pageTitle = $t('contentVersions');
		app.setPageTitle(props.routeName, pageTitle);
	});
	const versionId = ref("");
const rollbackStatus = ref("");
// 回滚方法
const rollback = async () => {
    try {
        if (!versionId.value) {
            alert("请输入要回滚的版本 ID");
            return;
        }
        console.log("回滚版本 ID:", versionId.value);
        // 调用版本回滚 API
        const response = await versionRollback(versionId.value);
        // 根据 API 返回值更新状态
        if (response && response.success) {
            rollbackStatus.value = `回滚成功: 版本 ${versionId.value} 已恢复`;
            console.log("回滚成功:", response);
            } else {
            rollbackStatus.value = `回滚失败: ${response?.message || "未知错误"}`;
            console.error("回滚失败:", response);
        }
        } catch (error) {
        rollbackStatus.value = `回滚失败: ${error.message}`;
        console.error("回滚过程出错:", error);
    }
};
// 调用 API 的回滚功能
async function versionRollback(versionId) {
    console.log("执行 versionRollback 方法...");
    try {
        const response = await ApiService.get(`contentversions/rollback/${versionId}`);
        return response.data;
        } catch (error) {
        console.error("版本回滚请求失败:", error);
        throw error; // 抛出错误以便在调用方捕获
    }
}
</script>
<style scoped>
/* 整体容器 */
.button-container {
  display: flex;
  justify-content: space-between; /* 水平分布 */
  align-items: center;
  gap: 10px;
  max-width: 500px;
  margin: 20px auto;
}
/* 输入框样式 */
.input-field {
  width: 70%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}
.input-field:focus {
  border-color: #66afe9;
  outline: none;
}
/* 按钮样式 */
.rollback-btn {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff; /* 蓝色按钮 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.rollback-btn:hover {
  background-color: #0056b3; /* 鼠标悬停时更深的蓝色 */
}
.rollback-btn:active {
  background-color: #004085; /* 点击时的深蓝色 */
}
</style>
