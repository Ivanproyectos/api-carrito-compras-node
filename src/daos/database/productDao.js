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

    /**
     * Retrieves products from the database, paginated.
     *
     * @param {number} [page=1] The page of products to retrieve.
     * @param {number} [limit=5] The number of products to retrieve per page.
     * @param {string} [search=''] The search query to filter products by.
     *
     * @returns {Promise<object>} Resolves with an object containing the products, and pagination metadata.
     */
    async getProductsPaginated (page = 1, limit = 5, search = '') {
        const filter = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } }
            ]
        };

        const result = await Product.paginate(filter, {
            page,
            limit,
            lean: true
        });

        return result;
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