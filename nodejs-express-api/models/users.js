
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Users extends BaseModel {
	static init() {
		return super.init(
			{
				
				user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				username: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				email: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				public_key: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				avatar_hash: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				bio: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				reputation_score: { type:Sequelize.INTEGER   },
				created_at: { type:Sequelize.DATE   },
				updated_at: { type:Sequelize.DATE   },
				userpwd: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				usertele: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				userphoto: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				user_role_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				email_verified_at: { type:Sequelize.DATE   }
			}, 
			{ 
				sequelize,
				
				tableName: "users",
				modelName: "users",
			}
		);
	}
	
	static listFields() {
		return [
			'user_id', 
			'username', 
			'usertele', 
			'email', 
			'created_at', 
			'updated_at'
		];
	}

	static viewFields() {
		return [
			'user_id', 
			'username', 
			'usertele', 
			'email', 
			'created_at', 
			'updated_at', 
			'bio'
		];
	}

	static accounteditFields() {
		return [
			'username', 
			'bio', 
			'usertele', 
			'email', 
			'userphoto', 
			'user_id'
		];
	}

	static accountviewFields() {
		return [
			'user_id', 
			'username', 
			'email', 
			'bio', 
			'created_at', 
			'updated_at', 
			'usertele', 
			'user_role_id'
		];
	}

	static editFields() {
		return [
			'username', 
			'bio', 
			'usertele', 
			'userphoto', 
			'user_id', 
			'user_role_id'
		];
	}

	static artisticFields() {
		return [
			Sequelize.literal('users.user_id AS user_id'), 
			Sequelize.literal('users.username AS username'), 
			Sequelize.literal('users.email AS email'), 
			Sequelize.literal('users.usertele AS usertele'), 
			Sequelize.literal('users.userphoto AS userphoto'), 
			Sequelize.literal("roles.role_id AS roles_role_id")
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("user_id LIKE :search"), 
			Sequelize.literal("username LIKE :search"), 
			Sequelize.literal("usertele LIKE :search"), 
			Sequelize.literal("email LIKE :search"), 
			Sequelize.literal("public_key LIKE :search"), 
			Sequelize.literal("avatar_hash LIKE :search"), 
			Sequelize.literal("bio LIKE :search"),
		];
	}

	
	
}
Users.init();
export default Users;
