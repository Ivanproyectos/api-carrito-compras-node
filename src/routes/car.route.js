import { Router } from 'express'
import CarController from '../controllers/car.controller.js'
import { addProductValidator, getCarValidator } from '../validators/car.validator.js'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.post('/cars', async (req, res, next) => {
  try {
    const carController = new CarController()
    const id = await carController.createCard()
    res.send({ message: `Carrito creado con el id: ${id}` }).status(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})
router.post('/cars/:cid/product/:pid', addProductValidator, async (req, res, next) => {
  try {
    const { cid, pid } = req.params
    const carController = new CarController()
    await carController.getAddProduct(cid, pid)
    res.send({ message: 'Producto agregado' })
  } catch (err) {
    next(err)
  }
})
router.get('/cars/:id', getCarValidator, async (req, res, next) => {
  try {
    const { id } = req.params
    const carController = new CarController()
    const car = await carController.getCarById(id)
    if (car === null) {
      res.status(StatusCodes.NOT_FOUND)
        .send({ error: 'El carro no existe' })
      return
    }
    const carProducts = await carController.getProductsByCarId(id)
    res.send(carProducts)
  } catch (err) {
    next(err)
  }
})

export default router
