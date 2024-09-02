import { Router } from 'express'
import ProductController from '../daos/manager/product.controller.js'
import ProductDao from '../daos/database/productDao.js'

const router = Router()

router.get('/products', async (req, res, next) => {
  try {
    const { page = 1, limit = 8 } = req.query

    const productDao = new ProductDao()
    const result = await productDao.getProductsPaginated(page, limit)
    res.render('home', {
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

router.get('/products-real-time', async (req, res, next) => {
  try {

    const productController = new ProductController()
    const products = await productController.getProducts()

    res.render('realTimeProducts', { products })
  } catch (err) {
    next(err)
  }
})

export default router
