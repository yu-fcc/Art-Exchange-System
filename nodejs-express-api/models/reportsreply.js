
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class ReportsReply extends BaseModel {
	static init() {
		return super.init(
			{
				
				reply_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				report_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				replay_content: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				status: { type:Sequelize.ENUM('pending','reviewed','actioned','dismissed')   }
			}, 
			{ 
				sequelize,
				
				tableName: "reports_reply",
				modelName: "reports_reply",
			}
		);
	}
	
	static listFields() {
		return [
			'reply_id', 
			'report_id', 
			'replay_content', 
			'user_id', 
			'status'
		];
	}

	static viewFields() {
		return [
			'reply_id', 
			'report_id', 
			'replay_content', 
			'user_id', 
			'status'
		];
	}

	static editFields() {
		return [
			'report_id', 
			'replay_content', 
			'user_id', 
			'status', 
			'reply_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("reply_id LIKE :search"), 
			Sequelize.literal("replay_content LIKE :search"),
		];
	}

	
	
}
ReportsReply.init();
export default ReportsReply;
