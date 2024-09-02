import { Product } from '../../models/product.model.js'

export default class ProductDao {
    /**
     * Retrieves all products from the database.
     * @returns {Promise<Array<Product>>} Resolves with an array of all products.
     */
    async getProducts () {
        const products = await Product.find().lean()
        return products
    }

    async getProductsPaginated (page = 1, limit = 5) {
        const products = await Product.paginate({}, { page, limit, lean: true })
        return products
    }
    async createProduct (product) {
        const newProduct = new Product(product)
        await newProduct.save()
        return newProduct
    }

    async getProductById (id) {
        const product = await Product.findById(id).lean()
        return product
    }

    async deleteProduct (id) {
        await Product.findByIdAndDelete(id)
    }

    /**
     * Retrieves a product from the database by its code.
     * @param {string} code The code of the product to search for.
     * @returns {Promise<Product>} Resolves with the product if it exists, otherwise null.
     */
    async getProductByCode(code){
        const product = await Product.findOne({code}).lean()
        return product
    }

}