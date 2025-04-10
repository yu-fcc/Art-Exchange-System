import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list contentcategories records
 * @GET /contentcategories/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.ContentCategories.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'category_id', 'desc');
		query.attributes = DB.ContentCategories.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.ContentCategories.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view ContentCategories record
 * @GET /contentcategories/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['category_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentCategories.viewFields();
		let record = await DB.ContentCategories.findOne(query);
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
 * Route to insert ContentCategories record
 * @POST /contentcategories/add
 */
router.post('/add/', 
	[
		body('name').not().isEmpty(),
		body('description').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save ContentCategories record
		let record = await DB.ContentCategories.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['category_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  ContentCategories record for edit
 * @GET /contentcategories/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['category_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentCategories.editFields();
		let record = await DB.ContentCategories.findOne(query);
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
 * Route to update  ContentCategories record
 * @POST /contentcategories/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('name').optional({nullable: true}).not().isEmpty(),
		body('description').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['category_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentCategories.editFields();
		let record = await DB.ContentCategories.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.ContentCategories.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete ContentCategories record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /contentcategories/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['category_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.ContentCategories.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.ContentCategories.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
