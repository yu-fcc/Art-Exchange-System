
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Contents extends BaseModel {
	static init() {
		return super.init(
			{
				
				content_id: { type: Sequelize.INTEGER, primaryKey: true, defaultValue: Sequelize.literal('DEFAULT') },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				content_type: { type:Sequelize.ENUM('painting','sculpture','photography','ceramics','installation','digital_art','other')  ,defaultValue: Sequelize.literal('DEFAULT') },
				title: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				description: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				medium: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				dimensions: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				year_created: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				art_image: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   },
				updated_at: { type:Sequelize.DATE   },
				tag_id: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "contents",
				modelName: "contents",
			}
		);
	}
	
	static listFields() {
		return [
			Sequelize.literal('contents.content_id AS content_id'), 
			Sequelize.literal('contents.user_id AS user_id'), 
			Sequelize.literal('contents.content_type AS content_type'), 
			Sequelize.literal('contents.title AS title'), 
			Sequelize.literal('contents.description AS description'), 
			Sequelize.literal('contents.medium AS medium'), 
			Sequelize.literal('contents.dimensions AS dimensions'), 
			Sequelize.literal('contents.year_created AS year_created'), 
			Sequelize.literal('contents.art_image AS art_image')
		];
	}

	static viewFields() {
		return [
			Sequelize.literal('contents.content_id AS content_id'), 
			Sequelize.literal('contents.user_id AS user_id'), 
			Sequelize.literal('contents.content_type AS content_type'), 
			Sequelize.literal('contents.title AS title'), 
			Sequelize.literal('contents.description AS description'), 
			Sequelize.literal('contents.medium AS medium'), 
			Sequelize.literal('contents.dimensions AS dimensions'), 
			Sequelize.literal('contents.year_created AS year_created'), 
			Sequelize.literal('contents.art_image AS art_image'), 
			Sequelize.literal("con_tag_name.tag_names AS contagname_tag_names")
		];
	}

	static editFields() {
		return [
			'content_id', 
			'content_type', 
			'title', 
			'description', 
			'medium', 
			'dimensions', 
			'year_created', 
			'art_image', 
			'tag_id'
		];
	}

	static personalPortfolioFields() {
		return [
			'content_id', 
			'content_type', 
			'title', 
			'description', 
			'medium', 
			'dimensions', 
			'year_created', 
			'art_image', 
			'created_at', 
			'updated_at', 
			'tag_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("contents.content_id LIKE :search"), 
			Sequelize.literal("contents.title LIKE :search"), 
			Sequelize.literal("contents.description LIKE :search"), 
			Sequelize.literal("contents.medium LIKE :search"), 
			Sequelize.literal("contents.dimensions LIKE :search"), 
			Sequelize.literal("con_tag_name.id LIKE :search"), 
			Sequelize.literal("con_tag_name.title LIKE :search"), 
			Sequelize.literal("con_tag_name.tag_id LIKE :search"), 
			Sequelize.literal("con_tag_name.tag_names LIKE :search"),
		];
	}

	
	
}
Contents.init();
export default Contents;
