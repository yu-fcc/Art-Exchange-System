<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <template v-if="auth.canView('contentversions')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('contentContentVersions') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <ContentversionsListPage ref="contentversionsListPage"  field-name="content_versions.content_id" :field-value="masterRecord.content_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </ContentversionsListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('reports')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('contentReports') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <ReportsListPage ref="reportsListPage"  field-name="reports.reported_content_id" :field-value="masterRecord.content_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </ReportsListPage>
                    </div>
                </TabPanel>
            </template>
        </TabView>
    </div>
</template>
<script setup>
import { watch, computed, ref, onMounted } from 'vue';
import { useApp } from 'src/composables/app.js';
import { useAuth } from 'src/composables/auth';
import { $t } from 'src/services/i18n';
import { usePageStore } from 'src/store/page';
import ContentversionsListPage from "../contentversions/list.vue";
import ReportsListPage from "../reports/list.vue";
const props = defineProps({
	isSubPage: {
		type : Boolean,
		default : true,
	},
	scrollIntoView: {
		type : Boolean,
		default : false,
	},
});
const store = usePageStore('CONTENTS');
const app = useApp();
const auth = useAuth();
const masterRecord = computed(() => store.state.currentRecord);
const activeTab = ref(0);
const pageReady = computed(() => masterRecord.value != null);
//scroll detail page into view
function scrollToDetailPage() {
	if (props.scrollIntoView) {
		const pageElement = document.getElementById('master-detailpage');
		if(pageElement){
			pageElement.scrollIntoView({behavior:'smooth', block:'start'});
		}
	}
}
// pass form data from master to detail
function setDetailPageFormData(){
	const record = masterRecord.value;
	 
	// set contentversions form data
	const contentversionsStore = usePageStore('contentversions');
	contentversionsStore.setFormData({  });
	 
	// set reports form data
	const reportsStore = usePageStore('reports');
	reportsStore.setFormData({  });
}
watch(() => masterRecord, () => {
		setDetailPageFormData();
		scrollToDetailPage();
	},
	{ deep: true, immediate: true }
);
onMounted(()=>{ 
    scrollToDetailPage();
});
</script>
