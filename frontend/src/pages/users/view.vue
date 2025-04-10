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
                                    {{ $t('userDetails') }}
                                </div>
                            </div>
                            <div  class="col-sm-4 col-md-4 col-12 md:col-3 comp-grid" >
                                <div class="">
                                    <Button label="Send Messages" icon="" @click="Modal245 = true" class="" />
                                    <Dialog v-model:visible="Modal245" :dismissableMask="true" :breakpoints="{'960px': '50vw', '640px': '95vw'}" modal style="width:750px" >
                                        <template #header>
                                            <div class="text-2xl">Send Messages</div>
                                        </template>
                                        <div class="">
                                            <div class="card my-3 p-3 surface-50">
                                                <MessagesAddPage ref="messagesAddPage"  :show-header="true" is-sub-page>
                                                </MessagesAddPage>
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                            </div>
                            <div  class="col-sm-4 col-md-4 col-12 md:col-4 comp-grid" >
                                <div class="">
                                    <div class="button-container">
                                        <button
                                        class="button"
                                        :class="{'followed': isFollowed, 'mutual': isMutualFollow}"
                                        v-on:click="follow"
                                        >
                                        {{ isMutualFollow ? 'Mutual Follow' : (isFollowed ? 'Unfollow' : 'Follow') }}
                                        </button>
                                        <span class="counter">{{ followcounter }} Followers</span>
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
                                                <div class="text-400 mb-1">{{ $t('usertele') }}</div>
                                                <div class="font-bold">{{ item.usertele }}</div>
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
                                                <div class="text-400 mb-1">{{ $t('bio') }}</div>
                                                <div class="font-bold">{{ item.bio }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- action buttons -->
                                <div  class=" flex gap-3 justify-content-start">
                                    <Menubar class="p-0 inline-menu" ref="actionMenu" :model="getActionMenuModel(item)" />
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
                            <div class="">
                                <div class="author-works">
                                    <h2>作品列表</h2>
                                    <div v-if="works.length === 0" class="no-works">
                                        <p>暂无作品</p>
                                    </div>
                                    <div v-else class="works-container">
                                        <div class="work-item" v-for="work in works" :key="work.id">
                                            <NiceImage v-ripple @click="app.openPageDialog({ page: 'contents/view', url: `contents/view/${work.content_id}`, closeBtn: true })" 
                                            class="cursor-pointer" 
                                            style="max-width:100%;width:100%;height:200px" 
                                            :src="$utils.setImgUrl(work.art_image, 'medium')" />
                                            <h3 class="work-title">{{ work.title }}</h3>
                                        </div>
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
	import {  ref, toRefs, onMounted } from 'vue';
	import { ApiService } from 'src/services/api';
	import { utils } from 'src/utils';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { usePageStore } from 'src/store/page';
	import { useViewPage } from 'src/composables/viewpage.js';
	import MessagesAddPage from "../messages/add.vue";
	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'user_id',
		},
		pageStoreKey: {
			type: String,
			default: 'USERS',
		},
		pageName: {
			type: String,
			default: 'users',
		},
		routeName: {
			type: String,
			default: 'usersview',
		},
		apiPath: {
			type: String,
			default: 'users/view',
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
	const Modal245 = ref(false);
	
	const  { load, deleteItem, exportPage,   } = page.methods;
	
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
		const pageTitle = $t('userDetails');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	const isFollowed = ref(false);
const followcounter = ref(0);
const isMutualFollow = ref(false);  // 是否互相关注
onMounted(() => {
    getFollowCount(props.id);
    getFollowStatus(auth.userId, props.id);   
    checkMutualFollow(auth.userId, props.id);  // 获取互相关注状态
});
const follow = async () => {
    try {
        console.log("==props.id==", props.id);
        console.log("==user.id==", auth.userId);
        if (isFollowed.value) {
            await removeFollow(auth.userId, props.id);
            } else {
            await postFollow();
        }
        isFollowed.value = !isFollowed.value;
        getFollowCount(props.id);
        checkMutualFollow(auth.userId, props.id);  // 更新互相关注状态
        } catch (error) {
        console.error('Error in follow/unfollow function:', error);
    }
}
async function postFollow() {
    console.log("===postFollow===");
    try {
        let postData = {
            followed_id: props.id, 
            follower_id: auth.userId 
        };
        let response = await ApiService.post("follows/add", postData);
        console.log("Follow added:", response);
        } catch (e) {
        console.error("Error adding follow:", e);
    }
}
async function removeFollow(followerId, followedId) {
    console.log("===removeFollow===");
    try {
        let response = await ApiService.delete(`follows/removed/${followerId}/${followedId}`);
        console.log("Follow removed:", response);
        } catch (error) {
        console.error("Error removing follow:", error);
    }
}
async function getFollowStatus(followerId, followedId) {
    try {
        const response = await ApiService.get(`follows/getFollowStatus/${followerId}/${followedId}`);
        console.log("==getFollowStatus():", response.data.isFollowed);
        isFollowed.value = response.data.isFollowed;
        } catch (error) {
        console.error('Error checking follow status:', error);
    }
}
async function checkMutualFollow(followerId, followedId) {
    try {
        const response = await ApiService.get(`follows/getMutualFollowStatus/${followerId}/${followedId}`);
        console.log("==checkMutualFollow():", response.data.isMutualFollow);
        isMutualFollow.value = response.data.isMutualFollow;
        } catch (error) {
        console.error('Error checking mutual follow status:', error);
    }
}
async function getFollowCount(followedId) {
    try {
        const response = await ApiService.get(`follows/getFollowCount/${followedId}`);
        console.log("==getFollowCount():", response.data[0].followcount);
        followcounter.value = response.data[0].followcount;
        } catch (error) {
        console.error('Error getting follow count:', error);
    }
}
const works = ref(null);
onMounted(()=>{
    getWorks(props.id);
});
async function getWorks(userId) {
    try{
        const response = await ApiService.get(`contents/works/${userId}`)
        console.log("resdata===", response.data);
        console.log("userid===",userId);
        if (response.data && response.data.length > 0) {
            works.value = response.data;
            } else {
            console.log("No works found for userid:", userId);
            works.value = [];  
        }
        } catch(e){
        console.error(e); 
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
           align-items: center;
           justify-content: center;
           gap: 10px;
       }
       .button {
           background-color: #007bff;
           color: white;
           border: none;
           border-radius: 4px;
           padding: 10px 20px;
           font-size: 16px;
           cursor: pointer;
           transition: background-color 0.3s, transform 0.2s;
       }
       .button:hover {
           background-color: #0056b3;
           transform: scale(1.05);
       }
       .button.followed {
           background-color: #dc3545; /* 红色，表示已取消关注 */
       }
       .counter {
           font-size: 14px;
           color: #555;
           margin-left: 10px;
       }
       @media (max-width: 600px) {
           .button-container {
               flex-direction: column;
               align-items: flex-start;
           }
           .counter {
               margin-top: 5px;
           }
       }
        .author-works {
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .works-container {
            display: flex;
            flex-wrap: wrap; /* 允许作品换行 */
            gap: 20px; /* 作品之间的间隙 */
            justify-content: center; /* 水平居中 */
            margin-top: 20px;
        }
        .work-item {
            width: 30%; /* 每个作品占 30% 宽度，三列 */
            text-align: center; /* 使图片和标题居中 */
            box-sizing: border-box; /* 确保 padding 不影响宽度计算 */
            margin-bottom: 30px; /* 每个作品之间的底部间隙 */
            cursor: pointer; /* 鼠标悬停时显示为可点击 */
        }
        .work-item:hover {
            transform: scale(1.05); /* 鼠标悬停时放大效果 */
            transition: transform 0.3s ease; /* 平滑过渡 */
        }
        .work-item .work-title {
            margin-top: 10px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
            text-align: center;
        }
        .work-item .work-title:hover {
            color: #007bff; /* 鼠标悬停时改变标题颜色 */
        }
        .work-item .cursor-pointer {
            display: block;
            width: 100%;
            height: 200px; /* 固定图片高度 */
            object-fit: cover; /* 图片按比例裁剪并填充容器 */
            border-radius: 8px; /* 给图片加圆角 */
            transition: transform 0.3s ease; /* 图片平滑过渡效果 */
        }
        .work-item .cursor-pointer:hover {
            transform: scale(1.05); /* 图片鼠标悬停时放大 */
        }
        .no-works {
    text-align: center;
    font-size: 1.2em;
    color: #888;
    padding: 20px;
}
        @media (max-width: 768px) {
            .work-item {
                width: 45%; /* 在中等屏幕上每行显示 2 个作品 */
            }
        }
        @media (max-width: 480px) {
            .work-item {
                width: 100%; /* 在手机屏幕上每行显示 1 个作品 */
            }
        }
</style>
