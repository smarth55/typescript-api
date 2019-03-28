import { Response, Request, NextFunction } from 'express';
import { Users } from '../models/Users';

export class Admin {
  static get isAdmin() {
    return async function adminCheck(req: Request, res: Response, next: NextFunction) {
      //this is pretty unrealistic and should use sessions or real auth
      let user = await Users.findById(req.headers.user).lean();
      if ( !user ) return res.status(401).send('Unauthorized');
      if ( !user.isAdmin ) return res.status(401).send('Unauthorized');
      next();
    }
  }
}