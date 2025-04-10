import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list follows records
 * @GET /follows/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Follows.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['followed_id'] = req.user.user_id; //filter only current records
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'follow_id', 'desc');
		query.attributes = DB.Follows.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Follows.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Follows record
 * @GET /follows/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		let allowedRoles = ["admin"];
		let userRole = req.userRoleName;
		if(!allowedRoles.includes(userRole)){
			where['followed_id'] = req.user.user_id; //filter only current records
		}
		where['follow_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Follows.viewFields();
		let record = await DB.Follows.findOne(query);
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
 * Route to insert Follows record
 * @POST /follows/add
 */
router.post('/add/', 
	[
		body('follower_id').optional({nullable: true, checkFalsy: true}),
		body('followed_id').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Follows record
		let record = await DB.Follows.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['follow_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Follows record for edit
 * @GET /follows/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['followed_id'] = req.user.user_id; //filter only current records
		where['follow_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Follows.editFields();
		let record = await DB.Follows.findOne(query);
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
 * Route to update  Follows record
 * @POST /follows/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('follower_id').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['followed_id'] = req.user.user_id; //filter only current records
		where['follow_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Follows.editFields();
		let record = await DB.Follows.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Follows.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Follows record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /follows/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['followed_id'] = req.user.user_id; //filter only current records
		where['follow_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Follows.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Follows.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
router.delete('/removed/:follower_id/:followed_id', async (req, res) => {  
    try{
        const { follower_id, followed_id } = req.params; 
        let sqltext = "DELETE FROM follows WHERE follower_id = ? AND followed_id = ?";
        let records = await DB.rawQueryList(sqltext, [ follower_id, followed_id]);
        if (records && records.affectedRows > 0) {
             console.log("follows removed successfully");
             return res.ok({ message: "follows removed successfully", data: records });
        } else {
             console.log("No follows found for this user and content");
             return res.ok({ message: "No follows found for this user and content" });
        }
    } catch (err) {
        console.error("Error removing follows:", err);
        return res.serverError(err);  
    }
});
router.get('/getfollowstatus/:follower_id/:followed_id', async (req, res) => {  
    try{
        const { follower_id, followed_id } = req.params; 
        let sqltext = "SELECT * FROM `follows` where follower_id=? and followed_id = ?";
        let records = await DB.rawQueryList(sqltext, [follower_id, followed_id]);
       if (records.length > 0) {
            return res.status(200).json({ isFollowed: true });
        } else {
            return res.status(200).json({ isFollowed: false });
        }
    }
    catch(err) {
        return res.serverError(err);
    }
});
router.get('/getfollowcount/:followed_id', async (req, res) => {  
    try{
        let sqltext = "SELECT count(1) as followcount from `follows` where followed_id=:param1";
        let queryParams = {
            param1: req.params.followed_id
        }
        let records = await DB.rawQueryList(sqltext, queryParams);
        return res.ok(records);
    }
    catch(err) {
        return res.serverError(err);
    }
});
router.get('/getmutualfollowstatus/:follower_id/:followed_id', async (req, res) => {  
     try {
        const { follower_id, followed_id } = req.params;
        // 检查用户1是否关注了用户2
        let sqltext1 = "SELECT * FROM `follows` WHERE follower_id = ? AND followed_id = ?";
        let records1 = await DB.rawQueryList(sqltext1, [follower_id, followed_id]);
        // 检查用户2是否关注了用户1
        let sqltext2 = "SELECT * FROM `follows` WHERE follower_id = ? AND followed_id = ?";
        let records2 = await DB.rawQueryList(sqltext2, [followed_id, follower_id]);
        if (records1.length > 0 && records2.length > 0) {
            return res.status(200).json({ isMutualFollow: true });
        } else {
            return res.status(200).json({ isMutualFollow: false });
        }
    } catch (err) {
        return res.serverError(err);
    }
});
export default router;
