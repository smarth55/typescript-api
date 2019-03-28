import { Schema, model, Document } from 'mongoose';
import { Animals, AnimalsModel } from './Animals';

export interface UsersModel extends Document {
  email: String;
  firstName: String;
  lastName: String;
  isAdmin: Boolean;
  pets: AnimalsModel[] | Schema.Types.ObjectId[];
  addAnimals: (animals: any[]) => Promise<UsersModel>;
}

export let UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  isAdmin: {type: Boolean, default: false},
  pets: [{type: Schema.Types.ObjectId, ref: 'Animals'}]
});

UserSchema.method('addAnimals', async function(animals: any[]) {
  animals.forEach(animal => animal.owners = [this._id]);

  let created = await Animals.create(animals);
  let ids = created.map(animal => animal._id);

  this.pets = this.pets.concat(ids);
  return this.save();
})

export let Users = model<UsersModel>('User', UserSchema);