import { Schema, model, Document } from 'mongoose';
import { Users, UsersModel } from './Users';

export interface AnimalsModel extends Document {
  name: String;
  animalType: String;
  owners: UsersModel[] | Schema.Types.ObjectId[]
  addOwner: (ownerId: string) => Promise<AnimalsModel>;
}

export let AnimalSchema = new Schema({
  name: String,
  animalType: String,
  owners: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

AnimalSchema.method('addOwner', async function(ownerId: string) {
  let user = await Users.findById(ownerId);
  if ( !user ) throw new Error('UserNotFound');

  let pets = user.get('pets');
  pets.push(this._id);
  await user.update({pets});

  this.owners.push(user._id);
  return this.save();
});

export let Animals = model<AnimalsModel>('Animal', AnimalSchema);