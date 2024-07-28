import express from "express"
import routeCar from "./routes/car.route.js"
import routeProduct from "./routes/product.route.js"

const PORT = 8080;
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("hola mundo")
});
app.use("/api/", routeCar)
app.use("/api/", routeProduct)
app.use((req, res, next) => {
  res.status(404).send({ error: "Endpoint no encontrado" })
})
app.use((err, req, res, next) => {
  console.log(err);
    res.status(500).send({ error: "ocurrio un error inesperado" })
})
app.listen(PORT, () => {
  console.log(
    `Servidor express escuchando en el puerto http://localhost:${PORT}`
  )
})
