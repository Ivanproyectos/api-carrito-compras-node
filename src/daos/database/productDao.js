import { Product } from '../../models/product.model.js'

export default class ProductDao {
  async getProducts () {
    const products = await Product.find().lean()
    return products
  }

  async getProductsPaginated (page = 1, limit = 5, query = {}, title = '', order = 'asc') {
    const searchQuery = { $or: [{ title: { $regex: title, $options: 'i' } }] }
    const filter = { ...searchQuery, ...query }
    const sortPrice = order == 'asc' ? 1 : -1

    const result = await Product.paginate(filter, {
      page,
      limit,
      sort: { price: sortPrice },
      lean: true
    })

    return result
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

  async getProductByCode (code) {
    const product = await Product.findOne({ code }).lean()
    return product
  }
}
