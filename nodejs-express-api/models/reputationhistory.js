
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class ReputationHistory extends BaseModel {
	static init() {
		return super.init(
			{
				
				history_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				change_amount: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				reason: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE , allowNull: false  }
			}, 
			{ 
				sequelize,
				
				tableName: "reputation_history",
				modelName: "reputation_history",
			}
		);
	}
	
	static listFields() {
		return [
			'history_id', 
			'user_id', 
			'change_amount', 
			'reason', 
			'created_at'
		];
	}

	static viewFields() {
		return [
			'history_id', 
			'user_id', 
			'change_amount', 
			'reason', 
			'created_at'
		];
	}

	static editFields() {
		return [
			'history_id', 
			'user_id', 
			'change_amount', 
			'reason'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("history_id LIKE :search"), 
			Sequelize.literal("reason LIKE :search"),
		];
	}

	
	
}
ReputationHistory.init();
export default ReputationHistory;
