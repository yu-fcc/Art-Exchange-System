
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class ConTagName extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true },
				title: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				tag_id: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				tag_names: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "con_tag_name",
				modelName: "con_tag_name",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'title', 
			'tag_id', 
			'tag_names'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("title LIKE :search"), 
			Sequelize.literal("tag_id LIKE :search"), 
			Sequelize.literal("tag_names LIKE :search"),
		];
	}

	
	
}
ConTagName.init();
export default ConTagName;
