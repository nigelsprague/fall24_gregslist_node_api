import mongoose, { mongo } from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { CarSchema } from '../models/Car.js';
import { HouseSchema } from '../models/House';
import { PetSchema } from '../models/Pets';
class DbContext {
  Account = mongoose.model('Account', AccountSchema)
  Cars = mongoose.model('Car', CarSchema)
  Houses = mongoose.model('House', HouseSchema)
  Pets = mongoose.model('Pets', PetSchema)
}

export const dbContext = new DbContext()
