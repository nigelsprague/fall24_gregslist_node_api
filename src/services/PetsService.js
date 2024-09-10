import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class PetsService {
  async getPetById(petId) {
    const pet = await dbContext.Pets.findById(petId).populate('creator')

    if (pet == null) {
      throw new BadRequest(`No pet found with the id of ${petId}`)
    }

    return pet
  }
  async getPets(query) {
    const sortBy = query.sort
    delete query.sort

    const pageNum = parseInt(query.page) || 1
    const limAmt = 10
    const skipAmt = (pageNum - 1) * limAmt
    delete query.page

    const pets = await dbContext.Pets.find(query)
      .sort(sortBy + ' createdAt')
      .skip(skipAmt)
      .limit(limAmt)
      .populate('creator')

    const petCount = await dbContext.Pets.countDocuments(query)

    return {
      results: pets,
      count: petCount,
      currentPage: pageNum,
      totalPages: Math.ceil(petCount / limAmt)
    }
  }

}

export const petsService = new PetsService()