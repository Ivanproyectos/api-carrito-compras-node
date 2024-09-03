import { Router } from 'express'
import { upload } from '../helpers/upload.js'
import { StatusCodes } from 'http-status-codes'
import { createProductValidator } from '../validators/product.validator.js'
import ProductDao from '../daos/database/productDao.js'

const router = Router()

export default (io) => {
  
  router.get('/products', async (req, res, next) => {
    try {
      const productDao = new ProductDao()

      const products = await productDao.getProducts()

      res.send(products)
    } catch (err) {
      next(err)
    }
  })

  router.get('/products/paginated', async (req, res, next) => {
    try {

      const { page = 1, limit = 8, search = '' } = req.query
      const productDao = new ProductDao()

      const result = await productDao.getProductsPaginated(page, limit, search)

      res.send({
        products: result.docs,
        pagination: {
          totalPages: result.totalPages,
          page: Number(result.page),
          hasPrevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
          prevPage: result.prevPage,
          nextPage: result.nextPage
        }
      })

    } catch (err) {
      next(err)
    }
  })


  router.get('/products/:id', async (req, res, next) => {
    try {

      const id = req.params.id
      const productDao = new ProductDao()

      const product = await productDao.getProductById(id)
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
      const productDao = new ProductDao()
      
      const product = await productDao.getProductById(id)

      if (!product) {
        res.status(StatusCodes.NOT_FOUND).send({ error: 'El producto no existe' })
        return
      }

      await productDao.deleteProduct(id)
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

      const productDao = new ProductDao()
      const newProduct = await productDao.createProduct(product)
      io.emit('productCreated', newProduct)

      res.sendStatus(StatusCodes.CREATED)
    } catch (err) {
      next(err)
    }
  })

  return router
}
