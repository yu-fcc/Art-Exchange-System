
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Likes extends BaseModel {
	static init() {
		return super.init(
			{
				
				like_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				content_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   }
			}, 
			{ 
				sequelize,
				
				tableName: "likes",
				modelName: "likes",
			}
		);
	}
	
	static listFields() {
		return [
			'like_id', 
			'user_id', 
			'content_id', 
			'created_at'
		];
	}

	static viewFields() {
		return [
			'like_id', 
			'user_id', 
			'content_id', 
			'created_at'
		];
	}

	static editFields() {
		return [
			'user_id', 
			'content_id', 
			'like_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("like_id LIKE :search"),
		];
	}

	
	
}
Likes.init();
export default Likes;
