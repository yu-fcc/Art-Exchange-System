
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Reports extends BaseModel {
	static init() {
		return super.init(
			{
				
				report_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				reporter_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				reported_content_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				reason: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				status: { type:Sequelize.ENUM('pending','reviewed','actioned','dismissed')   },
				created_at: { type:Sequelize.DATE   },
				updated_at: { type:Sequelize.DATE   }
			}, 
			{ 
				sequelize,
				
				tableName: "reports",
				modelName: "reports",
			}
		);
	}
	
	static listFields() {
		return [
			'report_id', 
			'reporter_id', 
			'reported_content_id', 
			'reason', 
			'status', 
			'created_at', 
			'updated_at'
		];
	}

	static viewFields() {
		return [
			'report_id', 
			'reporter_id', 
			'reported_content_id', 
			'reason', 
			'status', 
			'created_at', 
			'updated_at'
		];
	}

	static editFields() {
		return [
			'reporter_id', 
			'reported_content_id', 
			'reason', 
			'status', 
			'report_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("report_id LIKE :search"), 
			Sequelize.literal("reason LIKE :search"),
		];
	}

	
	
}
Reports.init();
export default Reports;
