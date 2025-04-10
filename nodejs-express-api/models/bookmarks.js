
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Bookmarks extends BaseModel {
	static init() {
		return super.init(
			{
				
				bookmark_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				content_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   }
			}, 
			{ 
				sequelize,
				
				tableName: "bookmarks",
				modelName: "bookmarks",
			}
		);
	}
	
	static listFields() {
		return [
			'bookmark_id', 
			'user_id', 
			'content_id', 
			'created_at'
		];
	}

	static viewFields() {
		return [
			'bookmark_id', 
			'user_id', 
			'content_id', 
			'created_at'
		];
	}

	static editFields() {
		return [
			'bookmark_id', 
			'user_id', 
			'content_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("bookmark_id LIKE :search"),
		];
	}

	
	
}
Bookmarks.init();
export default Bookmarks;
