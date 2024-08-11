import { Router } from 'express'
import ProductController from '../controllers/product.controller.js'

const router = Router()

router.get('/products', async (req, res, next) => {
  try {
    const productController = new ProductController()
    const products = await productController.getProducts()
    res.render('home', { products })
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
