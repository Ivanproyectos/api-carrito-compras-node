import express from 'express'
import helmet from 'helmet'
import routeCar from './routes/car.route.js'
import routeProduct from './routes/product.route.js'
import routeView from './routes/views.route.js'
import { engine } from 'express-handlebars'
import { __diname } from './helpers/basePath.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(helmet())
app.use(express.static(`${__diname}/public`))
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('views', `${__diname}/views`)

app.get('/', (req, res) => {
  res.redirect('/products')
})

app.use('/', routeView)
app.use('/api/', routeCar)
app.use('/api/', routeProduct)

app.use((req, res, next) => {
  res.status(404).send({ error: 'Endpoint no encontrado' })
})
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ error: 'ocurrio un error inesperado' })
})
app.listen(PORT, () => {
  console.log(
    `Servidor express escuchando en el puerto http://localhost:${PORT}`
  )
})
