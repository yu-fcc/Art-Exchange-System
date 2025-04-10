import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list contentscomment records
 * @GET /contentscomment/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.ContentsComment.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'comment_id', 'desc');
		query.attributes = DB.ContentsComment.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.ContentsComment.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view ContentsComment record
 * @GET /contentscomment/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['comment_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentsComment.viewFields();
		let record = await DB.ContentsComment.findOne(query);
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
 * Route to insert ContentsComment record
 * @POST /contentscomment/add
 */
router.post('/add/', 
	[
		body('content_id').optional({nullable: true, checkFalsy: true}),
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('parent_id').optional({nullable: true, checkFalsy: true}),
		body('body').optional({nullable: true, checkFalsy: true}),
		body('media_hash').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.media_hash !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.media_hash, 'media_hash');
			modeldata.media_hash = fileInfo.filepath;
		}
		
		//save ContentsComment record
		let record = await DB.ContentsComment.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['comment_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  ContentsComment record for edit
 * @GET /contentscomment/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['comment_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentsComment.editFields();
		let record = await DB.ContentsComment.findOne(query);
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
 * Route to update  ContentsComment record
 * @POST /contentscomment/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('content_id').optional({nullable: true, checkFalsy: true}),
		body('user_id').optional({nullable: true, checkFalsy: true}),
		body('parent_id').optional({nullable: true, checkFalsy: true}),
		body('body').optional({nullable: true, checkFalsy: true}),
		body('media_hash').optional({nullable: true, checkFalsy: true}),
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
		const query = {};
		const where = {};
		where['comment_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentsComment.editFields();
		let record = await DB.ContentsComment.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.ContentsComment.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete ContentsComment record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /contentscomment/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['comment_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.ContentsComment.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.ContentsComment.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to list contentscomment records
 * @GET /contentscomment/index/{fieldname}/{fieldvalue}
 */
router.get('/comment_section/:fieldname?/:fieldvalue?', async (req, res) => {  
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
			let searchFields = DB.ContentsComment.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'comment_id', 'desc');
		query.attributes = DB.ContentsComment.commentSectionFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.ContentsComment.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});
router.get('/getcomments/:content_id', async (req, res) => {  
   try {
        const { content_id } = req.params;
        const sql = `SELECT c.comment_id, c.body, c.created_at, c.parent_id, u.username, c.media_hash FROM contents_comment c JOIN users u ON c.user_id = u.user_id WHERE c.content_id = ? `;
        const comments = await DB.rawQueryList(sql, [content_id]);
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching comments' });
    }
});
router.delete('/removed/:comment_id', async (req, res) => {  
    try{
        let sqltext = "DELETE FROM `Contents_Comment` WHERE comment_id =:param1";
        let queryParams = {
            param1: req.params.comment_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch(err) {
        return res.serverError(err);
    }
});
router.get('/getcommentcount/:content_id', async (req, res) => {  
    try{
        console.log("==req.params:",req.params)
        let sqltext = "SELECT count(1) as commentCount from `Contents_Comment` where content_id=:param1";
        let queryParams = {
            param1: req.params.content_id
        }
        let result = await DB.rawQueryList(sqltext, queryParams);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ error: 'No comments found' });
        }
    } catch (error) {
        console.error('Error processing request:', error);  // 打印更详细的错误信息
        return res.status(500).json({ error: 'Error processing request', details: error.message });
    }
});
export default router;
