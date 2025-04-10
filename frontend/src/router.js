
import { createRouter, createWebHashHistory } from 'vue-router';

import { useAuth } from 'src/composables/auth';


function passRouteToProps(route){
	return {
		queryParams: route.query,
		fieldName: route.params.fieldName, 
		fieldValue: route.params.fieldValue
	}
}


let routes = [
	//Dashboard routes


//audits routes
			{
				path: '/audits/:fieldName?/:fieldValue?',
				name: 'auditslist',
				component: () => import('./pages/audits/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/audits/view/:id', 
				name: 'auditsview', 
				component: () => import('./pages/audits/view.vue'), 
				props: true
			},
		

//bookmarks routes
			{
				path: '/bookmarks/:fieldName?/:fieldValue?',
				name: 'bookmarkslist',
				component: () => import('./pages/bookmarks/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/bookmarks/view/:id', 
				name: 'bookmarksview', 
				component: () => import('./pages/bookmarks/view.vue'), 
				props: true
			},
		
			{ 
				path: '/bookmarks/add', 
				name: 'bookmarksadd', 
				component: () => import('./pages/bookmarks/add.vue'), 
				props: true
			},
	
			{ 
				path: '/bookmarks/edit/:id', 
				name: 'bookmarksedit', 
				component: () => import('./pages/bookmarks/edit.vue'), 
				props: true
			},
		

//contagname routes
			{
				path: '/contagname/:fieldName?/:fieldValue?',
				name: 'contagnamelist',
				component: () => import('./pages/contagname/list.vue'), 
				props: route => passRouteToProps(route)
			},
	

//contentcategories routes
			{
				path: '/contentcategories/:fieldName?/:fieldValue?',
				name: 'contentcategorieslist',
				component: () => import('./pages/contentcategories/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/contentcategories/view/:id', 
				name: 'contentcategoriesview', 
				component: () => import('./pages/contentcategories/view.vue'), 
				props: true
			},
		
			{ 
				path: '/contentcategories/add', 
				name: 'contentcategoriesadd', 
				component: () => import('./pages/contentcategories/add.vue'), 
				props: true
			},
	
			{ 
				path: '/contentcategories/edit/:id', 
				name: 'contentcategoriesedit', 
				component: () => import('./pages/contentcategories/edit.vue'), 
				props: true
			},
		

//contents routes
			{
				path: '/contents/:fieldName?/:fieldValue?',
				name: 'contentslist',
				component: () => import('./pages/contents/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/contents/view/:id', 
				name: 'contentsview', 
				component: () => import('./pages/contents/view.vue'), 
				props: true
			},
		
			{ 
				path: '/contents/add', 
				name: 'contentsadd', 
				component: () => import('./pages/contents/add.vue'), 
				props: true
			},
	
			{ 
				path: '/contents/edit/:id', 
				name: 'contentsedit', 
				component: () => import('./pages/contents/edit.vue'), 
				props: true
			},
		
			{
				path: '/contents/personal_portfolio/:fieldName?/:fieldValue?',
				name: 'contentspersonal_portfolio',
				component: () => import('./pages/contents/personal_portfolio.vue'), 
				props: route => passRouteToProps(route)
			},
	

//contentscomment routes
			{
				path: '/contentscomment/:fieldName?/:fieldValue?',
				name: 'contentscommentlist',
				component: () => import('./pages/contentscomment/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/contentscomment/view/:id', 
				name: 'contentscommentview', 
				component: () => import('./pages/contentscomment/view.vue'), 
				props: true
			},
		
			{ 
				path: '/contentscomment/add', 
				name: 'contentscommentadd', 
				component: () => import('./pages/contentscomment/add.vue'), 
				props: true
			},
	
			{ 
				path: '/contentscomment/edit/:id', 
				name: 'contentscommentedit', 
				component: () => import('./pages/contentscomment/edit.vue'), 
				props: true
			},
		
			{
				path: '/contentscomment/comment_section/:fieldName?/:fieldValue?',
				name: 'contentscommentcomment_section',
				component: () => import('./pages/contentscomment/comment_section.vue'), 
				props: route => passRouteToProps(route)
			},
	

//contentversions routes
			{
				path: '/contentversions/:fieldName?/:fieldValue?',
				name: 'contentversionslist',
				component: () => import('./pages/contentversions/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/contentversions/view/:id', 
				name: 'contentversionsview', 
				component: () => import('./pages/contentversions/view.vue'), 
				props: true
			},
		
			{ 
				path: '/contentversions/add', 
				name: 'contentversionsadd', 
				component: () => import('./pages/contentversions/add.vue'), 
				props: true
			},
	
			{ 
				path: '/contentversions/edit/:id', 
				name: 'contentversionsedit', 
				component: () => import('./pages/contentversions/edit.vue'), 
				props: true
			},
		

//follows routes
			{
				path: '/follows/:fieldName?/:fieldValue?',
				name: 'followslist',
				component: () => import('./pages/follows/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/follows/view/:id', 
				name: 'followsview', 
				component: () => import('./pages/follows/view.vue'), 
				props: true
			},
		
			{ 
				path: '/follows/add', 
				name: 'followsadd', 
				component: () => import('./pages/follows/add.vue'), 
				props: true
			},
	
			{ 
				path: '/follows/edit/:id', 
				name: 'followsedit', 
				component: () => import('./pages/follows/edit.vue'), 
				props: true
			},
		

//likes routes
			{
				path: '/likes/:fieldName?/:fieldValue?',
				name: 'likeslist',
				component: () => import('./pages/likes/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/likes/view/:id', 
				name: 'likesview', 
				component: () => import('./pages/likes/view.vue'), 
				props: true
			},
		
			{ 
				path: '/likes/add', 
				name: 'likesadd', 
				component: () => import('./pages/likes/add.vue'), 
				props: true
			},
	
			{ 
				path: '/likes/edit/:id', 
				name: 'likesedit', 
				component: () => import('./pages/likes/edit.vue'), 
				props: true
			},
		

//messages routes
			{
				path: '/messages/:fieldName?/:fieldValue?',
				name: 'messageslist',
				component: () => import('./pages/messages/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/messages/view/:id', 
				name: 'messagesview', 
				component: () => import('./pages/messages/view.vue'), 
				props: true
			},
		
			{ 
				path: '/messages/add', 
				name: 'messagesadd', 
				component: () => import('./pages/messages/add.vue'), 
				props: true
			},
	
			{ 
				path: '/messages/edit/:id', 
				name: 'messagesedit', 
				component: () => import('./pages/messages/edit.vue'), 
				props: true
			},
		
			{
				path: '/messages/message_notification/:fieldName?/:fieldValue?',
				name: 'messagesmessage_notification',
				component: () => import('./pages/messages/message_notification.vue'), 
				props: route => passRouteToProps(route)
			},
	

//notificationreply routes
			{
				path: '/notificationreply/:fieldName?/:fieldValue?',
				name: 'notificationreplylist',
				component: () => import('./pages/notificationreply/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/notificationreply/view/:id', 
				name: 'notificationreplyview', 
				component: () => import('./pages/notificationreply/view.vue'), 
				props: true
			},
		
			{ 
				path: '/notificationreply/add', 
				name: 'notificationreplyadd', 
				component: () => import('./pages/notificationreply/add.vue'), 
				props: true
			},
	
			{ 
				path: '/notificationreply/edit/:id', 
				name: 'notificationreplyedit', 
				component: () => import('./pages/notificationreply/edit.vue'), 
				props: true
			},
		

//notifications routes
			{
				path: '/notifications/:fieldName?/:fieldValue?',
				name: 'notificationslist',
				component: () => import('./pages/notifications/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/notifications/view/:id', 
				name: 'notificationsview', 
				component: () => import('./pages/notifications/view.vue'), 
				props: true
			},
		
			{ 
				path: '/notifications/add', 
				name: 'notificationsadd', 
				component: () => import('./pages/notifications/add.vue'), 
				props: true
			},
	
			{ 
				path: '/notifications/edit/:id', 
				name: 'notificationsedit', 
				component: () => import('./pages/notifications/edit.vue'), 
				props: true
			},
		
			{
				path: '/notifications/checknotifications/:fieldName?/:fieldValue?',
				name: 'notificationschecknotifications',
				component: () => import('./pages/notifications/checknotifications.vue'), 
				props: route => passRouteToProps(route)
			},
	

//othercontents routes
			{
				path: '/othercontents/:fieldName?/:fieldValue?',
				name: 'othercontentslist',
				component: () => import('./pages/othercontents/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/othercontents/view/:id', 
				name: 'othercontentsview', 
				component: () => import('./pages/othercontents/view.vue'), 
				props: true
			},
		
			{ 
				path: '/othercontents/add', 
				name: 'othercontentsadd', 
				component: () => import('./pages/othercontents/add.vue'), 
				props: true
			},
	
			{ 
				path: '/othercontents/edit/:id', 
				name: 'othercontentsedit', 
				component: () => import('./pages/othercontents/edit.vue'), 
				props: true
			},
		

//permissions routes
			{
				path: '/permissions/:fieldName?/:fieldValue?',
				name: 'permissionslist',
				component: () => import('./pages/permissions/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/permissions/view/:id', 
				name: 'permissionsview', 
				component: () => import('./pages/permissions/view.vue'), 
				props: true
			},
		
			{ 
				path: '/permissions/add', 
				name: 'permissionsadd', 
				component: () => import('./pages/permissions/add.vue'), 
				props: true
			},
	
			{ 
				path: '/permissions/edit/:id', 
				name: 'permissionsedit', 
				component: () => import('./pages/permissions/edit.vue'), 
				props: true
			},
		

//reports routes
			{
				path: '/reports/:fieldName?/:fieldValue?',
				name: 'reportslist',
				component: () => import('./pages/reports/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/reports/view/:id', 
				name: 'reportsview', 
				component: () => import('./pages/reports/view.vue'), 
				props: true
			},
		
			{ 
				path: '/reports/add', 
				name: 'reportsadd', 
				component: () => import('./pages/reports/add.vue'), 
				props: true
			},
	
			{ 
				path: '/reports/edit/:id', 
				name: 'reportsedit', 
				component: () => import('./pages/reports/edit.vue'), 
				props: true
			},
		

//reportsreply routes
			{
				path: '/reportsreply/:fieldName?/:fieldValue?',
				name: 'reportsreplylist',
				component: () => import('./pages/reportsreply/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/reportsreply/view/:id', 
				name: 'reportsreplyview', 
				component: () => import('./pages/reportsreply/view.vue'), 
				props: true
			},
		
			{ 
				path: '/reportsreply/add', 
				name: 'reportsreplyadd', 
				component: () => import('./pages/reportsreply/add.vue'), 
				props: true
			},
	
			{ 
				path: '/reportsreply/edit/:id', 
				name: 'reportsreplyedit', 
				component: () => import('./pages/reportsreply/edit.vue'), 
				props: true
			},
		

//reputationhistory routes
			{
				path: '/reputationhistory/:fieldName?/:fieldValue?',
				name: 'reputationhistorylist',
				component: () => import('./pages/reputationhistory/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/reputationhistory/view/:id', 
				name: 'reputationhistoryview', 
				component: () => import('./pages/reputationhistory/view.vue'), 
				props: true
			},
		
			{ 
				path: '/reputationhistory/add', 
				name: 'reputationhistoryadd', 
				component: () => import('./pages/reputationhistory/add.vue'), 
				props: true
			},
	
			{ 
				path: '/reputationhistory/edit/:id', 
				name: 'reputationhistoryedit', 
				component: () => import('./pages/reputationhistory/edit.vue'), 
				props: true
			},
		

//roles routes
			{
				path: '/roles/:fieldName?/:fieldValue?',
				name: 'roleslist',
				component: () => import('./pages/roles/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/roles/view/:id', 
				name: 'rolesview', 
				component: () => import('./pages/roles/view.vue'), 
				props: true
			},
		
			{ 
				path: '/roles/add', 
				name: 'rolesadd', 
				component: () => import('./pages/roles/add.vue'), 
				props: true
			},
	
			{ 
				path: '/roles/edit/:id', 
				name: 'rolesedit', 
				component: () => import('./pages/roles/edit.vue'), 
				props: true
			},
		

//tags routes
			{
				path: '/tags/:fieldName?/:fieldValue?',
				name: 'tagslist',
				component: () => import('./pages/tags/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/tags/view/:id', 
				name: 'tagsview', 
				component: () => import('./pages/tags/view.vue'), 
				props: true
			},
		
			{ 
				path: '/tags/add', 
				name: 'tagsadd', 
				component: () => import('./pages/tags/add.vue'), 
				props: true
			},
	
			{ 
				path: '/tags/edit/:id', 
				name: 'tagsedit', 
				component: () => import('./pages/tags/edit.vue'), 
				props: true
			},
		

//users routes
			{
				path: '/users/:fieldName?/:fieldValue?',
				name: 'userslist',
				component: () => import('./pages/users/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/users/view/:id', 
				name: 'usersview', 
				component: () => import('./pages/users/view.vue'), 
				props: true
			},
		
			{ 
				path: '/index/register', 
				name: 'usersuserregister', 
				component: () => import('./pages/index/userregister.vue'), 
				props: true
			},
	
			{ 
				path: '/account/edit', 
				name: 'usersaccountedit', 
				component: () => import('./pages/account/accountedit.vue'), 
				props: true
			},
	
			{ 
				path: '/account', 
				name: 'usersaccountview', 
				component: () => import('./pages/account/accountview.vue'), 
				props: true
			},
	
			{ 
				path: '/users/add', 
				name: 'usersadd', 
				component: () => import('./pages/users/add.vue'), 
				props: true
			},
	
			{ 
				path: '/users/edit/:id', 
				name: 'usersedit', 
				component: () => import('./pages/users/edit.vue'), 
				props: true
			},
		
			{
				path: '/users/artistic/:fieldName?/:fieldValue?',
				name: 'usersartistic',
				component: () => import('./pages/users/artistic.vue'), 
				props: route => passRouteToProps(route)
			},
	

			{ 
				path: '/artistc', 
				name: 'artistc', 
				component: () => import('././pages/custom/artistc.vue'), 
				props: true
			},
	
			{ 
				path: '/uploadpage', 
				name: 'uploadpage', 
				component: () => import('././pages/custom/uploadpage.vue'), 
				props: true
			},
	
			{ 
				path: '/data_analysis', 
				name: 'data_analysis', 
				component: () => import('././pages/custom/data_analysis.vue'), 
				props: true
			},
	
	
	
//Password reset routes
			{ 
				path: '/index/forgotpassword', 
				name: 'forgotpassword', 
				component: () => import('./pages/index/forgotpassword.vue'), 
				props: true
			},
			{ 
				path: '/index/resetpassword', 
				name: 'resetpassword', 
				component: () => import('./pages/index/resetpassword.vue'), 
				props: true
			},
			{ 
				path: '/index/resetpassword_completed', 
				name: 'resetpassword_completed', 
				component: () => import('./pages/index/resetpassword_completed.vue'), 
				props: true
			},
	
	
	
	{ 
		path:  '/error/forbidden', 
		name: 'forbidden', 
		component: () => import('./pages/errors/forbidden.vue'),
		props: true
	},
	{ 
		path: '/error/notfound', 
		name: 'notfound',
		component: () => import('./pages/errors/pagenotfound.vue'),
		props: true
	},
	{
		path: '/:catchAll(.*)', 
		component: () => import('./pages/errors/pagenotfound.vue')
	}
];

export default () => {
	
const auth = useAuth();

	
	const user = auth.user;
	if(user){
		routes.push({ path: '/', alias: '/home', name: 'home', component: () => import(`./pages/home/home.vue`) });
	}
	else{
		routes.push({ path: '/', alias: '/index', name: 'index', component: () => import('./pages/index/index.vue') });
	}

	const router = createRouter({
		history: createWebHashHistory(),
		routes,
		scrollBehavior(to, from, savedPostion){
			if(savedPostion) return savedPostion;
			return { top:0 }
		}
	});
	
	router.beforeEach((to, from, next) => {
		const user = auth.user;
		let path = to.path;
		let authRequired = auth.pageRequiredAuth(path);
		if (authRequired) {
			if(!user){
				return next({ path: '/',  query: { nexturl: to.fullPath } });
			}
			//authorize user
			if (!auth.canView(path)) {
				return next({path: "/error/forbidden"});
			}
		}

		if(user && to.name == "index"){
			//already logged in, show home when try to access index page
			return next({ path: "/home"});
		}

		//navigate to redirect url if available
		if(to.name == "home" && to.query.nexturl){
			return next({ path: to.query.nexturl});
		}

 		//close dialog from previous page
		//store.closeDialogs('app/closeDialogs');
		
		next();
	});

	return router;
}
