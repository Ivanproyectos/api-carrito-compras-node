import { Router } from 'express'
import ProductController from '../controllers/product.controller.js'
import { StatusCodes } from 'http-status-codes'
import { createProductValidator } from '../validators/product.validator.js'

const router = Router()

router.get('/products', async (req, res, next) => {
  try {
    const productController = new ProductController()
    const products = await productController.getProducts()
    res.send(products)
  } catch (err) {
    next(err)
  }
})
router.get('/products/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const productController = new ProductController()
    const product = await productController.getProductById(id)
    if (!product) {
      res.status(StatusCodes.NOT_FOUND).send({ error: 'El producto no existe' })
      return
    }
    res.send(product)
  } catch (err) {
    next(err)
  }
})

router.post('/products', createProductValidator, async (req, res, next) => {
  try {
    const { title, description, code, price, stock, status = true, category } = req.body
    const productController = new ProductController()
    await productController.createProduct({ title, description, code, price, stock, status, category })
    res.sendStatus(StatusCodes.CREATED)
  } catch (err) {
    next(err)
  }
})

export default router
