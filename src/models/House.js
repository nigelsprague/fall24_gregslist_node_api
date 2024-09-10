import { Schema } from "mongoose";

export const HouseSchema = new Schema(
  {
    bedrooms: { type: Number, required: true, min: 0, max: 35 },
    bathrooms: { type: Number, required: true, min: 0, max: 25 },
    levels: { type: Number, required: true, min: 1, max: 25 },
    imgUrl: { type: String, required: true, maxlength: 500 },
    year: { type: Number, required: true, min: 1700, max: 2024 },
    price: { type: Number, required: true, min: 0, max: 10000000 },
    description: { type: String, maxlength: 5000 },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)

HouseSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})