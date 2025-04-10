
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Notifications extends BaseModel {
	static init() {
		return super.init(
			{
				
				notification_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				type: { type:Sequelize.ENUM('like','comment','follow','mention','message','event','system') , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				content: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				is_read: { type:Sequelize.STRING   },
				created_at: { type:Sequelize.DATE   },
				sender_user_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "notifications",
				modelName: "notifications",
			}
		);
	}
	
	static listFields() {
		return [
			'notification_id', 
			'type', 
			'content', 
			'is_read', 
			'created_at', 
			'sender_user_id'
		];
	}

	static viewFields() {
		return [
			'notification_id', 
			'type', 
			'content', 
			'is_read', 
			'created_at', 
			'sender_user_id'
		];
	}

	static editFields() {
		return [
			'sender_user_id', 
			'type', 
			'content', 
			'is_read', 
			'notification_id'
		];
	}

	static checknotificationsFields() {
		return [
			'notification_id', 
			'content', 
			'created_at', 
			'type'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("notification_id LIKE :search"), 
			Sequelize.literal("content LIKE :search"),
		];
	}

	
	
}
Notifications.init();
export default Notifications;
