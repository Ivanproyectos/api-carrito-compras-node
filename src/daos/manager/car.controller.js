import fileSystem from 'fs/promises'
import ProductController from './product.controller.js'
import { __dirname } from '../../helpers/basePath.js'

class CarController {
  constructor () {
    this.path = `${__dirname}/database/cars.json`
  }

  async getCars () {
    const products = await fileSystem.readFile(this.path, 'utf-8')
    if (!products) return []
    return JSON.parse(products)
  }

  async getCarById (id) {
    const cars = await this.getCars()
    return cars.find((car) => car.uuid == id) ?? null
  }

  async getProductsByCarId (carId) {
    const car = await this.getCarById(carId)
    const carProducts = car.products
    const allProducts = await new ProductController().getProducts()

    return carProducts
      .map(({ productId, quantity }) => {
        const product = allProducts.find((prod) => prod.uuid === productId)
        const { category, stock, status, ...rest } = product
        return { ...rest, quantity }
      })
      .filter(Boolean)
  }

  async getAddProduct (carId, productId) {
    const cars = await this.getCars()
    cars.forEach((car) => {
      if (car.uuid == carId) {
        this.#addProductInCar(car, productId)
      }
    })
    await fileSystem.writeFile(this.path, JSON.stringify(cars, null, 2))
  }

  #addProductInCar (car, productId) {
    const product = car.products.find(
      (product) => product.productId == productId
    )
    if (product) {
      product.quantity = product.quantity + 1
    } else {
      car.products.push({ productId: Number(productId), quantity: 1 })
    }
  }

  async createCard () {
    const cars = await this.getCars()
    const uuid = cars.length + 1
    cars.push({ uuid, products: [] })
    await fileSystem.writeFile(this.path, JSON.stringify(cars, null, 2))
    return uuid
  }
}

export default CarController
