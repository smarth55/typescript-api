import { Request, Response } from 'express';

import { BaseRoute, ApiRoute } from '../util';
import { Animals } from '../models/Animals';

@BaseRoute({
  path: '/animals'
})
export class AnimalsRoute {
  @ApiRoute({
    method: 'GET',
    path: '/'
  })
  async getAnimals(req: Request, res: Response) {
    let animals = await Animals.find({});
    return res.json(animals);
  }

  @ApiRoute({
    method: 'POST',
    path: '/'
  })
  async addNewAnimal(req: Request, res: Response) {
    let animal = await Animals.create(req.body);
    return res.json(animal);
  }

  @ApiRoute({
    method: 'GET',
    path: '/:id'
  })
  async getAnimal(req: Request, res: Response) {
    let animal = await Animals.findById(req.params.id).populate('owners', 'firstName lastName');
    if ( !animal ) return res.sendStatus(404);
    return res.json(animal);
  }

  @ApiRoute({
    method: 'PUT',
    path: '/:id'
  })
  async updateAnimal(req: Request, res: Response) {
    let animal = await Animals.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    if ( !animal ) return res.sendStatus(404);
    return res.json(animal);
  }

  @ApiRoute({
    method: 'DELETE',
    path: '/:id'
  })
  async deleteAnimal(req: Request, res: Response) {
    let animal = await Animals.findById(req.params.id);
    if ( !animal ) return res.sendStatus(404);

    let result = await Animals.deleteOne({_id: req.params.id});
    return res.json(result);
  }

  @ApiRoute({
    method: 'POST',
    path: '/:id/add-owner'
  })
  async addOwner(req: Request, res: Response) {
    let animal = await Animals.findById(req.params.id);
    if ( !animal ) return res.sendStatus(404);

    let updated = await animal.addOwner(req.body._id);
    return res.json(updated);
  }
}