import { param } from 'express-validator'
import CarDao from '../daos/database/carDao.js'
import ProductDao from '../daos/database/productDao.js'
import validatorHandler from '../helpers/validatorResult.js'

const customProductValidator = async (value) => {
  const productDao = new ProductDao()
  const product = await productDao.getProductById(value)
  if (product === null) {
    throw new Error('El id del producto no existe')
  }
  return true
}
const customCarValidator = async (value) => {
  const carDao = new CarDao()
  const car = await carDao.getCarById(value)
  if (car === null) {
    throw new Error('El id del producto no existe')
  }
  return true
}
export const addProductValidator = [
  param('cid').notEmpty().withMessage('El id del carro es obligatorio')
    .custom(customCarValidator),

  param('pid').notEmpty().withMessage('El id del carro es obligatorio')
    .custom(customProductValidator),

  (req, res, next) => {
    validatorHandler(req, res, next)
  }
]
export const getCarValidator = [
  param('id').notEmpty().withMessage('El id del carro es obligatorio'),
  (req, res, next) => {
    validatorHandler(req, res, next)
  }
]
