import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list reports records
 * @GET /reports/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Reports.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'report_id', 'desc');
		query.attributes = DB.Reports.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Reports.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Reports record
 * @GET /reports/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['report_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Reports.viewFields();
		let record = await DB.Reports.findOne(query);
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
 * Route to insert Reports record
 * @POST /reports/add
 */
router.post('/add/', 
	[
		body('reported_content_id').optional({nullable: true, checkFalsy: true}),
		body('reason').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['reporter_id'] = req.user.user_id;
		
		//save Reports record
		let record = await DB.Reports.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['report_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Reports record for edit
 * @GET /reports/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['report_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Reports.editFields();
		let record = await DB.Reports.findOne(query);
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
 * Route to update  Reports record
 * @POST /reports/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('reported_content_id').optional({nullable: true, checkFalsy: true}),
		body('reason').optional({nullable: true, checkFalsy: true}),
		body('status').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['report_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Reports.editFields();
		let record = await DB.Reports.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Reports.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Reports record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /reports/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['report_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Reports.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Reports.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
