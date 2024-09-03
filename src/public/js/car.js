import { SweetOk, SweetError } from './utils/sweetAlert.js'

const addToCartButtons = document.querySelectorAll('button[data-action="add-to-cart"]')
const showCarButton = document.querySelector('button[data-action="show-car"]')
const hideCarButton = document.querySelector('button[data-action="hide-car"]')
const modalshowCar = document.querySelector('.car')
const carList = document.querySelector('.car__list')

addToCartButtons.forEach(btn => btn.addEventListener('click', handleClickAddToCart))
showCarButton.addEventListener('click', () => { modalshowCar.classList.toggle('car--show') })
hideCarButton.addEventListener('click', () => { modalshowCar.classList.toggle('car--show') })

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

    loadCarProducts(carId)

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
    const url = `/api/cars/${carId}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('error al obtener los productos del carrito', response.status);
    }

    return await response.json()
}
async function loadCarProducts(carId) {
  const productsCountElement = document.querySelector(
    '.header__cart-count'
  );

  try {
    const { products } = await getProductsByCarId(carId)
    const totalProducts = products.length

    if(totalProducts > 0){
        productsCountElement.textContent = products.length
        productsCountElement.style.display = 'block'
    }

    carList.innerHTML = ''
    carList.innerHTML = products.map(renderCarProduct).join('')
  } catch (error) {
    console.error(error)
  }
}
function renderCarProduct({product, quantity}) {

    const { title, price, image } = product;
    return `<div class="car__item">
    <div class="table-product__info">
      <img src="/uploads/${image}" class="table-product__img" />
      <div class="table-product__name">
        <p>${title}</p>
        <small class="table-product__code">$${price}</small>
      </div>
    </div>
    <span>cant: ${quantity}</span>
  </div>`
}
function init() {
    const carId = localStorage.getItem('carId') ?? ''
    loadCarProducts(carId)
}

init()