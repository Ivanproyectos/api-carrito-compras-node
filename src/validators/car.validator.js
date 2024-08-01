import { param } from 'express-validator'
import CarController from '../controllers/car.controller.js'
import ProductController from '../controllers/product.controller.js'
import validatorHandler from '../helpers/validatorResult.js'

const customProductValidator = async (value) => {
  const productController = new ProductController()
  const product = await productController.getProductById(value)
  if (product === null) {
    throw new Error('El id del producto no existe')
  }
  return true
}
const customCarValidator = async (value) => {
  const carController = new CarController()
  const car = await carController.getCarById(value)
  if (car === null) {
    throw new Error('El id del producto no existe')
  }
  return true
}
export const addProductValidator = [
  param('cid').notEmpty().withMessage('El id del carro es obligatorio')
    .isNumeric().withMessage('El id del producto debe ser un numero').custom(customCarValidator),

  param('pid').notEmpty().withMessage('El id del carro es obligatorio')
    .isNumeric().withMessage('El id del producto debe ser un numero').custom(customProductValidator),

  (req, res, next) => {
    validatorHandler(req, res, next)
  }
]
export const getCarValidator = [
  param('id').notEmpty().withMessage('El id del carro es obligatorio')
    .isNumeric().withMessage('El id del carro debe ser un numero'),
  (req, res, next) => {
    validatorHandler(req, res, next)
  }
]
