import { model, Schema, Types } from 'mongoose'

const CarSchema = new Schema({
    products: [{
        product: { type: Types.ObjectId, ref: 'products' },
        quantity: { type: Number, required: true },
        _id: false
    }]
})

export const Car = model('cars', CarSchema)