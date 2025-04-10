import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list notificationreply records
 * @GET /notificationreply/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		const query = {};
		let queryFilters = [];
		let where = {};
		let replacements = {};
		let fieldName = req.params.fieldname;
		let fieldValue = req.params.fieldvalue;
		
		if (fieldName){
			queryFilters.push(DB.filterBy(fieldName, fieldValue));
		}
		let search = req.query.search;
		if(search){
			let searchFields = DB.NotificationReply.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'reply_id', 'desc');
		query.attributes = DB.NotificationReply.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.NotificationReply.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view NotificationReply record
 * @GET /notificationreply/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.NotificationReply.viewFields();
		let record = await DB.NotificationReply.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert NotificationReply record
 * @POST /notificationreply/add
 */
router.post('/add/', 
	[
		body('notif_id').optional({nullable: true, checkFalsy: true}),
		body('replay_content').not().isEmpty(),
		body('user_id').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save NotificationReply record
		let record = await DB.NotificationReply.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['reply_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  NotificationReply record for edit
 * @GET /notificationreply/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.NotificationReply.editFields();
		let record = await DB.NotificationReply.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  NotificationReply record
 * @POST /notificationreply/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('notif_id').optional({nullable: true, checkFalsy: true}),
		body('replay_content').optional({nullable: true}).not().isEmpty(),
		body('user_id').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.NotificationReply.editFields();
		let record = await DB.NotificationReply.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.NotificationReply.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete NotificationReply record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /notificationreply/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.NotificationReply.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.NotificationReply.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
