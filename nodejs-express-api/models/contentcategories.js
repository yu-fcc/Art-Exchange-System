
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class ContentCategories extends BaseModel {
	static init() {
		return super.init(
			{
				
				category_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				name: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				description: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE , allowNull: false  }
			}, 
			{ 
				sequelize,
				
				tableName: "content_categories",
				modelName: "content_categories",
			}
		);
	}
	
	static listFields() {
		return [
			'category_id', 
			'name', 
			'description', 
			'created_at'
		];
	}

	static viewFields() {
		return [
			'category_id', 
			'name', 
			'description', 
			'created_at'
		];
	}

	static editFields() {
		return [
			'category_id', 
			'name', 
			'description'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("category_id LIKE :search"), 
			Sequelize.literal("name LIKE :search"), 
			Sequelize.literal("description LIKE :search"),
		];
	}

	
	
}
ContentCategories.init();
export default ContentCategories;
