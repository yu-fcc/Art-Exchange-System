<template>
    <main class="main-page"  id="">
        <template v-if="pageReady">
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid ">
                        <div  class="col-3 comp-grid" >
                            <record-count api-path="components_data/getcount_follows" max="" v-slot="record">
                            <router-link  :to="`/follows`">
                                <div class="card bg-blue-100 text-blue-800 " >
                                    <div class="flex align-items-center justify-content-between">
                                        <div>
                                            <div class="font-medium text-lg">Follows</div>
                                            <div class="font-bold text-4xl" v-if="!record.loading">{{ record.num }}</div>
                                            <Skeleton v-else width="3rem" height="2rem" class="m-2" />
                                            <div class="text-500 text-sm">Total Follows</div>
                                        </div>
                                        <div style="width:auto;">
                                            <Avatar icon="pi pi-heart-fill" size="large" class="bg-blue-600 text-blue-100" />
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                                </record-count>
                            </div>
                            <div  class="col-sm-4 col-md-4 col-3 comp-grid" >
                                <record-count api-path="components_data/getcount_contents" max="" v-slot="record">
                                <router-link  :to="`/contents`">
                                    <div class="card bg-blue-100 text-blue-800 " >
                                        <div class="flex align-items-center justify-content-between">
                                            <div>
                                                <div class="font-medium text-lg">Contents</div>
                                                <div class="font-bold text-4xl" v-if="!record.loading">{{ record.num }}</div>
                                                <Skeleton v-else width="3rem" height="2rem" class="m-2" />
                                                <div class="text-500 text-sm">Total Contents</div>
                                            </div>
                                            <div style="width:auto;">
                                                <Avatar icon="pi pi-th-large" size="large" class="bg-blue-600 text-blue-100" />
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                    </record-count>
                                </div>
                                <div  class="col-sm-4 col-md-4 col-3 comp-grid" >
                                    <record-count api-path="components_data/getcount_likes" max="" v-slot="record">
                                    <router-link  :to="`/likes`">
                                        <div class="card bg-blue-100 text-blue-800 " >
                                            <div class="flex align-items-center justify-content-between">
                                                <div>
                                                    <div class="font-medium text-lg">Likes</div>
                                                    <div class="font-bold text-4xl" v-if="!record.loading">{{ record.num }}</div>
                                                    <Skeleton v-else width="3rem" height="2rem" class="m-2" />
                                                    <div class="text-500 text-sm">Total Likes</div>
                                                </div>
                                                <div style="width:auto;">
                                                    <Avatar icon="pi pi-star-fill" size="large" class="bg-blue-600 text-blue-100" />
                                                    </div>
                                                </div>
                                            </div>
                                        </router-link>
                                        </record-count>
                                    </div>
                                    <div  class="col-sm-4 col-md-4 col-3 comp-grid" >
                                        <record-count api-path="components_data/getcount_bookmarks" max="" v-slot="record">
                                        <router-link  :to="`/bookmarks`">
                                            <div class="card bg-blue-100 text-blue-800 " >
                                                <div class="flex align-items-center justify-content-between">
                                                    <div>
                                                        <div class="font-medium text-lg">Bookmarks</div>
                                                        <div class="font-bold text-4xl" v-if="!record.loading">{{ record.num }}</div>
                                                        <Skeleton v-else width="3rem" height="2rem" class="m-2" />
                                                        <div class="text-500 text-sm">Total Bookmarks</div>
                                                    </div>
                                                    <div style="width:auto;">
                                                        <Avatar icon="pi pi-bookmark-fill" size="large" class="bg-blue-600 text-blue-100" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </router-link>
                                            </record-count>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section class="page-section " >
                                <div class="container">
                                    <div class="grid ">
                                        <div  class="col comp-grid" >
                                            <div >
                                                <div class="mb-4 card surface-100">
                                                    <div class="grid align-items-center">
                                                        <div class="col-fixed" style="width:180x">
                                                            <image-viewer class="border-round" style="max-width:100%;max-height:100px" width="auto" height="auto" image-size="medium" :src="auth.userPhoto" />
                                                        </div>
                                                        <div class="col">
                                                            <div class="text-3xl font-bold text-primary"> {{ auth.userName }} </div>
                                                            <div class="text-gray-500"> {{ auth.userEmail }} </div>
                                                            <div class="text-sm text-500 text-capitalize pt-1" v-if="auth.userRole">{{ auth.userRole}}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <TabView v-model:activeIndex="activeTab">
                                                    <TabPanel>
                                                        <template #header>
                                                            <i class="pi pi-user mr-2"></i>
                                                            <span>{{ $t('accountDetail') }}</span>
                                                        </template>
                                                        <div class="mb-3 grid ">
                                                            <div class="col-12 md:col-4">
                                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                                    <div class="">
                                                                        <div class="text-400 mb-1">{{ $t('userId') }}</div>
                                                                        <div class="font-bold">{{ item.user_id }}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 md:col-4">
                                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                                    <div class="">
                                                                        <div class="text-400 mb-1">{{ $t('username') }}</div>
                                                                        <div class="font-bold">{{ item.username }}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 md:col-4">
                                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                                    <div class="">
                                                                        <div class="text-400 mb-1">{{ $t('email') }}</div>
                                                                        <div class="font-bold">{{ item.email }}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 md:col-4">
                                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                                    <div class="">
                                                                        <div class="text-400 mb-1">{{ $t('bio') }}</div>
                                                                        <div class="font-bold">{{ item.bio }}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 md:col-4">
                                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                                    <div class="">
                                                                        <div class="text-400 mb-1">{{ $t('createdAt') }}</div>
                                                                        <div class="font-bold">{{ item.created_at }}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 md:col-4">
                                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                                    <div class="">
                                                                        <div class="text-400 mb-1">{{ $t('updatedAt') }}</div>
                                                                        <div class="font-bold">{{ item.updated_at }}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 md:col-4">
                                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                                    <div class="">
                                                                        <div class="text-400 mb-1">{{ $t('usertele') }}</div>
                                                                        <div class="font-bold">{{ item.usertele }}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 md:col-4">
                                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                                    <div class="">
                                                                        <div class="text-400 mb-1">{{ $t('userRoleId') }}</div>
                                                                        <div class="font-bold">
                                                                            <Button class="p-button-text" icon="pi pi-eye" :label="$t('rolesDetail')" v-if="item.user_role_id" @click="app.openPageDialog({ page: 'roles/view', url: `/roles/view/${item.user_role_id}` , closeBtn: true })" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <template #header>
                                                            <i class="pi pi-pencil  mr-2"></i>
                                                            <span>{{ $t('editAccount') }}</span>
                                                        </template>
                                                        <div class="reset-grid">
                                                            <account-edit-page is-sub-page></account-edit-page>
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <template #header>
                                                                <i class="pi pi-lock  mr-2"></i>
                                                                <span>{{ $t('changePassword') }}</span>
                                                            </template>
                                                            <div class="reset-grid">
                                                                <change-password-page is-sub-page></change-password-page>
                                                            </div>
                                                        </TabPanel>
                                                    </TabView>
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
                                                    <div class="card my-3 p-3 surface-50">
                                                        <ContentsPersonalPortfolioPage ref="contentsListPage"  :limit="10" field-name="contents.user_id" :field-value="item.user_id" :show-header="true" :show-breadcrumbs="true" :show-footer="true" :paginate="true" page-store-key="MESSAGES_VIEW-CONTENTS-PERSONAL_PORTFOLIO" is-sub-page>
                                                        </ContentsPersonalPortfolioPage>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </template>
                            <template v-if="loading">
                                <div style="min-height:200px" class="flex gap-3 justify-content-center align-items-center p-3">
                                    <div><ProgressSpinner style="width:50px;height:50px" /> </div>
                                    <div class="text-500">{{ $t('loading') }} </div>
                                </div>
                            </template>
                        </main>
</template>
<script setup>
	import {  ref, toRefs, onMounted } from 'vue';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import  AccountEditPage  from "./accountedit.vue";
	import  ChangePasswordPage  from "./changepassword.vue";
	import { useViewPage } from 'src/composables/viewpage.js';
	import { usePageStore } from 'src/store/page';
	import ContentsPersonalPortfolioPage from "../contents/personal_portfolio.vue";
	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'user_id',
		},
		pageStoreKey: {
			type: String,
			default: 'ACCOUNT',
		},
		pageName: {
			type: String,
			default: 'users',
		},
		routeName: {
			type: String,
			default: 'usersaccountview',
		},
		apiPath: {
			type: String,
			default: 'account',
		},
		autoLoad: {
			type: Boolean,
			default: true,
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
		exportButton: {
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
		isSubPage: {
			type : Boolean,
			default : false,
		},
	});
	const store = usePageStore(props.pageStoreKey);
	const app = useApp(props);
	const auth = useAuth();
	const page = useViewPage({ store, props });
	const activeTab = ref(0);
	const { currentRecord } = toRefs(store.state);
	const { loading, pageReady } = toRefs(page.state);
	const item = currentRecord;
	const { load, deleteItem, } = page.methods;
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('edit'),
			command: (event) => { app.openPageDialog({ page:'users/edit', url: `/users/edit/${data.user_id}`, closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: auth.canView('users/edit')
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.user_id) },
			icon: "pi pi-trash",
			visible: auth.canView('users/delete')
		}
	]
	}
	onMounted(()=>{
		const pageTitle = $t('myAccount');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
</script>
<style scoped>
.profile-info {
    text-align: center;
}
.profile-info h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
}
/* 信息盒子样式 */
.info-box {
    display: inline-block;
    width: 200px;
    margin: 15px;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, background-color 0.3s;
}
.info-box:hover {
    transform: scale(1.05);
    background-color: #e0e0e0;
}
/* 信息标题 */
.info-box h3 {
    font-size: 18px;
    color: #555;
}
/* 信息内容 */
.info-box p {
    font-size: 22px;
    font-weight: bold;
    color: #007bff;
    margin-top: 10px;
}
/* 小屏设备上的响应式设计 */
@media (max-width: 600px) {
    .profile-container {
        padding: 10px;
    }
    .info-box {
        width: 100%;
        margin: 10px 0;
    }
}
.rollback-btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, box-shadow 0.3s;
}
.rollback-btn:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.rollback-btn:active {
    background-color: #003f7f;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
