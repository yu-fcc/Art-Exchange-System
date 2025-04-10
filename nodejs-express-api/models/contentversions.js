
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class ContentVersions extends BaseModel {
	static init() {
		return super.init(
			{
				
				version_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				content_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE , allowNull: false  },
				content_type: { type:Sequelize.ENUM('painting','sculpture','photography','ceramics','installation','digital_art','other')  ,defaultValue: Sequelize.literal('DEFAULT') },
				title: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				description: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				medium: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				dimensions: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				year_created: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				art_image: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				tag_id: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "content_versions",
				modelName: "content_versions",
			}
		);
	}
	
	static listFields() {
		return [
			Sequelize.literal('content_versions.version_id AS version_id'), 
			Sequelize.literal('content_versions.content_id AS content_id'), 
			Sequelize.literal('content_versions.created_at AS created_at'), 
			Sequelize.literal('content_versions.content_type AS content_type'), 
			Sequelize.literal('content_versions.title AS title'), 
			Sequelize.literal('content_versions.description AS description'), 
			Sequelize.literal('content_versions.medium AS medium'), 
			Sequelize.literal('content_versions.dimensions AS dimensions'), 
			Sequelize.literal("con_tag_name.tag_names AS contagname_tag_names"), 
			Sequelize.literal('content_versions.year_created AS year_created'), 
			Sequelize.literal('content_versions.art_image AS art_image')
		];
	}

	static viewFields() {
		return [
			Sequelize.literal('content_versions.version_id AS version_id'), 
			Sequelize.literal('content_versions.content_id AS content_id'), 
			Sequelize.literal('content_versions.created_at AS created_at'), 
			Sequelize.literal('content_versions.content_type AS content_type'), 
			Sequelize.literal('content_versions.title AS title'), 
			Sequelize.literal('content_versions.description AS description'), 
			Sequelize.literal('content_versions.medium AS medium'), 
			Sequelize.literal('content_versions.dimensions AS dimensions'), 
			Sequelize.literal('content_versions.year_created AS year_created'), 
			Sequelize.literal('content_versions.art_image AS art_image'), 
			Sequelize.literal('content_versions.tag_id AS tag_id'), 
			Sequelize.literal("con_tag_name.id AS contagname_id"), 
			Sequelize.literal("con_tag_name.title AS contagname_title"), 
			Sequelize.literal("con_tag_name.tag_id AS contagname_tag_id"), 
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
			'tag_id', 
			'version_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("content_versions.version_id LIKE :search"), 
			Sequelize.literal("content_versions.title LIKE :search"), 
			Sequelize.literal("content_versions.description LIKE :search"), 
			Sequelize.literal("content_versions.medium LIKE :search"), 
			Sequelize.literal("content_versions.dimensions LIKE :search"), 
			Sequelize.literal("con_tag_name.tag_names LIKE :search"), 
			Sequelize.literal("content_versions.year_created LIKE :search"), 
			Sequelize.literal("con_tag_name.id LIKE :search"), 
			Sequelize.literal("con_tag_name.title LIKE :search"), 
			Sequelize.literal("con_tag_name.tag_id LIKE :search"), 
			Sequelize.literal("content_versions.tag_id LIKE :search"),
		];
	}

	
	
}
ContentVersions.init();
export default ContentVersions;
