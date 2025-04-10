
import { $t } from './services/i18n.js';

export const AppMenus = {
    
	navbarTopRight: [],
	navbarTopLeft: [],
	navbarSideLeft: [
  {
    "to": "/home",
    "label": $t('home'),
    "icon": "pi pi-align-center",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/contents",
    "label": $t('contents'),
    "icon": "pi pi-book",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/artistc",
    "label": $t('artistc'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/othercontents",
    "label": $t('otherContents'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/uploadpage",
    "label": $t('uploadpage'),
    "icon": "pi pi-upload",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/contentscomment",
    "label": $t('contentsComment'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/contentversions",
    "label": $t('contentVersions'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/audits",
    "label": $t('audits'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/bookmarks",
    "label": $t('bookmarks'),
    "icon": "pi pi-bookmark",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/likes",
    "label": $t('likes'),
    "icon": "pi pi-thumbs-up",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/follows",
    "label": $t('follows'),
    "icon": "pi pi-heart",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/messages",
    "label": $t('messages'),
    "icon": "pi pi-telegram",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/notifications",
    "label": $t('notifications'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/notificationreply",
    "label": $t('notificationReply'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/data_analysis",
    "label": $t('dataAnalysis'),
    "icon": "pi pi-chart-bar",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/reports",
    "label": $t('reports'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/reportsreply",
    "label": $t('reportsReply'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/permissions",
    "label": $t('permissions'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/tags",
    "label": $t('tags'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/contagname",
    "label": $t('conTagName'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/users",
    "label": $t('users'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  },
  {
    "to": "/roles",
    "label": $t('roles'),
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
    
  }
],
	contentType: [    
{value: "painting", label: $t('painting')},
	{value: "sculpture", label: $t('sculpture')},
	{value: "photography", label: $t('photography')},
	{value: "ceramics", label: $t('ceramics')},
	{value: "installation", label: $t('installation')},
	{value: "digital_art", label: $t('digitalArt')},
	{value: "other", label: $t('other')}
    ],
	status: [    
{value: "true", label: $t('true')},
	{value: "false", label: $t('false')}
    ],
	type: [    
{value: "like", label: $t('like')},
	{value: "comment", label: $t('comment')},
	{value: "follow", label: $t('follow')},
	{value: "mention", label: $t('mention')},
	{value: "message", label: $t('message')},
	{value: "event", label: $t('event')},
	{value: "system", label: $t('system')}
    ],
	contentType2: [    
{value: "comment", label: $t('comment')},
	{value: "share", label: $t('share')}
    ],
	status2: [    
{value: "pending", label: $t('pending')},
	{value: "reviewed", label: $t('reviewed')},
	{value: "actioned", label: $t('actioned')},
	{value: "dismissed", label: $t('dismissed')}
    ],
	contentsListsort: [{"label":$t('contentId'),"value":"content_id"},{"label":$t('userId'),"value":"user_id"},{"label":$t('contentType'),"value":"content_type"},{"label":$t('title'),"value":"title"},{"label":$t('description'),"value":"description"},{"label":$t('medium'),"value":"medium"},{"label":$t('dimensions'),"value":"dimensions"},{"label":$t('yearCreated'),"value":"year_created"},{"label":$t('artImage'),"value":"art_image"},{"label":$t('tagId'),"value":"tag_id"},{"label":$t('createdAt'),"value":"created_at"},{"label":$t('updatedAt'),"value":"updated_at"}],

    exportFormats: {
        print: {
			label: 'Print',
            icon: 'pi pi-print',
            type: 'print',
            ext: 'print',
        },
        pdf: {
			label: 'Pdf',
			
            icon: 'pi pi-file-pdf',
            type: 'pdf',
            ext: 'pdf',
        },
        excel: {
			label: 'Excel',
            icon: 'pi pi-file-excel',
            type: 'excel',
            ext: 'xlsx',
        },
        csv: {
			label: 'Csv',
            icon: 'pi pi-table',
            type: 'csv',
            ext: 'csv',
        },
    },
    locales: {
  "fr": "French",
  "ru": "Russian",
  "zh-CN": "Chinese",
  "en-US": "English",
  "it": "Italian",
  "hi": "Hindi",
  "pt": "Portuguese",
  "de": "German",
  "es": "Spanish",
  "ar": "Arabic"
}
}