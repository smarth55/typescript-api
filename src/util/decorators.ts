import * as express from 'express';
import { Router } from 'express';

export interface ApiRouteOptions {
  path: string;
  method: string;
  middleware?: Function[];
}

export function ApiRoute(options: ApiRouteOptions): any {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    let originalFunction = descriptor.value;

    descriptor.value = (router: Router, path: String) => {
      let method = options.method.toLocaleLowerCase();
      if ( options.middleware && options.middleware.length > 0 ) {
        return router[method](path + options.path, ...options.middleware, originalFunction.bind(target));
      } else {
        return router[method](path + options.path, originalFunction.bind(target));
      }
    };

    return descriptor;
  }; 
}

export interface BaseRouterOptions {
  path: string;
}

export function BaseRoute(options: BaseRouterOptions): any {
  return (target: any) => {
    return class extends target {
      router = express.Router();
      basePath = (options && options.path) ? options.path : '';

      initRoutes() {
        Reflect.ownKeys(target.prototype)
          .filter(func => func !== 'constructor')
          .forEach((func: string) => {
            this[func](this.router, this.basePath);
          });
      }
    }
  }
}