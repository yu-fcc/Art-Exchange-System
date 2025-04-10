export default {
	app: {
		name: "Art Sharing Platform",
		url: "http://localhost:8060",
		frontendUrl: "http://localhost:8050",
		secret: "b973c708a6699249beb7db65ab47c3aa",
		language: "english",
		publicDir: "assets",
	},
	auth: {
		userTokenSecret: "6b0e85eA-1ax%W@3568cYY6Q!!0-4a6cb1887d6d4adebff8",
		apiTokenSecret: "6839f2a8$Xax%W!269519B#Q-!07989482e50664ad0a0aa8",
		jwtDuration: 20, //in minutes
		otpDuration: 5, //in minutes
	},
	database: {
		name:"yjw_dsmp",
		type: "mysql",
		host: "localhost",
		username: "root",
		password: "123456",
		port: "",
		charset: "utf8",
		recordlimit: 10,
		ordertype: "DESC"
	},
	mail: {
		username:"1833739283@qq.com",
		password: "ntwzteazmxqteccd",
		senderemail:"1833739283@qq.com",
		sendername:"1833739283@qq.com",
		host: "smtp.qq.com",
		secure: true,
		port: "465"
	},
	upload: {
		tempDir: "uploads/temp/",
		importdata: {
			filenameType: "timestamp",
			extensions: "csv",
			limit: "10",
			maxFileSize: "3",
			returnFullpath: "false",
			filenamePrefix: "",
			uploadDir: "uploads/files/"
		},
		
		art_image: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		media_hash: {
			filenameType: "random",
			extensions: "mp3,mp4,webm,wav,avi,mpg,mpeg",
			limit: "1",
			maxFileSize: "20",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		ipfs_hash: {
			filenameType: "random",
			extensions: "mp3,mp4,webm,wav,avi,mpg,mpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		file_hash: {
			filenameType: "random",
			extensions: "docx,doc,xls,xlsx,xml,csv,pdf,xps",
			limit: "1",
			maxFileSize: "5",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		userphoto: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "us-west-2",
		bucket: "",
	},
	
	locales: {
		'english': 'English',
	}

}