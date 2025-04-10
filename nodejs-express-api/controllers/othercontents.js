import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list othercontents records
 * @GET /othercontents/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.OtherContents.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'other_content_id', 'desc');
		query.attributes = DB.OtherContents.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.OtherContents.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view OtherContents record
 * @GET /othercontents/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['other_content_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.OtherContents.viewFields();
		let record = await DB.OtherContents.findOne(query);
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
 * Route to insert OtherContents record
 * @POST /othercontents/add
 */
router.post('/add/', 
	[
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('content_type').optional({nullable: true, checkFalsy: true}),
		body('title').optional({nullable: true, checkFalsy: true}),
		body('body').optional({nullable: true, checkFalsy: true}),
		body('media_hash').optional({nullable: true, checkFalsy: true}),
		body('file_hash').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.media_hash !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.media_hash, 'media_hash');
			modeldata.media_hash = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.file_hash !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.file_hash, 'file_hash');
			modeldata.file_hash = fileInfo.filepath;
		}
		
		//save OtherContents record
		let record = await DB.OtherContents.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['other_content_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  OtherContents record for edit
 * @GET /othercontents/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['other_content_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.OtherContents.editFields();
		let record = await DB.OtherContents.findOne(query);
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
 * Route to update  OtherContents record
 * @POST /othercontents/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('content_type').optional({nullable: true, checkFalsy: true}),
		body('title').optional({nullable: true, checkFalsy: true}),
		body('body').optional({nullable: true, checkFalsy: true}),
		body('media_hash').optional({nullable: true, checkFalsy: true}),
		body('file_hash').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.media_hash !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.media_hash, 'media_hash');
			modeldata.media_hash = fileInfo.filepath;
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.file_hash !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.file_hash, 'file_hash');
			modeldata.file_hash = fileInfo.filepath;
		}
		const query = {};
		const where = {};
		where['other_content_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.OtherContents.editFields();
		let record = await DB.OtherContents.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.OtherContents.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete OtherContents record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /othercontents/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['other_content_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.OtherContents.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.OtherContents.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
