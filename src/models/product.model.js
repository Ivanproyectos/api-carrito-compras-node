import { model, Schema } from 'mongoose'
import paginate  from 'mongoose-paginate-v2'

const ProducSchema = new Schema({
    title: String,
    code: {
        type: String,
        unique: true
    },
    description: String,
    image: String,
    price: Number, 
    stock: Number,
    category: String, 
    status: Boolean
})

ProducSchema.plugin(paginate)

export const Product = model('products', ProducSchema)