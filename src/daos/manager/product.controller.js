import fileSystem from 'fs/promises'
import { __dirname } from '../../helpers/basePath.js'

class ProductController {
  constructor () {
    this.path = `${__dirname}/daos/manager/files/products.json`
  }

  async getProducts () {
    const fileContent = await fileSystem.readFile(this.path, 'utf-8')
    if (!fileContent) return []
    const products = JSON.parse(fileContent)
    return products.sort((productA, productB) => productB.uuid - productA.uuid)
  }

  async getProductById (id) {
    const products = await this.getProducts()
    return products.find(product => product.uuid == id) ?? null
  }

  async createProduct (product) {
    const products = await this.getProducts()
    const uuid = products.length + 1
    const newProduct = { uuid, ...product }

    products.push(newProduct)
    await fileSystem.writeFile(this.path, JSON.stringify(products, null, 2))
    return newProduct
  }

  async deleteProduct (uuid) {
    const products = await this.getProducts()
    const index = products.findIndex(product => product.uuid == uuid)
    products.splice(index, 1)
    await fileSystem.writeFile(this.path, JSON.stringify(products, null, 2))
  }
}

export default ProductController
