import { Product } from '../../models/product.model.js'

export default class ProductDao {

    async getProducts () {
        const products = await Product.find().lean()
        return products
    }

    async getProductsPaginated (page = 1, limit = 5, search = '', order = 'asc') {
        const filter = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } },
                //{ status: { $regex: search, $options: 'i' }}
            ]
        };
        const sortPrice = order == 'asc' ? 1 : -1;

        const result = await Product.paginate(filter, {
            page,
            limit,
            sort: { price: sortPrice },
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

    async getProductByCode(code){
        const product = await Product.findOne({code}).lean()
        return product
    }

}