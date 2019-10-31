import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compress from 'compression';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { connect } from 'mongoose';
import 'express-async-errors';

import { AppRouter } from './routes';

const port: string = process.env.PORT || '3000';
const mongoUrl: string = process.env.MONGO || 'mongodb://localhost/tsc-playground';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureApplication();
    this.configureRoutes();
  }

  configureApplication() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compress());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
  }

  configureRoutes() {
    AppRouter.buildRoutes(this.app);
  }
  
  async run() {
    try {
      await connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});
      await this.app.listen(port);
      console.log(`Server listening on port ${port}`);
    } catch(err) {
      console.log(`Server could not be started, ${err}`);
    }
  }
}

const server = new Server();
server.run();