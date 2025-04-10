
import { Sequelize, sequelize } from './basemodel.js';

// Override timezone formatting
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
	return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss');
};

import Audits from './audits.js';
import Bookmarks from './bookmarks.js';
import ConTagName from './contagname.js';
import ContentCategories from './contentcategories.js';
import Contents from './contents.js';
import ContentsComment from './contentscomment.js';
import ContentVersions from './contentversions.js';
import Follows from './follows.js';
import Likes from './likes.js';
import Messages from './messages.js';
import NotificationReply from './notificationreply.js';
import Notifications from './notifications.js';
import OtherContents from './othercontents.js';
import Permissions from './permissions.js';
import Reports from './reports.js';
import ReportsReply from './reportsreply.js';
import ReputationHistory from './reputationhistory.js';
import Roles from './roles.js';
import Tags from './tags.js';
import Users from './users.js';


Contents.belongsTo(ConTagName, { foreignKey: 'content_id', as: 'con_tag_name' });

Contents.belongsTo(ConTagName, { foreignKey: 'content_id', as: 'con_tag_name2' });

ContentVersions.belongsTo(ConTagName, { foreignKey: 'content_id', as: 'con_tag_name' });

ContentVersions.belongsTo(ConTagName, { foreignKey: 'content_id', as: 'con_tag_name2' });

Messages.belongsTo(Users, { foreignKey: 'receiver_id', as: 'users' });

Users.belongsTo(Roles, { foreignKey: 'user_role_id', as: 'roles' });


const op = Sequelize.Op;
const raw = Sequelize.literal; // use to include raw expression

const filterBy = function(expression, value){
	return sequelize.where(raw(expression), value);
}

// convinient functions for performing raw queries 
// return different value types

function rawQuery(queryText, options){
	return sequelize.query(queryText, options);
}

async function rawQueryList(queryText, queryParams){
	const records = await rawQuery(queryText, { replacements: queryParams, type: Sequelize.QueryTypes.SELECT });
	return records;
}

async function rawQueryOne(queryText, queryParams){
	const records = await rawQueryList(queryText, queryParams);
	return records[0] || null;
}

async function rawQueryValue(queryText, queryParams){
	const record = await rawQueryOne(queryText, queryParams);
	if(record){
		return Object.values(record)[0];
	}
	return null;
}

function getOrderBy(req, sortField = null, sortType = 'desc'){
	const orderBy = req.query.orderby || sortField;
	const orderType = req.query.ordertype || sortType;
	if (orderBy) {
		let order = raw(`${orderBy} ${orderType}`);
		return [[order]];
	}
	return null;
}

export default {
	sequelize,
	op,
	filterBy,
	raw,
	rawQuery,
	rawQueryList,
	rawQueryOne,
	rawQueryValue,
	getOrderBy,
	Audits,
	Bookmarks,
	ConTagName,
	ContentCategories,
	Contents,
	ContentsComment,
	ContentVersions,
	Follows,
	Likes,
	Messages,
	NotificationReply,
	Notifications,
	OtherContents,
	Permissions,
	Reports,
	ReportsReply,
	ReputationHistory,
	Roles,
	Tags,
	Users
}
