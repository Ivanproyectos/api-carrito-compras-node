import { check, query } from 'express-validator'
import ProductDao from '../daos/database/productDao.js'
import validatorHandler from '../helpers/validatorResult.js'

const hasUniqueProductCode = async (value) => {
  const productDao = new ProductDao()
  const products = await productDao.getProductByCode(value)
  if (products) {
    throw new Error('El codigo de producto ya existe')
  }
  return true
}

const validFormatJson = async (value) => {
  try {
    if (value) {
      JSON.parse(value)
    }
    return true
  } catch (error) {
    throw new Error('El formato del JSON es incorrecto')
  }
}

export const createGetProductValidator = [
  query('query').custom(validFormatJson),

  (req, res, next) => {
    validatorHandler(req, res, next)
  }
]

export const createProductValidator = [
  check('title', 'El titulo es obligatorio').notEmpty(),
  check('description', 'La descripción es obligatoria').notEmpty(),
  check('code', 'El código es obligatorio').notEmpty()
    .custom(hasUniqueProductCode),
  check('price', 'El precio es obligatorio').notEmpty()
    .isDecimal().withMessage('El precio debe ser un numero'),
  check('stock', 'El stock es obligatorio').notEmpty()
    .isNumeric().withMessage('El stock debe ser un numero'),
  check('category', 'La categoria es obligatoria').notEmpty(),

  (req, res, next) => {
    validatorHandler(req, res, next)
  }
]
