import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list reportsreply records
 * @GET /reportsreply/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.ReportsReply.searchFields();
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
		query.attributes = DB.ReportsReply.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.ReportsReply.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view ReportsReply record
 * @GET /reportsreply/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ReportsReply.viewFields();
		let record = await DB.ReportsReply.findOne(query);
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
 * Route to insert ReportsReply record
 * @POST /reportsreply/add
 */
router.post('/add/', 
	[
		body('report_id').optional({nullable: true, checkFalsy: true}),
		body('replay_content').not().isEmpty(),
		body('status').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save ReportsReply record
		let record = await DB.ReportsReply.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['reply_id'];
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
async function afterAdd(record, req) {
    // 获取有效的表单数据
    let modeldata = req.getValidFormData();
    try {
        // 获取传入的举报回复信息
        const reportId = modeldata.report_id;  // 举报ID
        const newStatus = modeldata.status;    // 新状态（如 'reviewed', 'actioned', 'dismissed'）
        // 更新 `reports` 表中的 `status` 字段
        const updatedReport = await DB.reports.update(
            { status: newStatus },  // 更新状态为新的状态
            { where: { report_id: reportId } }  // 通过 `report_id` 定位举报记录
        );
        // 如果更新成功，输出日志
        if (updatedReport[0] > 0) {
            console.log(`Report status updated to '${newStatus}' for report ID: ${reportId}`);
        } else {
            console.log(`Failed to update report status for report ID: ${reportId}`);
        }
    } catch (error) {
        console.error('Error updating report status:', error);
    }
}


/**
 * Route to get  ReportsReply record for edit
 * @GET /reportsreply/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.ReportsReply.editFields();
		let record = await DB.ReportsReply.findOne(query);
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
 * Route to update  ReportsReply record
 * @POST /reportsreply/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('report_id').optional({nullable: true, checkFalsy: true}),
		body('replay_content').optional({nullable: true}).not().isEmpty(),
		body('status').optional({nullable: true, checkFalsy: true}),
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
		query.attributes = DB.ReportsReply.editFields();
		let record = await DB.ReportsReply.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.ReportsReply.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete ReportsReply record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /reportsreply/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['reply_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.ReportsReply.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.ReportsReply.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
