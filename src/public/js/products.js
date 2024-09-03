import { validateForms, isFormValid } from './form-valid.js'
import { renderProducts, renderProduct, deleteRow, renderPagination } from './product-table.js'
import { SweetOk, SweetError, SweetWarning } from './utils/sweetAlert.js'
import '/socket.io/socket.io.js'

const buttonSave = document.querySelector('#button-save')
const tableProducts = document.querySelector('#table-products')
const productLimitSelect = document.querySelector('#limit');
const searchInput = document.querySelector('#search')

const socket = io()

validateForms()
initProducts()

searchInput.addEventListener('keyup', initProducts)
buttonSave.addEventListener('click', createProduct)
productLimitSelect.addEventListener('change', initProducts)
tableProducts.addEventListener('click', async (event) => {
  const buttonDelete = event.target.closest('button[data-action="delete"]')
  if (buttonDelete) {
    const { id } = buttonDelete.dataset
    deleteProduct(id)
  }
})
async function getProducts (page) {
 const search = searchInput.value
 const limit =  parseInt(productLimitSelect.value)

  const url = `/api/products/paginated?search=${search}&limit=${limit}&page=${page}`
  const respose = await fetch(url)
  const products = await respose.json()

  return products
}
async function createProduct () {
  const form = document.querySelector('#form-product')
  if (isFormValid(form)) {
    try {
      const formData = new FormData(form)
      const url = '/api/products'
      const requestOptions = {
        method: 'POST',
        body: formData
      }
      const response = await fetch(url, requestOptions)
      if (!response.ok) {
        const { title, details } = await response.json()
        const message = details?.[0]?.msg

        if (response.status === 400) {
          SweetWarning(title, message)
        } else {
          throw new Error(title)
        }

        return
      }

      form.reset()
    } catch (error) {
      console.error(error)
      SweetError('Ocurrió un error', 'No se pudo crear el producto')
    }
  }
}
async function deleteProduct (id) {
  const url = `/api/products/${id}`
  const requestOptions = {
    method: 'DELETE'
  }
  await fetch(url, requestOptions)
  SweetOk('Producto eliminado con exito')
}
async function initProducts (page = 1) {
  const { products, pagination} = await getProducts(page)
  renderProducts(products)
  renderPagination(pagination, initProducts)
}
socket.on('productCreated', (product) => {
  renderProduct(product)
})

socket.on('productDeleted', (idProduct) => {
  deleteRow(idProduct)
})
