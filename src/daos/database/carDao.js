import { Car } from '../../models/car.model.js'

export default class CarDao {
    async getCarById(id) {
        const car = await Car.findById(id)
            .populate('products.product')
        return car
    }
    async getCars() {
        const cars = await Car.find().populate('products.product')
        return cars
    }
    async createCar() {
        const car = new Car()
        await car.save()
        return car
    }
    async addProductToCar(carId, productId) {
        const car = await Car.findById(carId)

        const existingProduct = car.products.find(
            ({ product }) => product.toString() === productId.toString()
        )

        if (existingProduct) {
            existingProduct.quantity += 1
        } else {
            car.products.push({ product: productId, quantity: 1 })
        }

        await car.save()
    }
}
