
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Tags extends BaseModel {
	static init() {
		return super.init(
			{
				
				tag_id: { type: Sequelize.STRING, primaryKey: true, autoIncrement: true },
				name: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   }
			}, 
			{ 
				sequelize,
				
				tableName: "tags",
				modelName: "tags",
			}
		);
	}
	
	static listFields() {
		return [
			'tag_id', 
			'name', 
			'created_at'
		];
	}

	static viewFields() {
		return [
			'tag_id', 
			'name', 
			'created_at'
		];
	}

	static editFields() {
		return [
			'name', 
			'tag_id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("tag_id LIKE :search"), 
			Sequelize.literal("name LIKE :search"),
		];
	}

	
	
}
Tags.init();
export default Tags;
