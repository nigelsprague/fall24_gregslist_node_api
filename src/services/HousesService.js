import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class HousesService {
  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate('creator')

    if (house == null) {
      throw new BadRequest(`No house found with the id of ${houseId}`)
    }

    return house
  }
  async getHouses(query) {
    const sortBy = query.sort
    delete query.sort

    const pageNumber = parseInt(query.page) || 1
    const limitAmt = 10
    const skipAmt = (pageNumber - 1) * limitAmt
    delete query.page

    const houses = await dbContext.Houses.find(query)
      .sort(sortBy + ' createdAt')
      .skip(skipAmt)
      .limit(limitAmt)
      .populate('creator')

    const houseCount = await dbContext.Houses.countDocuments(query)

    return {
      results: houses,
      count: houseCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(houseCount / limitAmt)
    }
  }
}

export const housesService = new HousesService()