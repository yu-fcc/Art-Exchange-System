import { Router } from 'express';
import DB from '../models/db.js';


const router = Router();


 /**
 * Route to get user_id_option_list records
 * @GET /components_data/user_id_option_list
 */
router.get('/user_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT user_id as value, username as label FROM users` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get content_id_option_list records
 * @GET /components_data/content_id_option_list
 */
router.get('/content_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT content_id as value, title as label FROM contents` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get tag_id_option_list records
 * @GET /components_data/tag_id_option_list
 */
router.get('/tag_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT tag_id AS value,name AS label FROM tags` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get parent_id_option_list records
 * @GET /components_data/parent_id_option_list
 */
router.get('/parent_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT comment_id AS value,comment_id AS label FROM contents_comment` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get notif_id_option_list records
 * @GET /components_data/notif_id_option_list
 */
router.get('/notif_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT notification_id AS value,notification_id AS label FROM notifications` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get user_id_option_list_2 records
 * @GET /components_data/user_id_option_list_2
 */
router.get('/user_id_option_list_2', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT user_id AS value,username AS label FROM users` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get role_id_option_list records
 * @GET /components_data/role_id_option_list
 */
router.get('/role_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT role_id as value, role_name as label FROM roles` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get report_id_option_list records
 * @GET /components_data/report_id_option_list
 */
router.get('/report_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT report_id AS value,report_id AS label FROM reports` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @GET /components_data/users_username_exist/{fieldvalue}
 */
router.get('/users_username_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Users.count({ where:{ 'username': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Users table
 * @GET /components_data/users_email_exist/{fieldvalue}
 */
router.get('/users_email_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Users.count({ where:{ 'email': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get content_type_option_list records
 * @GET /components_data/content_type_option_list
 */
router.get('/content_type_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT content_type AS value,content_type AS label FROM contents` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get medium_option_list records
 * @GET /components_data/medium_option_list
 */
router.get('/medium_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT medium AS value,medium AS label FROM contents` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_follows value
 * @GET /components_data/getcount_follows
 */
router.get('/getcount_follows', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM follows WHERE followed_id = :userid` ;
		let queryParams = {};
		queryParams['userid'] = req.user.user_id;
		let value = await DB.rawQueryValue(sqltext, queryParams,);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_contents value
 * @GET /components_data/getcount_contents
 */
router.get('/getcount_contents', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM contents WHERE user_id = :userid` ;
		let queryParams = {};
		queryParams['userid'] = req.user.user_id;
		let value = await DB.rawQueryValue(sqltext, queryParams,);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_likes value
 * @GET /components_data/getcount_likes
 */
router.get('/getcount_likes', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(l.like_id) AS num FROM contents c LEFT JOIN likes l ON c.content_id = l.content_id WHERE  c.user_id = :userid` ;
		let queryParams = {};
		queryParams['userid'] = req.user.user_id;
		let value = await DB.rawQueryValue(sqltext, queryParams,);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_bookmarks value
 * @GET /components_data/getcount_bookmarks
 */
router.get('/getcount_bookmarks', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(b.bookmark_id) AS num FROM contents c LEFT JOIN bookmarks b ON c.content_id = b.content_id WHERE  c.user_id = :userid` ;
		let queryParams = {};
		queryParams['userid'] = req.user.user_id;
		let value = await DB.rawQueryValue(sqltext, queryParams,);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get home_data_repeater records
 * @GET /components_data/home_data_repeater
 */
router.get('/home_data_repeater', async (req, res) => {
	try{
		let sqltext = `SELECT c.*, COUNT(l.like_id) AS like_count
FROM contents c
LEFT JOIN likes l ON c.content_id = l.content_id
GROUP BY c.content_id
ORDER BY like_count DESC
LIMIT 1;
 ` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get home_data_repeater_2 records
 * @GET /components_data/home_data_repeater_2
 */
router.get('/home_data_repeater_2', async (req, res) => {
	try{
		let sqltext = `SELECT c.*, COUNT(l.like_id) AS like_count
FROM contents c
LEFT JOIN likes l ON c.content_id = l.content_id
GROUP BY c.content_id
ORDER BY like_count DESC
LIMIT 1 OFFSET 1;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get home_data_repeater_3 records
 * @GET /components_data/home_data_repeater_3
 */
router.get('/home_data_repeater_3', async (req, res) => {
	try{
		let sqltext = `SELECT c.*, COUNT(l.like_id) AS like_count
FROM contents c
LEFT JOIN likes l ON c.content_id = l.content_id
GROUP BY c.content_id
ORDER BY like_count DESC
LIMIT 1 OFFSET 2;` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get home_data_repeater_4 records
 * @GET /components_data/home_data_repeater_4
 */
router.get('/home_data_repeater_4', async (req, res) => {
	try{
		let sqltext = `SELECT u.user_id, u.username, u.bio, u.userphoto, COUNT(f.follower_id) AS followers_count
FROM users u
LEFT JOIN follows f ON u.user_id = f.followed_id
GROUP BY u.user_id
ORDER BY followers_count DESC
LIMIT 1;
 ` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get home_data_repeater_5 records
 * @GET /components_data/home_data_repeater_5
 */
router.get('/home_data_repeater_5', async (req, res) => {
	try{
		let sqltext = `SELECT u.user_id, u.username, u.bio, u.userphoto, COUNT(f.follower_id) AS followers_count
FROM users u
LEFT JOIN follows f ON u.user_id = f.followed_id
GROUP BY u.user_id
ORDER BY followers_count DESC
LIMIT 1 OFFSET 1;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get home_data_repeater_6 records
 * @GET /components_data/home_data_repeater_6
 */
router.get('/home_data_repeater_6', async (req, res) => {
	try{
		let sqltext = `SELECT u.user_id, u.username, u.bio, u.userphoto, COUNT(f.follower_id) AS followers_count
FROM users u
LEFT JOIN follows f ON u.user_id = f.followed_id
GROUP BY u.user_id
ORDER BY followers_count DESC
LIMIT 1 OFFSET 2;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get home_data_repeater_7 records
 * @GET /components_data/home_data_repeater_7
 */
router.get('/home_data_repeater_7', async (req, res) => {
	try{
		let sqltext = `SELECT u.username,o.other_content_id,o.title,o.media_hash,o.file_hash
FROM other_contents o
LEFT JOIN users u  ON o.user_id = u.user_id
ORDER BY o.other_content_id DESC
LIMIT 1 OFFSET 0;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get home_data_repeater_8 records
 * @GET /components_data/home_data_repeater_8
 */
router.get('/home_data_repeater_8', async (req, res) => {
	try{
		let sqltext = `SELECT u.username,o.other_content_id,o.title,o.media_hash,o.file_hash
FROM other_contents o
LEFT JOIN users u  ON o.user_id = u.user_id
ORDER BY o.other_content_id DESC
LIMIT 1 OFFSET 1;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_datastatisticsofcontenttype records
 * @GET /components_data/barchart_datastatisticsofcontenttype
 */
router.get('/barchart_datastatisticsofcontenttype',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT 
    c.content_type,
    COUNT(DISTINCT l.content_id) AS like_count,
    COUNT(DISTINCT b.content_id) AS bookmark_count,
    COUNT(DISTINCT cm.content_id) AS comment_count
FROM 
    contents c
LEFT JOIN 
    likes l ON c.content_id = l.content_id
LEFT JOIN 
    bookmarks b ON c.content_id = b.content_id
LEFT JOIN 
    contents_comment cm ON c.content_id = cm.content_id
GROUP BY 
    c.content_type;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.content_type });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.like_count) }),
			label: "likes",
			backgroundColor: "rgba(128 , 255 , 0, 0.5)", 
			borderColor: "rgba(128 , 255 , 0, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		let dataset2 = {
			data: records.map(function(v){ return parseFloat(v.bookmark_count) }),
			label: "bookmarks",
			backgroundColor: "rgba(0 , 255 , 64, 0.5)", 
			borderColor: "rgba(0 , 255 , 64, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset2);
		let dataset3 = {
			data: records.map(function(v){ return parseFloat(v.comment_count) }),
			label: "comments",
			backgroundColor: "rgba(128 , 255 , 128, 0.5)", 
			borderColor: "rgba(128 , 255 , 128, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset3);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get linechart_datestatisticsofuser records
 * @GET /components_data/linechart_datestatisticsofuser
 */
router.get('/linechart_datestatisticsofuser',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT 
    u.user_id,
    u.username,
    COUNT(DISTINCT l.content_id) AS like_count,
    COUNT(DISTINCT b.content_id) AS bookmark_count,
    COUNT(DISTINCT cm.content_id) AS comment_count
FROM 
    users u
LEFT JOIN 
    likes l ON u.user_id = l.user_id
LEFT JOIN 
    bookmarks b ON u.user_id = b.user_id
LEFT JOIN 
    contents_comment cm ON u.user_id = cm.user_id
GROUP BY 
    u.user_id
ORDER BY 
    like_count DESC, bookmark_count DESC, comment_count DESC
LIMIT 10;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.username });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.like_count) }),
			label: "likes",
			backgroundColor: "rgba(0 , 255 , 255, 0.5)", 
			borderColor: "rgba(0 , 255 , 255, 0.5)", 
			borderWidth: "2",
			fill: true
		};
		chartData.datasets.push(dataset1);
		let dataset2 = {
			data: records.map(function(v){ return parseFloat(v.bookmark_count) }),
			label: "bookmarks",
			backgroundColor: "rgba(0 , 128 , 255, 0.5)", 
			borderColor: "rgba(0 , 128 , 255, 0.5)", 
			borderWidth: "2",
			fill: true
		};
		chartData.datasets.push(dataset2);
		let dataset3 = {
			data: records.map(function(v){ return parseFloat(v.comment_count) }),
			label: "comments",
			backgroundColor: "rgba(0 , 128 , 192, 0.5)", 
			borderColor: "rgba(0 , 128 , 192, 0.5)", 
			borderWidth: "2",
			fill: true
		};
		chartData.datasets.push(dataset3);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_datastatisticsofmostcontent records
 * @GET /components_data/barchart_datastatisticsofmostcontent
 */
router.get('/barchart_datastatisticsofmostcontent',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT 
    c.content_id,
    c.title,
    COUNT(DISTINCT l.like_id) AS like_count,
    COUNT(DISTINCT b.bookmark_id) AS bookmark_count,
    COUNT(DISTINCT cm.comment_id) AS comment_count
FROM 
    contents c
LEFT JOIN 
    likes l ON c.content_id = l.content_id
LEFT JOIN 
    bookmarks b ON c.content_id = b.content_id
LEFT JOIN 
    contents_comment cm ON c.content_id = cm.content_id
GROUP BY 
    c.content_id
ORDER BY 
    like_count DESC, bookmark_count DESC, comment_count DESC
LIMIT 10;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.title });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.like_count) }),
			label: "likes",
			backgroundColor: "rgba(255 , 128 , 255, 0.5)", 
			borderColor: "rgba(255 , 128 , 255, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		let dataset2 = {
			data: records.map(function(v){ return parseFloat(v.bookmark_count) }),
			label: "bookmarks",
			backgroundColor: "rgba(255 , 0 , 255, 0.5)", 
			borderColor: "rgba(255 , 0 , 255, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset2);
		let dataset3 = {
			data: records.map(function(v){ return parseFloat(v.comment_count) }),
			label: "comments",
			backgroundColor: "rgba(255 , 0 , 128, 0.5)", 
			borderColor: "rgba(255 , 0 , 128, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset3);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_datastatisticsofsum records
 * @GET /components_data/barchart_datastatisticsofsum
 */
router.get('/barchart_datastatisticsofsum',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT 
    COUNT(DISTINCT l.content_id) AS total_liked_contents,
    COUNT(DISTINCT b.content_id) AS total_bookmarked_contents,
    COUNT(DISTINCT cm.content_id) AS total_commented_contents,
    COUNT(DISTINCT u.user_id) AS total_users
FROM 
    users u
LEFT JOIN 
    likes l ON u.user_id = l.user_id
LEFT JOIN 
    bookmarks b ON u.user_id = b.user_id
LEFT JOIN 
    contents_comment cm ON u.user_id = cm.user_id;
` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.total_users });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.total_liked_contents) }),
			label: "likes",
			backgroundColor: "rgba(255 , 255 , 128, 0.5)", 
			borderColor: "rgba(255 , 255 , 128, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset1);
		let dataset2 = {
			data: records.map(function(v){ return parseFloat(v.total_bookmarked_contents) }),
			label: "bookmarks",
			backgroundColor: "rgba(255 , 255 , 0, 0.5)", 
			borderColor: "rgba(255 , 255 , 0, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset2);
		let dataset3 = {
			data: records.map(function(v){ return parseFloat(v.total_commented_contents) }),
			label: "comments",
			backgroundColor: "rgba(255 , 128 , 64, 0.5)", 
			borderColor: "rgba(255 , 128 , 64, 0.5)", 
			borderWidth: "2",
		};
		chartData.datasets.push(dataset3);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});
export default router;
