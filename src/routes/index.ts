import * as express from 'express';
import { Application, Router } from 'express';

import { UsersRoute } from './users';
import { AnimalsRoute } from './animals';

export class AppRouter {
  static registeredRoutes(): any[] {
    return [
      UsersRoute,
      AnimalsRoute
    ];
  }

  static buildRoutes(app: Application) {
    AppRouter.registeredRoutes()
      .forEach(route => {
        let router = new route();

        router.initRoutes();

        app.use(router.router);
      });
  }
}