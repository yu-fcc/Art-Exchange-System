
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Messages extends BaseModel {
	static init() {
		return super.init(
			{
				
				message_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				sender_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				receiver_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				encrypted_content: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				blockchain_tx: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				created_at: { type:Sequelize.DATE   },
				ipfs_hash: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				status: { type:Sequelize.ENUM('true','false')   }
			}, 
			{ 
				sequelize,
				
				tableName: "messages",
				modelName: "messages",
			}
		);
	}
	
	static listFields() {
		return [
			'message_id', 
			'sender_id', 
			'receiver_id', 
			'encrypted_content', 
			'created_at', 
			'ipfs_hash', 
			'status'
		];
	}

	static viewFields() {
		return [
			'message_id', 
			'sender_id', 
			'receiver_id', 
			'encrypted_content', 
			'created_at', 
			'ipfs_hash', 
			'status'
		];
	}

	static editFields() {
		return [
			'sender_id', 
			'encrypted_content', 
			'ipfs_hash', 
			'status', 
			'message_id'
		];
	}

	static messageNotificationFields() {
		return [
			Sequelize.literal('messages.sender_id AS sender_id'), 
			Sequelize.literal('messages.encrypted_content AS encrypted_content'), 
			Sequelize.literal('messages.created_at AS created_at'), 
			Sequelize.literal('messages.ipfs_hash AS ipfs_hash'), 
			Sequelize.literal('messages.status AS status'), 
			Sequelize.literal('messages.message_id AS message_id'), 
			Sequelize.literal('messages.receiver_id AS receiver_id'), 
			Sequelize.literal("users.user_id AS users_user_id")
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("message_id LIKE :search"), 
			Sequelize.literal("encrypted_content LIKE :search"), 
			Sequelize.literal("ipfs_hash LIKE :search"), 
			Sequelize.literal("blockchain_tx LIKE :search"),
		];
	}

	
	
}
Messages.init();
export default Messages;
