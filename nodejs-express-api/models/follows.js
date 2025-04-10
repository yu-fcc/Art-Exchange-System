
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Follows extends BaseModel {
	static init() {
		return super.init(
			{
				
				follow_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				follower_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				followed_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   }
			}, 
			{ 
				sequelize,
				
				tableName: "follows",
				modelName: "follows",
			}
		);
	}
	
	static listFields() {
		return [
			'follow_id', 
			'follower_id', 
			'followed_id', 
			'created_at'
		];
	}

	static viewFields() {
		return [
			'follow_id', 
			'follower_id', 
			'followed_id', 
			'created_at'
		];
	}

	static editFields() {
		return [
			'follower_id', 
			'follow_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("follow_id LIKE :search"),
		];
	}

	
	
}
Follows.init();
export default Follows;
