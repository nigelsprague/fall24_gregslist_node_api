import { Schema } from "mongoose";

export const PetSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 1, maxlength: 100 },
    imgUrl: { type: String, required: true, maxlength: 1000 },
    age: { type: Number, required: true, min: 0, max: 5000 },
    likes: [{ type: String, maxlength: 50 }],
    isVaccinated: { type: Boolean, required: true, default: true },
    status: { type: String, enum: ['adopted', 'adoptable'], required: true },
    species: { type: String, enum: ['cat', 'dog', 'bird', 'capybara'], required: true },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

PetSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})