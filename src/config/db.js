import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const user = 'iperez'
    const password = 'mongo'
    const database = 'shopping'

    const db = await mongoose.connect(`mongodb+srv://${user}:${password}@iperezdev.kn2lf.mongodb.net/${database}?retryWrites=true&w=majority`)
    console.log(`MongoDB connected: ${db.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
