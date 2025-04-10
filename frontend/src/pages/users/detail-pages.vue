<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <template v-if="auth.canView('bookmarks')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userBookmarks') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <BookmarksListPage ref="bookmarksListPage"  field-name="bookmarks.user_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </BookmarksListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('follows')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userFollows') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <FollowsListPage ref="followsListPage"  field-name="follows.follower_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </FollowsListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('follows')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userFollows') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <FollowsListPage ref="followsListPage"  field-name="follows.followed_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </FollowsListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('messages')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userMessages') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <MessagesListPage ref="messagesListPage"  field-name="messages.sender_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </MessagesListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('messages')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userMessages') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <MessagesListPage ref="messagesListPage"  field-name="messages.receiver_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </MessagesListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('reports')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userReports') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <ReportsListPage ref="reportsListPage"  field-name="reports.reporter_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </ReportsListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('notifications')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userNotifications') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <NotificationsListPage ref="notificationsListPage"  field-name="notifications.sender_user_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </NotificationsListPage>
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
import BookmarksListPage from "../bookmarks/list.vue";
import FollowsListPage from "../follows/list.vue";
import MessagesListPage from "../messages/list.vue";
import ReportsListPage from "../reports/list.vue";
import NotificationsListPage from "../notifications/list.vue";
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
const store = usePageStore('USERS');
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
	 
	// set bookmarks form data
	const bookmarksStore = usePageStore('bookmarks');
	bookmarksStore.setFormData({ user_id:record?.user_id });
	 
	// set follows form data
	const followsStore = usePageStore('follows');
	followsStore.setFormData({ follower_id:record?.user_id, followed_id:record?.user_id });
	 
	// set messages form data
	const messagesStore = usePageStore('messages');
	messagesStore.setFormData({ sender_id:record?.user_id, receiver_id:record?.user_id });
	 
	// set reports form data
	const reportsStore = usePageStore('reports');
	reportsStore.setFormData({ reporter_id:record?.user_id });
	 
	// set notifications form data
	const notificationsStore = usePageStore('notifications');
	notificationsStore.setFormData({ sender_user_id:record?.user_id });
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
