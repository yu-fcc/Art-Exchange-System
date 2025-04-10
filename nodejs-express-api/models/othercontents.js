
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class OtherContents extends BaseModel {
	static init() {
		return super.init(
			{
				
				other_content_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				content_type: { type:Sequelize.ENUM('comment','share')  ,defaultValue: Sequelize.literal('DEFAULT') },
				parent_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				title: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				body: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				media_hash: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				blockchain_tx: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   },
				updated_at: { type:Sequelize.DATE   },
				file_hash: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "other_contents",
				modelName: "other_contents",
			}
		);
	}
	
	static listFields() {
		return [
			'other_content_id', 
			'user_id', 
			'content_type', 
			'title', 
			'body', 
			'media_hash', 
			'created_at', 
			'updated_at', 
			'file_hash'
		];
	}

	static viewFields() {
		return [
			'other_content_id', 
			'user_id', 
			'content_type', 
			'title', 
			'body', 
			'media_hash', 
			'created_at', 
			'updated_at', 
			'file_hash'
		];
	}

	static editFields() {
		return [
			'user_id', 
			'content_type', 
			'title', 
			'body', 
			'media_hash', 
			'file_hash', 
			'other_content_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("other_content_id LIKE :search"), 
			Sequelize.literal("title LIKE :search"), 
			Sequelize.literal("body LIKE :search"), 
			Sequelize.literal("media_hash LIKE :search"), 
			Sequelize.literal("blockchain_tx LIKE :search"),
		];
	}

	
	
}
OtherContents.init();
export default OtherContents;
