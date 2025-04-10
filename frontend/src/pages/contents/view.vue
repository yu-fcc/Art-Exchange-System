<template>
    <main class="main-page"  id="">
        <template v-if="pageReady">
            <template v-if="showHeader">
                <section class="page-section mb-3" >
                    <div class="container">
                        <div class="grid justify-content-between align-items-center">
                            <div  v-if="!isSubPage"  class="col-fixed " >
                                <Button @click="$router.go(-1)"   class="p-button p-button-text " icon="pi pi-arrow-left"  />
                            </div>
                            <div  class="col " >
                                <div class=" text-2xl text-primary font-bold" >
                                    {{ $t('contentDetails') }}
                                </div>
                            </div>
                            <div  class="col-sm-4 col-md-4 col-12 md:col-3 comp-grid" >
                                <div class="">
                                    <Button label="Send Report" icon="" @click="Modal672 = true" class="" />
                                    <Dialog v-model:visible="Modal672" :dismissableMask="true" :breakpoints="{'960px': '50vw', '640px': '95vw'}" modal style="width:750px" >
                                        <template #header>
                                            <div class="text-2xl">Send Report</div>
                                        </template>
                                        <div class="">
                                            <div class="card my-3 p-3 surface-50">
                                                <ReportsAddPage ref="reportsAddPage"  :show-header="true" is-sub-page>
                                                </ReportsAddPage>
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                            </div>
                            <div  class="col-sm-4 col-md-4 col-12 md:col-5 comp-grid" >
                                <div class="">
                                    <div id="app" class="button-container">
                                        <!-- 点赞按钮 -->
                                        <button class="button" :class="{ liked: isLiked }" v-on:click="like">
                                        {{ isLiked ? "Unlike" : "Like" }}
                                        </button>
                                        <span class="counter">{{ likecounter }}</span>
                                        <!-- 书签按钮 -->
                                        <button class="button" :class="{ bookmarked: isBookmarked }" v-on:click="bookmark">
                                        {{ isBookmarked ? "Unbookmark" : "Bookmark" }}
                                        </button>
                                        <!-- 书签数量 -->
                                        <span class="counter">{{ bookmarkcounter }}</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="col comp-grid" >
                            <div >
                                <div class="grid ">
                                    <div class="col">
                                        <div class="mb-3 grid ">
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('contentId') }}</div>
                                                        <div class="font-bold">{{ item.content_id }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('userId') }}</div>
                                                        <div class="font-bold">
                                                            <Button class="p-button-text" icon="pi pi-eye" :label="$t('usersDetail')" v-if="item.user_id" @click="app.openPageDialog({ page: 'users/view', url: `/users/view/${item.user_id}` , closeBtn: true })" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('contentType') }}</div>
                                                        <div class="font-bold">{{ item.content_type }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('title') }}</div>
                                                        <div class="font-bold">{{ item.title }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('description') }}</div>
                                                        <div class="font-bold">{{ item.description }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('medium') }}</div>
                                                        <div class="font-bold">{{ item.medium }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('dimensions') }}</div>
                                                        <div class="font-bold">{{ item.dimensions }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('yearCreated') }}</div>
                                                        <div class="font-bold">{{$utils.humanDate( item.year_created )}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('artImage') }}</div>
                                                        <div class="font-bold">
                                                            <image-viewer image-size="medium" image-preview-size="" :src="item.art_image" width="auto" height="auto" class="img-fluid" :num-display="1">
                                                            </image-viewer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('contagnameTagNames') }}</div>
                                                        <div class="font-bold">{{ item.contagname_tag_names }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- action buttons -->
                                        <div  class=" flex gap-3 justify-content-start">
                                            <Menubar class="p-0 inline-menu" ref="actionMenu" :model="getActionMenuModel(item)" />
                                        </div>
                                    </div>
                                    <!-- Detal Page Column -->
                                    <template v-if="currentRecord && !isSubPage">
                                        <div class="col-12">
                                            <div class="card  my-3 p-1">
                                                <component :is="masterDetailPage" :scroll-into-view="false"></component>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid ">
                        <div  class="col comp-grid" >
                        </div>
                    </div>
                </div>
            </section>
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid ">
                        <div  class="col comp-grid" >
                            <div class="">
                                <div class="comments-section">
                                    <h3>评论区 ({{ commentCount }} 条评论)</h3>
                                    <!-- 如果没有评论，显示提示 -->
                                    <div v-if="comments.length === 0" class="no-comments">
                                        <p>暂无评论</p>
                                    </div>
                                    <!-- 显示评论 -->
                                    <div v-for="comment in comments" :key="comment.comment_id" class="comment" :style="comment.parent_id ? { marginLeft: '30px' } : {}">
                                        <div class="comment-header">
                                            <span class="user-name">{{ comment.username }}</span>
                                            <span class="comment-date">{{ timeAgo(comment.created_at) }}</span>
                                            <button @click="deleteComment(comment.comment_id, props.id)">删除</button>
                                        </div>
                                        <div class="comment-body">
                                            <p v-html="comment.body"></p>
                                            <div v-if="comment.media_hash">
                                                <img :src="'/path/to/media/' + comment.media_hash" alt="media" />
                                            </div>
                                        </div>
                                        <!-- 显示回复按钮 -->
                                        <button @click="app.openPageDialog({ page: 'contentscomment/add', url: `contentscomment/add` , closeBtn: true })">回复</button>
                                        <!-- 嵌套评论 -->
                                        <div v-if="comment.replies.length > 0" class="nested-comments">
                                            <div v-for="reply in comment.replies" :key="reply.comment_id" class="nested-comment">
                                                <div class="nested-comment-header">
                                                    <span class="user-name">{{ reply.username }}</span>
                                                    <span class="comment-date">{{ timeAgo(reply.created_at) }}</span>
                                                    <button @click="deleteComment(reply.comment_id, props.id)">删除</button>
                                                </div>
                                                <div class="nested-comment-body">
                                                    <p v-html="reply.body"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 评论输入框 -->
                                    <div class="add-comment">
                                        <quill-editor v-model="newCommentBody" :options="editorOptions" />
                                        <button @click="app.openPageDialog({ page: 'contentscomment/add', url: `contentscomment/add` , closeBtn: true })">评论</button>
                                    </div>
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
	import { defineAsyncComponent, computed, ref, toRefs, onMounted } from 'vue';
	import { ApiService } from 'src/services/api';
	import { utils } from 'src/utils';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { usePageStore } from 'src/store/page';
	import { useViewPage } from 'src/composables/viewpage.js';
	import ReportsAddPage from "../reports/add.vue";
	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'content_id',
		},
		pageStoreKey: {
			type: String,
			default: 'CONTENTS',
		},
		pageName: {
			type: String,
			default: 'contents',
		},
		routeName: {
			type: String,
			default: 'contentsview',
		},
		apiPath: {
			type: String,
			default: 'contents/view',
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
		}
	});
	
	const store = usePageStore(props.pageStoreKey);
	const app = useApp(props);
	const auth = useAuth();
	
	const page = useViewPage({ store, props }); // where page logics resides
	
	const {  currentRecord } = toRefs(store.state);
	const { loading, pageReady } = toRefs(page.state);
	const item = currentRecord;
	const Modal672 = ref(false);
	
	const  { load, deleteItem, exportPage,   } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('edit'),
			command: (event) => { app.openPageDialog({ page:'contents/edit', url: `/contents/edit/${data.content_id}`, closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: auth.canView('contents/edit')
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.content_id) },
			icon: "pi pi-trash",
			visible: auth.canView('contents/delete')
		}
	]
	}
	const masterDetailPage = computed(() => defineAsyncComponent(() => import("./detail-pages.vue")));
	
	onMounted(()=>{ 
		const pageTitle = $t('contentDetails');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	const isLiked = ref(false)
const likecounter = ref(0);
onMounted(() => {
    getLikeStatus(auth.userId,props.id);
    getLikeCount(props.id);
})
const like = async() => {
    try {
        console.log("==props.id==", props.id);
        console.log("==user.id==", auth.userId);
        if (isLiked.value) {
            await unlike(auth.userId,props.id);
            } else {
            await postLike();
        }
        isLiked.value = !isLiked.value;
        await getLikeCount(props.id);
        } catch (error) {
        console.error('Error in like function:', error);
    }
}
async function postLike(){
    console.log("===postlike===");
    try{
        let postData = {
            content_id: props.id,
            user_id:auth.userId
        }
        let response = await ApiService.post("likes/add",postData);
    }
    catch(e){
        console.error(e);
    }
}
async function unlike(use_id,con_id) {
    console.log("===unlike===")
    try {
        let response = await ApiService.delete(`likes/removed/${use_id}/${con_id}`);
        console.log("Like removed:", response)
        } catch (error) {
        console.error("Error removing like:", error)
    }
}
async function getLikeStatus(use_id,con_id) {
    try {
        const response = await ApiService.get(`likes/getLikeStatus/${use_id}/${con_id}`);
        console.log("==getLikeStatus():", response.data.isLiked);
        isLiked.value = response.data.isLiked;
        } catch (error) {
        console.error('Error checking like status:', error);
    }
}
async function getLikeCount(con_id){
    const response = await ApiService.get("likes/getLikeCount/"+con_id);
    console.log("==res:",response.data);
    console.log("==getlikecount():",response.data[0].likecount);
    likecounter.value = response.data[0].likecount;
}
const isBookmarked = ref(false);  
const bookmarkcounter = ref(0);  
onMounted(() => {
    getBookmarkStatus(auth.userId, props.id);
    getBookmarkCount(props.id);
});
const bookmark = async () => {
    try {
        console.log("==props.id==", props.id);
        console.log("==user.id==", auth.userId);
        if (isBookmarked.value) {
            await removeBookmark(auth.userId, props.id);
            } else {
            await addBookmark();
        }
        isBookmarked.value = !isBookmarked.value;
        await getBookmarkCount(props.id);
        } catch (error) {
        console.error('Error in bookmark function:', error);
    }
};
async function addBookmark() {
    console.log("===addBookmark===");
    try {
        let postData = {
            content_id: props.id,
            user_id: auth.userId
        };
        let response = await ApiService.post("bookmarks/add", postData);
        console.log("Bookmark added:", response);
        } catch (e) {
        console.error('Error adding bookmark:', e);
    }
}
async function removeBookmark(userId, contentId) {
    console.log("===removeBookmark===");
    try {
        let response = await ApiService.delete(`bookmarks/removed/${userId}/${contentId}`);
        console.log("Bookmark removed:", response);
        } catch (error) {
        console.error('Error removing bookmark:', error);
    }
}
async function getBookmarkStatus(userId, contentId) {
    try {
        const response = await ApiService.get(`bookmarks/getBookmarkStatus/${userId}/${contentId}`);
        console.log("==getLikeStatus():", response.data.isBookmarked);
        isBookmarked.value = response.data.isBookmarked;
        } catch (error) {
        console.error('Error checking bookmark status:', error);
    }
}
async function getBookmarkCount(contentId) {
    try {
        const response = await ApiService.get(`bookmarks/getBookmarkCount/${contentId}`);
        console.log("+++res", response.data);
        console.log("==getBookmarkCount():", response.data[0].bookmarkCount);
        bookmarkcounter.value = response.data[0].bookmarkCount;
        } catch (error) {
        console.error('Error getting bookmark count:', error);
    }
}
const comments = ref([]);
const commentCount = ref(0);
onMounted(() => {
    getComments(props.id);
    getCommentCount(props.id);
});
const getComments = async (contentId) => {
    try {
        const response = await ApiService.get(`contentscomment/getcomments/${contentId}`);
        console.log("==getComments():", response.data);
        if (Array.isArray(response.data)) {
            comments.value = organizeComments(response.data);
            } else {
            console.error('Fetched comments data is not an array', response.data);
        }
        } catch (error) {
        console.error('Error fetching comments:', error);
    }
};
const getCommentCount = async (contentId) => {
    try {
        const response = await ApiService.get(`contentscomment/getcommentcount/${contentId}`);
        console.log("==getCommentCount():", response.data);
        commentCount.value = response.data.commentCount;
        } catch (error) {
        console.error('Error fetching comment count:', error);
    }
};
const deleteComment = async (commentId, contentId) => {
    try {
        const response = await ApiService.delete(`contentscomment/removed/${commentId}`);
        console.log("Comment deleted:", response);
         await getComments(contentId);  // Refresh comments after posting
        await getCommentCount(contentId); // Update comment count
        } catch (error) {
        console.error('Error deleting comment:', error);
    }
};
// Organize comments to support nested replies
const organizeComments = (comments) => {
    const commentMap = new Map();
    const topLevelComments = [];
    comments.forEach(comment => {
        comment.replies = [];
        commentMap.set(comment.comment_id, comment);
    });
    comments.forEach(comment => {
        if (comment.parent_id) {
            const parentComment = commentMap.get(comment.parent_id);
            if (parentComment) {
                parentComment.replies.push(comment);
            }
            } else {
            topLevelComments.push(comment);
        }
    });
    return topLevelComments;
};
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000); // 时间差（秒）
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);
    if (days > 0) {
        return `${days} days ago`; // 显示天数
        } else if (hours > 0) {
        return `${hours} hours ago`; // 显示小时数
        } else if (minutes > 0) {
        return `${minutes} minutes ago`; // 显示分钟数
        } else {
        return 'Just now'; // 如果是几秒前
    }
}
</script>
<style scoped>
                   body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .button-container {
            display: flex;
            gap: 20px;
            align-items: center;
        }
        /* 按钮的基本样式 */
        .button {
            background-color: #4CAF50; /* 绿色 */
            color: white;
            border: none;
            padding: 12px 25px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 30px; /* 圆角 */
            transition: all 0.3s ease; /* 动画效果 */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .button:hover {
            background-color: #45a049; /* 悬停时颜色变化 */
            transform: scale(1.05); /* 鼠标悬停时按钮稍微放大 */
        }
        .button:active {
            transform: scale(1.02); /* 按下时按钮轻微缩小 */
        }
        .liked {
            background-color: #f44336; /* 红色 */
            border-color: #f44336;
        }
/* 已添加书签时按钮的样式 */
.bookmarked {
    background-color: #ff9900;
    color: white;
}
.counter {
    font-size: 16px;
    margin-left: 10px;
    font-weight: bold;
}
/* 评论区整体样式 */
.comments-section {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
/* 评论区标题 */
.comments-section h3 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}
/* 没有评论时的提示 */
.no-comments p {
    font-size: 1rem;
    color: #777;
    text-align: center;
}
/* 评论项容器 */
.comment {
    padding: 10px 15px;
    margin-bottom: 15px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 5px;
}
/* 评论头部 */
.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}
/* 用户名样式 */
.comment-header .user-name {
    font-weight: bold;
    color: #007BFF;
}
/* 评论时间样式 */
.comment-header .comment-date {
    font-size: 0.875rem;
    color: #888;
}
/* 删除按钮 */
.comment-header button {
    background-color: transparent;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    font-size: 0.875rem;
}
.comment-header button:hover {
    color: #c0392b;
}
/* 评论正文 */
.comment-body {
    margin-top: 10px;
    font-size: 1rem;
    color: #333;
}
/* 媒体内容 */
.comment-body img {
    margin-top: 10px;
    max-width: 100%;
    height: auto;
    border-radius: 4px;
}
/* 回复按钮 */
button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 8px 15px;
    font-size: 0.875rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}
button:hover {
    background-color: #0056b3;
}
/* 嵌套评论容器 */
.nested-comments {
    margin-top: 20px;
    padding-left: 30px;
    border-left: 3px solid #007BFF;
}
/* 嵌套评论样式 */
.nested-comment {
    padding: 8px 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
    margin-bottom: 10px;
}
.nested-comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
}
.nested-comment-header .user-name {
    font-weight: bold;
    color: #007BFF;
}
.nested-comment-header .comment-date {
    font-size: 0.75rem;
    color: #888;
}
.nested-comment-body {
    font-size: 0.875rem;
    color: #333;
}
/* 添加评论框 */
.add-comment {
    margin-top: 20px;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #eee;
}
.add-comment textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    resize: none;
    margin-bottom: 10px;
}
.add-comment button {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    cursor: pointer;
}
.add-comment button:hover {
    background-color: #218838;
}
</style>
