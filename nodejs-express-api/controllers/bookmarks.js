import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list bookmarks records
 * @GET /bookmarks/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Bookmarks.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'bookmark_id', 'desc');
		query.attributes = DB.Bookmarks.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Bookmarks.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Bookmarks record
 * @GET /bookmarks/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['bookmark_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Bookmarks.viewFields();
		let record = await DB.Bookmarks.findOne(query);
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
 * Route to insert Bookmarks record
 * @POST /bookmarks/add
 */
router.post('/add/', 
	[
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('content_id').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Bookmarks record
		let record = await DB.Bookmarks.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['bookmark_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Bookmarks record for edit
 * @GET /bookmarks/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['bookmark_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Bookmarks.editFields();
		let record = await DB.Bookmarks.findOne(query);
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
 * Route to update  Bookmarks record
 * @POST /bookmarks/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('content_id').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['bookmark_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Bookmarks.editFields();
		let record = await DB.Bookmarks.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Bookmarks.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Bookmarks record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /bookmarks/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['bookmark_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Bookmarks.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Bookmarks.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/getbookmarkcount/:content_id', async (req, res) => {  
    try{
        let sqltext = "SELECT count(1) as bookmarkCount FROM `bookmarks` where content_id=:param1";
        console.log("==req.params:",req.params);
        let queryParams = {
            param1:req.params.content_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        console.log("==records:",records);
        return res.ok(records);
    }
    catch(err) {
        return res.serverError(err);
    }
});
router.delete('/removed/:user_id/:content_id', async (req, res) => {  
    try{
        const { user_id, content_id } = req.params; 
        let sqltext = "DELETE FROM bookmarks WHERE user_id = ? AND content_id = ?";
        let records = await DB.rawQueryList(sqltext, [user_id, content_id]);
        if (records && records.affectedRows > 0) {
             console.log("bookmarks removed successfully");
             return res.ok({ message: "bookmarks removed successfully", data: records });
        } else {
             console.log("No bookmarks found for this user and content");
             return res.ok({ message: "No bookmarks found for this user and content" });
        }
    } catch (err) {
        console.error("Error removing bookmarks:", err);
        return res.serverError(err);  
    }
});
router.get('/getbookmarkstatus/:user_id/:content_id', async (req, res) => {  
    try{
        const { user_id, content_id } = req.params; 
        let sqltext = "SELECT * FROM `bookmarks` where user_id=? and content_id = ?";
        let records = await DB.rawQueryList(sqltext, [ user_id, content_id]);
       if (records.length > 0) {
           return res.status(200).json({ isBookmarked: true });
        } else {
        return res.status(200).json({ isBookmarked: false });
        }
    }
    catch(err) {
        return res.serverError(err);
    }
});
export default router;
