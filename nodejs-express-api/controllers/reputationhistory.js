import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list reputationhistory records
 * @GET /reputationhistory/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.ReputationHistory.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'history_id', 'desc');
		query.attributes = DB.ReputationHistory.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.ReputationHistory.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view ReputationHistory record
 * @GET /reputationhistory/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['history_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ReputationHistory.viewFields();
		let record = await DB.ReputationHistory.findOne(query);
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
 * Route to insert ReputationHistory record
 * @POST /reputationhistory/add
 */
router.post('/add/', 
	[
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('change_amount').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('reason').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save ReputationHistory record
		let record = await DB.ReputationHistory.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['history_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  ReputationHistory record for edit
 * @GET /reputationhistory/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['history_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ReputationHistory.editFields();
		let record = await DB.ReputationHistory.findOne(query);
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
 * Route to update  ReputationHistory record
 * @POST /reputationhistory/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('change_amount').optional({nullable: true, checkFalsy: true}).isNumeric(),
		body('reason').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['history_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ReputationHistory.editFields();
		let record = await DB.ReputationHistory.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.ReputationHistory.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete ReputationHistory record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /reputationhistory/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['history_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.ReputationHistory.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.ReputationHistory.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
