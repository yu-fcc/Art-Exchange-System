import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list contents records
 * @GET /contents/index/{fieldname}/{fieldvalue}
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
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.ConTagName,
			required: true,
			as: 'con_tag_name',
			attributes: [], //already set via model class
		})
		query.include = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = DB.Contents.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(req.query.year_created){
			let fromDate = req.query.year_created.from || null;
			let toDate = req.query.year_created.to || null;
			if (fromDate && toDate){
				queryFilters.push(DB.filterBy("contents.year_created", {[DB.op.between]: [fromDate, toDate]}));
			}
		}
		if(req.query.content_type){
			queryFilters.push(DB.filterBy("contents.content_type", req.query.content_type))
		}
		if(req.query.medium){
			queryFilters.push(DB.filterBy("contents.medium", req.query.medium))
		}
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'content_id', 'desc');
		query.attributes = DB.Contents.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 6;
		let result = await DB.Contents.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Contents record
 * @GET /contents/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.ConTagName,
			required: true,
			as: 'con_tag_name',
			attributes: [], //already set via model class
		})
		query.include = joinTables;
		where[DB.op.and] = DB.raw('contents.content_id = :recid');
		query.replacements = {
			recid
		}
		query.raw = true;
		query.where = where;
		query.attributes = DB.Contents.viewFields();
		let record = await DB.Contents.findOne(query);
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
 * Route to insert Contents record
 * @POST /contents/add
 */
router.post('/add/', 
	[
		body('content_id').not().isEmpty().isNumeric(),
		body('content_type').optional({nullable: true, checkFalsy: true}),
		body('title').optional({nullable: true, checkFalsy: true}),
		body('description').optional({nullable: true, checkFalsy: true}),
		body('medium').optional({nullable: true, checkFalsy: true}),
		body('dimensions').optional({nullable: true, checkFalsy: true}),
		body('year_created').optional({nullable: true, checkFalsy: true}),
		body('art_image').optional({nullable: true, checkFalsy: true}),
		body('tag_id').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata['user_id'] = req.user.user_id;
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.art_image !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.art_image, 'art_image');
			modeldata.art_image = fileInfo.filepath;
		}
		
		//save Contents record
		let record = await DB.Contents.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['content_id'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Contents record for edit
 * @GET /contents/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['content_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Contents.editFields();
		let record = await DB.Contents.findOne(query);
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
 * Route to update  Contents record
 * @POST /contents/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('content_id').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('content_type').optional({nullable: true, checkFalsy: true}),
		body('title').optional({nullable: true, checkFalsy: true}),
		body('description').optional({nullable: true, checkFalsy: true}),
		body('medium').optional({nullable: true, checkFalsy: true}),
		body('dimensions').optional({nullable: true, checkFalsy: true}),
		body('year_created').optional({nullable: true, checkFalsy: true}),
		body('art_image').optional({nullable: true, checkFalsy: true}),
		body('tag_id').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.art_image !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.art_image, 'art_image');
			modeldata.art_image = fileInfo.filepath;
		}
		const query = {};
		const where = {};
		where['content_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Contents.editFields();
		await beforeEdit(recid, modeldata, req);
		let record = await DB.Contents.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Contents.update(modeldata, {where: where});
		record = await DB.Contents.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		await afterEdit(recid, record, req);
		req.writeToAuditLog({ recid, oldValues, newValues });
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});
/**
* Before update page record
* @param {string} recid // record id to be updated
* @param {object} postdata // validated form data used to update record
*/
let oldRecordCache = null; // 用于存储旧数据
// 触发修改前事件
async function beforeEdit(recid, record, req) {
    try {
        // 使用 recid 查询数据库中的旧数据
        const oldRecordResult = await DB.sequelize.query(
            `SELECT * FROM contents WHERE content_id = :content_id`,
            { replacements: { content_id: recid } }
        );
        // 检查是否查询到数据
        if (!oldRecordResult || oldRecordResult[0].length === 0) {
            console.error(`No record found with content_id: ${recid}`);
            oldRecordCache = null; // 未找到记录时清空缓存
            return;
        }
        // 保存查询到的旧数据到缓存
        oldRecordCache = oldRecordResult[0][0]; // 解包查询结果
        console.log("Cached old record:", oldRecordCache);
    } catch (error) {
        console.error("Error in beforeEdit:", error);
    }
}
/**
* After page record updated
* @param {string} recid // updated record id
* @param {object} record // updated page record
*/
async function afterEdit(recid, record, req) {
    try {
        // 检查是否存在旧数据缓存
        if (!oldRecordCache) {
            console.error("No old record cached. Skipping versioning.");
            return;
        }
        // 准备插入版本表的数据
        const modeldata = {
            content_id: oldRecordCache.content_id,
            content_type: oldRecordCache.content_type,
            title: oldRecordCache.title,
            description: oldRecordCache.description,
            medium: oldRecordCache.medium,
            dimensions: oldRecordCache.dimensions,
            year_created: oldRecordCache.year_created,
            art_image: oldRecordCache.art_image,
            tag_id: oldRecordCache.tag_id,
            created_at: new Date(), // 当前时间
        };
        // 插入旧数据到版本表
        await DB.sequelize.query(
            `INSERT INTO content_versions (content_id, content_type, title, description, medium, dimensions, year_created, art_image, tag_id, created_at)
            VALUES (:content_id, :content_type, :title, :description, :medium, :dimensions, :year_created, :art_image, :tag_id, :created_at)`,
            { replacements: modeldata }
        );
        console.log(`Version record successfully created for content_id: ${recid}`);
    } catch (error) {
        console.error("Error while creating version record:", error);
    } finally {
        oldRecordCache = null; // 清空缓存
    }
}


/**
 * Route to delete Contents record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /contents/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['content_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Contents.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			req.writeToAuditLog({ recid: record['content_id'], oldValues });
		});
		await DB.Contents.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to list contents records
 * @GET /contents/index/{fieldname}/{fieldvalue}
 */
router.get('/personal_portfolio/:fieldname?/:fieldvalue?', async (req, res) => {  
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
			let searchFields = DB.Contents.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'content_id', 'desc');
		query.attributes = DB.Contents.personalPortfolioFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Contents.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});
router.get('/works/:user_id', async (req, res) => {  
    try{
        let sqltext = "SELECT * FROM `contents` where user_id =:param1";
         console.log("==req.params:",req.params);
        let queryParams = {
            param1:req.params.user_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
       if (records.length === 0) {
            console.log("No records found for user_id:", req.params.user_id);
        } else {
            console.log("Records found:", records);
        }
        return res.ok(records); 
    } catch (err) {
        console.error("Database error:", err);
        return res.serverError(err);
    }
});
export default router;
