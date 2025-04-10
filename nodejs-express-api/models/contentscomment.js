
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class ContentsComment extends BaseModel {
	static init() {
		return super.init(
			{
				
				comment_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				content_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				parent_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				body: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				media_hash: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				blockchain_tx: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   },
				updated_at: { type:Sequelize.DATE   }
			}, 
			{ 
				sequelize,
				
				tableName: "contents_comment",
				modelName: "contents_comment",
			}
		);
	}
	
	static listFields() {
		return [
			'comment_id', 
			'content_id', 
			'user_id', 
			'parent_id', 
			'body', 
			'media_hash', 
			'created_at', 
			'updated_at'
		];
	}

	static viewFields() {
		return [
			'comment_id', 
			'content_id', 
			'user_id', 
			'parent_id', 
			'body', 
			'media_hash', 
			'created_at', 
			'updated_at'
		];
	}

	static editFields() {
		return [
			'content_id', 
			'user_id', 
			'parent_id', 
			'body', 
			'media_hash', 
			'comment_id'
		];
	}

	static commentSectionFields() {
		return [
			'comment_id', 
			'user_id', 
			'parent_id', 
			'body', 
			'media_hash', 
			'created_at'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("comment_id LIKE :search"), 
			Sequelize.literal("body LIKE :search"), 
			Sequelize.literal("media_hash LIKE :search"), 
			Sequelize.literal("blockchain_tx LIKE :search"),
		];
	}

	
	
}
ContentsComment.init();
export default ContentsComment;
