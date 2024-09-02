import { SweetOk, SweetError } from './utils/sweetAlert.js'

const btnAddCar = document.querySelectorAll(`button[data-action="add-to-cart"]`)

btnAddCar.forEach(btn => btn.addEventListener('click', handleClickAddToCart))

async function handleClickAddToCart() {
    const { product } = this.dataset

    try {
        addProductToCar(await getCarId(), product)
        SweetOk('Producto agregado al carrito')
    } catch (error) {
        console.log(error)
        SweetError('Error', 'Lo sentimos, no se pudo agregar el producto')
    }
}
async function getCarId() {
    let carId = localStorage.getItem('carId')

    if (!carId) {
        carId = await createCar()
        localStorage.setItem('carId', carId)
    }
    return carId
}
async function addProductToCar(carId, productId) {
    const url = `/api/cars/${carId}/product/${productId}`;
    const response = await fetch(url, { method: 'POST' });

    if (!response.ok) {

        if(response.status == 400){
            const { title, details } = await response.json();
            throw new Error(`${title}: ${details[0].msg}`);
        }

        throw new Error('No se pudo agregar el producto');
    }

}
async function createCar() {
    const url = '/api/cars';
    const response = await fetch(url, { method: 'POST' });

    if (!response.ok) {
        throw new Error('No se pudo crear el carrito');
    }

    const { carId } = await response.json();
    return carId;
}
async function getProductsByCarId(carId){

}