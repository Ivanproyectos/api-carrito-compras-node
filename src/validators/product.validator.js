import { check } from "express-validator"
import ProductController from "../controllers/product.controller.js"
import validatorHandler from "../helpers/validatorResult.js"

const hasUniqueProductCode = async (value) => {
    const productController = new ProductController()
    const products = await productController.getProducts()
    const existsCode = products.some(product => product.code === value)
    if(existsCode){
        throw new Error("El codigo de producto ya existe")
    }
    return true
}

export const createProductValidator = [
    check("title","El titulo es obligatorio").notEmpty(),
    check("decription", "La descripción es obligatoria").notEmpty(),
    check("code", "El código es obligatorio").notEmpty()
        .custom(hasUniqueProductCode),
    check("price", "El precio es obligatorio").notEmpty()
        .isDecimal().withMessage("El precio debe ser un decimal"),
    check("stock", "El stock es obligatorio").notEmpty()
        .isNumeric().withMessage("El id del carro es obligatorio"),
    check("category", "La categoria es obligatoria").notEmpty(),

   (req, res, next) => {
    validatorHandler(req, res, next)
   }
]
