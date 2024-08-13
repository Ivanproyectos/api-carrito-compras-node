const tableBody = document.querySelector('#table-products tbody')
export function renderProducts (products) {
  tableBody.innerHTML = ''

  const renderedRows = products.map(renderRow)
  tableBody.append(...renderedRows)
}

export function renderProduct (product) {
  const renderedRow = renderRow(product)
  tableBody.prepend(renderedRow)
}
function renderRow (product) {
  const tr = document.createElement('tr')

  tr.innerHTML = `
        <td>
            <div class="table-product__info">
                <img src="/assets/img/${product.image}" class="table-product__img" />
                <div class="table-product__name">
                <p>${product.title}</p>
                <small class="table-product__code">code: ${product.code}</small>
                </div>
            </div>
        </td>
        <td>${product.category}</td>
        <td>${product.price}</td>
        <td>${renderRowStatus(product.status)}</td>
        <td>
            <button class="btn text-danger" data-id="${product.uuid}" data-action="delete">
                <i class="bx bx-trash"></i>
            </button>
        </td>
    `
  return tr
}

function renderRowStatus (isActive) {
  const status = isActive ? 'Active' : 'Inactive'
  const statusClass = isActive ? 'success' : 'danger'

  return `<span class="badge badge-${statusClass}">${status}</span>`
}
