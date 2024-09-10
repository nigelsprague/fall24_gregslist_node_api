import { petsService } from "../services/PetsService";
import BaseController from "../utils/BaseController";

export class PetsController extends BaseController {
  constructor() {
    super('api/pets')
    this.router
      .get('', this.getPets)
  }

  async getPets(req, res, next) {
    try {
      const query = req.query
      const pets = await petsService.getPets(query)
      res.send(pets)
    } catch (error) {
      next(error)
    }
  }

  async getPetById(req, res, next) {
    try {
      const petId = req.params.petId
      const pet = await petsService.getPetById(petId)
      res.send(pet)
    } catch (error) {
      next.error
    }
  }
}