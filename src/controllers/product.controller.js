import fileSystem from "fs/promises"
import { __diname } from "../helpers/basePath.js"

class ProductController {
    constructor() {
        this.path =`${__diname}/database/products.json`
    }
    async getProducts() {   
            const products = await fileSystem.readFile(this.path, "utf-8")
            if(!products) return []
            return JSON.parse(products);
    }
    async getProductById(id) {
        const products = await this.getProducts()
        return products.find(product => product.uuid == id) ?? null
    }
    async createProduct(product) { 
        const products = await this.getProducts()
        const uuid = products.length + 1
        products.push({uuid, ...product})
        await fileSystem.writeFile(this.path, JSON.stringify(products, null, 2))
    }
}

export default ProductController