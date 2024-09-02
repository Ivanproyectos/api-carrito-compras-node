import express from 'express'
import helmet from 'helmet'
import { Server } from 'socket.io'
import { createServer } from 'http'
import routeCar from './routes/car.route.js'
import routeProduct from './routes/product.route.js'
import routeView from './routes/views.route.js'
import { engine } from 'express-handlebars'
import { __dirname } from './helpers/basePath.js'
import { connectDB } from './config/db.js'

const PORT = 8080
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
connectDB();

app.use(express.static(`${__dirname}/public`))
app.engine('handlebars', engine({ defaultLayout: 'main',
 helpers: {
  section: function(name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  }
} 
}))
app.set('view engine', 'handlebars')
app.set('views', `${__dirname}/views`)

io.on('connection', (socket) => {
  console.log('nuevo cliente conectado')
})

app.get('/', (req, res) => {
  res.redirect('/products')
})

app.use('/', routeView)
app.use('/api/', routeCar)
app.use('/api/', routeProduct(io))

app.use((req, res, next) => {
  res.status(404).send({ title: 'Endpoint no encontrado' })
})
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ title: 'ocurrio un error inesperado' })
})

httpServer.listen(PORT, () => {
  console.log(
    `Servidor express escuchando en el puerto http://localhost:${PORT}`
  )
})
