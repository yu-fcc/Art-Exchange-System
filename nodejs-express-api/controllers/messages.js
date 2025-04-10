import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list messages records
 * @GET /messages/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Messages.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		where['receiver_id'] = req.user.user_id; //filter only current records
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'message_id', 'desc');
		query.attributes = DB.Messages.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Messages.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Messages record
 * @GET /messages/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['receiver_id'] = req.user.user_id; //filter only current records
		where['message_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Messages.viewFields();
		let record = await DB.Messages.findOne(query);
		if(!record){
			return res.notFound();
		}
		await afterView(recid, record, req);
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});
/**
* After view page record
* @param {string} recid // record id to be selected
* @param {object} record // selected page record
*/
async function afterView(recid, record, req) {
}


/**
 * Route to insert Messages record
 * @POST /messages/add
 */
router.post('/add/', 
	[
		body('sender_id').optional({nullable: true, checkFalsy: true}),
		body('receiver_id').optional({nullable: true, checkFalsy: true}),
		body('encrypted_content').optional({nullable: true, checkFalsy: true}),
		body('ipfs_hash').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.ipfs_hash !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.ipfs_hash, 'ipfs_hash');
			modeldata.ipfs_hash = fileInfo.filepath;
		}
		
		//save Messages record
		let record = await DB.Messages.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['message_id'];
		await afterAdd(record, req);
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});
/**
* After new record created
* @param {object} record // newly created record
*/
async function afterAdd(record, req){
    //enter statement here
}


/**
 * Route to get  Messages record for edit
 * @GET /messages/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['receiver_id'] = req.user.user_id; //filter only current records
		where['message_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Messages.editFields();
		let record = await DB.Messages.findOne(query);
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
 * Route to update  Messages record
 * @POST /messages/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('sender_id').optional({nullable: true, checkFalsy: true}),
		body('encrypted_content').optional({nullable: true, checkFalsy: true}),
		body('ipfs_hash').optional({nullable: true, checkFalsy: true}),
		body('status').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.ipfs_hash !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.ipfs_hash, 'ipfs_hash');
			modeldata.ipfs_hash = fileInfo.filepath;
		}
		const query = {};
		const where = {};
		where['receiver_id'] = req.user.user_id; //filter only current records
		where['message_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Messages.editFields();
		let record = await DB.Messages.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Messages.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Messages record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /messages/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['receiver_id'] = req.user.user_id; //filter only current records
		where['message_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Messages.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Messages.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to list messages records
 * @GET /messages/index/{fieldname}/{fieldvalue}
 */
router.get('/message_notification/:fieldname?/:fieldvalue?', async (req, res) => {  
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
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Users,
			required: true,
			as: 'users',
			attributes: [], //already set via model class
		})
		query.include = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = DB.Messages.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		where['receiver_id'] = req.user.user_id; //filter only current records
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'message_id', 'desc');
		query.attributes = DB.Messages.messageNotificationFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Messages.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});
export default router;
