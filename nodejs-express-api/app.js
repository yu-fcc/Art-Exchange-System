import express from 'express';
import compression from 'compression';
import cors from 'cors';
import ejs from 'ejs';
import config from './config.js';
import extendExpressMiddleware from './helpers/express_middleware.js';
import { passportJwtLogin, authMiddleware } from './helpers/auth_middleware.js';
import AuthController from './controllers/auth.js';
import AccountController from './controllers/account.js';
import HomeController from './controllers/home.js';
import ComponentsDataController from './controllers/components_data.js';
import FileUploaderController from './controllers/fileuploader.js';
import S3UploaderController from './controllers/s3uploader.js';
import AuditsController from  './controllers/audits.js';
import BookmarksController from  './controllers/bookmarks.js';
import ConTagNameController from  './controllers/contagname.js';
import ContentCategoriesController from  './controllers/contentcategories.js';
import ContentsController from  './controllers/contents.js';
import ContentsCommentController from  './controllers/contentscomment.js';
import ContentVersionsController from  './controllers/contentversions.js';
import FollowsController from  './controllers/follows.js';
import LikesController from  './controllers/likes.js';
import MessagesController from  './controllers/messages.js';
import NotificationReplyController from  './controllers/notificationreply.js';
import NotificationsController from  './controllers/notifications.js';
import OtherContentsController from  './controllers/othercontents.js';
import PermissionsController from  './controllers/permissions.js';
import ReportsController from  './controllers/reports.js';
import ReportsReplyController from  './controllers/reportsreply.js';
import ReputationHistoryController from  './controllers/reputationhistory.js';
import RolesController from  './controllers/roles.js';
import TagsController from  './controllers/tags.js';
import UsersController from  './controllers/users.js';


const app = express();

//set view engine use to return Html
app.set('views', 'views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
// compress all responses
app.use(compression({ threshold: 0 }));
//allow cors on localhost
app.use(cors()); // disable when deploy to production
app.use(express.static(config.app.publicDir))
app.use(express.json()) // Parses json, multi-part (file), url-encoded
app.use(express.urlencoded({ extended:true, limit:'50mb' }));
extendExpressMiddleware(app);
app.use(passportJwtLogin);
app.use('/api/', authMiddleware);

//bind page route to the controllers
app.use('/api/', HomeController);
app.use('/api/auth', AuthController);
app.use('/api/account', AccountController);
app.use('/api/audits', AuditsController);
app.use('/api/bookmarks', BookmarksController);
app.use('/api/contagname', ConTagNameController);
app.use('/api/contentcategories', ContentCategoriesController);
app.use('/api/contents', ContentsController);
app.use('/api/contentscomment', ContentsCommentController);
app.use('/api/contentversions', ContentVersionsController);
app.use('/api/follows', FollowsController);
app.use('/api/likes', LikesController);
app.use('/api/messages', MessagesController);
app.use('/api/notificationreply', NotificationReplyController);
app.use('/api/notifications', NotificationsController);
app.use('/api/othercontents', OtherContentsController);
app.use('/api/permissions', PermissionsController);
app.use('/api/reports', ReportsController);
app.use('/api/reportsreply', ReportsReplyController);
app.use('/api/reputationhistory', ReputationHistoryController);
app.use('/api/roles', RolesController);
app.use('/api/tags', TagsController);
app.use('/api/users', UsersController);
app.use('/api/components_data', ComponentsDataController);
app.use('/api/fileuploader', FileUploaderController);
app.use('/api/s3uploader', S3UploaderController);
app.get('*', function(req, res){
    res.status(404).json("Page not found");
});

let port = 8060;
//start app
app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});