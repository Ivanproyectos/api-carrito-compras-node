import { Router } from 'express'
import CarDao from '../daos/database/carDao.js'
import { addProductValidator, getCarValidator } from '../validators/car.validator.js'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.post('/cars', async (req, res, next) => {
  try {
    const carDao = new CarDao()
    const { _id } = await carDao.createCar()

    res.send({ message: `Carrito creado con el id: ${_id}`, carId: _id })
      .status(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})
router.post('/cars/:cid/product/:pid', addProductValidator, async (req, res, next) => {
  try {
    const { cid, pid } = req.params
    const carDao = new CarDao()

    await carDao.addProductToCar(cid, pid)
    res.send({ message: 'Producto agregado' })
  } catch (err) {
    next(err)
  }
})
router.get('/cars/:id', getCarValidator, async (req, res, next) => {
  try {
    const { id } = req.params
    const carDao = new CarDao()

    const car = await carDao.getCarById(id)
    if (car === null) {
      res.status(StatusCodes.NOT_FOUND)
        .send({ error: 'El carro no existe' })
      return
    }

    res.send(car)
  } catch (err) {
    next(err)
  }
})

export default router
