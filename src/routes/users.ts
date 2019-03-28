import { Request, Response } from 'express';

import { BaseRoute, ApiRoute } from '../util';
import { Users } from '../models/Users';
import { Admin } from '../middleware/admin';

@BaseRoute({
  path: '/users'
})
export class UsersRoute {
  @ApiRoute({
    method: 'GET',
    path: '/'
  })
  async getUsers(req: Request, res: Response) {
    let users = await Users.find({});
    return res.json(users);
  }

  @ApiRoute({
    method: 'POST',
    path: '/'
  })
  async createNewUser(req: Request, res: Response) {
    let user = await Users.create(req.body);
    return res.json(user);
  }

  @ApiRoute({
    method: 'GET',
    path: '/:id'
  })
  async getUser(req: Request, res: Response) {
    let user = await Users.findById(req.params.id);
    if ( !user ) return res.sendStatus(404);
    return res.json(user);
  }

  @ApiRoute({
    method: 'PUT',
    path: '/:id'
  })
  async updateUser(req: Request, res: Response) {
    let user = await Users.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    if ( !user ) return res.sendStatus(404);
    return res.json(user);
  }

  @ApiRoute({
    method: 'DELETE',
    path: '/:id'
  })
  async deleteUser(req: Request, res: Response) {
    let user = await Users.findById(req.params.id);
    if ( !user ) return res.sendStatus(404);

    let result = await Users.deleteOne({_id: req.params.id});
    return res.json(result);
  }

  @ApiRoute({
    method: 'POST',
    path: '/:id/add-animals'
  })
  async addAnimals(req: Request, res: Response) {
    let user = await Users.findById(req.params.id);
    if ( !user ) return res.sendStatus(404);

    let updated = await user.addAnimals(req.body);
    return res.json(updated);
  }
}