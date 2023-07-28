import express from 'express';
import { router } from './routes/loginRoutes';
import { router as controllerRouter } from './controllers/decorators/controller';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['laskdjf'] }));
app.use(router);
app.use(controllerRouter);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
// ts-express-decorators is reimplemented
