import { Router } from 'express'
import { upload } from '../helpers/upload.js'
import { StatusCodes } from 'http-status-codes'
import { createProductValidator } from '../validators/product.validator.js'
import ProductController from '../controllers/product.controller.js'

const router = Router()

export default (io) => {
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

  router.delete('/products/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const productController = new ProductController()
      const product = await productController.getProductById(id)
      if (!product) {
        res.status(StatusCodes.NOT_FOUND).send({ error: 'El producto no existe' })
        return
      }
      await productController.deleteProduct(id)
      res.sendStatus(StatusCodes.OK)
      io.emit('productDeleted', id)
    } catch (err) {
      next(err)
    }
  })

  router.post('/products', upload.single('file'), createProductValidator, async (req, res, next) => {
    try {
      const { title, description, code, price, stock, status = true, category } = req.body
      const filename = req?.file?.filename || ''

      const product = {
        title,
        description,
        code,
        price,
        stock,
        status,
        category,
        image: filename
      }

      const productController = new ProductController()
      const newProduct = await productController.createProduct(product)
      io.emit('productCreated', newProduct)

      res.sendStatus(StatusCodes.CREATED)
    } catch (err) {
      next(err)
    }
  })

  return router
}
