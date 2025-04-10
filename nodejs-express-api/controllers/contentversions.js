import { Router } from 'express';
import { body } from 'express-validator';
import uploader from '../helpers/uploader.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list contentversions records
 * @GET /contentversions/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.ContentVersions.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'version_id', 'desc');
		query.attributes = DB.ContentVersions.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.ContentVersions.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view ContentVersions record
 * @GET /contentversions/view/{recid}
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
		where[DB.op.and] = DB.raw('content_versions.version_id = :recid');
		query.replacements = {
			recid
		}
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentVersions.viewFields();
		let record = await DB.ContentVersions.findOne(query);
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
 * Route to insert ContentVersions record
 * @POST /contentversions/add
 */
router.post('/add/', 
	[
		body('content_id').optional({nullable: true, checkFalsy: true}),
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
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.art_image !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.art_image, 'art_image');
			modeldata.art_image = fileInfo.filepath;
		}
		
		//save ContentVersions record
		let record = await DB.ContentVersions.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['version_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  ContentVersions record for edit
 * @GET /contentversions/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['version_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentVersions.editFields();
		let record = await DB.ContentVersions.findOne(query);
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
 * Route to update  ContentVersions record
 * @POST /contentversions/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('content_id').optional({nullable: true, checkFalsy: true}),
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
		where['version_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ContentVersions.editFields();
		let record = await DB.ContentVersions.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.ContentVersions.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete ContentVersions record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /contentversions/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['version_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.ContentVersions.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.ContentVersions.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.get('/rollback/:version_id', async (req, res) => {
    try {
        const { version_id } = req.params;
        // 检查版本 ID 是否有效
        if (!version_id) {
            return res.status(400).json({ success: false, message: '版本 ID 不能为空' });
        }
        // 1. 查询版本表，获取指定版本数据
        const versionResult = await DB.sequelize.query(
            `SELECT * FROM content_versions WHERE version_id = :version_id`,
            { replacements: { version_id }, type: DB.sequelize.QueryTypes.SELECT }
        );
        // 检查是否存在该版本数据
        if (!versionResult || versionResult.length === 0) {
            return res.status(404).json({ success: false, message: '未找到对应版本数据' });
        }
        const versionData = versionResult[0]; // 指定的历史版本数据
        // 2. 查询内容表，获取当前最新数据
        const currentContentResult = await DB.sequelize.query(
            `SELECT * FROM contents WHERE content_id = :content_id`,
            { replacements: { content_id: versionData.content_id }, type: DB.sequelize.QueryTypes.SELECT }
        );
        // 检查内容表是否有对应记录
        if (!currentContentResult || currentContentResult.length === 0) {
            return res.status(404).json({ success: false, message: '未找到对应的内容数据' });
        }
        const currentContent = currentContentResult[0]; // 当前最新的内容数据
        // 3. 将当前内容存入版本表
        await DB.sequelize.query(
            `INSERT INTO content_versions (content_id, content_type, title, description, medium, dimensions, year_created, art_image, tag_id, created_at)
             VALUES (:content_id, :content_type, :title, :description, :medium, :dimensions, :year_created, :art_image, :tag_id, :created_at)`,
            {
                replacements: {
                    content_id: currentContent.content_id,
                    content_type: currentContent.content_type,
                    title: currentContent.title,
                    description: currentContent.description,
                    medium: currentContent.medium,
                    dimensions: currentContent.dimensions,
                    year_created: currentContent.year_created,
                    art_image: currentContent.art_image,
                    tag_id: currentContent.tag_id,
                    created_at: new Date(), // 插入时间
                },
                type: DB.sequelize.QueryTypes.INSERT,
            }
        );
        // 4. 将指定版本数据写回内容表
        await DB.sequelize.query(
            `UPDATE contents 
             SET content_type = :content_type,
                 title = :title,
                 description = :description,
                 medium = :medium,
                 dimensions = :dimensions,
                 year_created = :year_created,
                 art_image = :art_image,
                 tag_id = :tag_id
             WHERE content_id = :content_id`,
            {
                replacements: {
                    content_id: versionData.content_id,
                    content_type: versionData.content_type,
                    title: versionData.title,
                    description: versionData.description,
                    medium: versionData.medium,
                    dimensions: versionData.dimensions,
                    year_created: versionData.year_created,
                    art_image: versionData.art_image,
                    tag_id: versionData.tag_id,
                },
                type: DB.sequelize.QueryTypes.UPDATE,
            }
        );
        // 5. 返回回滚成功的响应
        res.json({ success: true, message: `成功回滚到版本 ID: ${version_id}` });
    } catch (error) {
        console.error('回滚时发生错误:', error);
        res.status(500).json({ success: false, message: '回滚失败，请检查服务器日志', error: error.message });
    }
});
export default router;
