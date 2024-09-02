const tableBody = document.querySelector('#table-products tbody')
export function renderProducts (products) {
  if (products.length === 0) {
    tableBody.innerHTML = '<tr><td class="text-center" colspan="5">Ningun producto para mostrar</td></tr>'
    return
  }

  tableBody.innerHTML = ''

  const renderedRows = products.map(renderRow)
  tableBody.append(...renderedRows)
}

export function renderProduct (product) {
  const row = tableBody.querySelector(`[data-row-id]`)
  if(!row){
    tableBody.innerHTML = ''
  }

  const renderedRow = renderRow(product)
  tableBody.prepend(renderedRow)
}
function renderRow (product) {
  const tr = document.createElement('tr')
  tr.dataset.rowId = product.uuid
  tr.innerHTML = `
        <td>
            <div class="table-product__info">
                <img src="/uploads/${product.image}" class="table-product__img" />
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
            <button class="btn text-danger" data-id="${product._id}" data-action="delete">
                <i class="bx bx-trash"></i>
            </button>
        </td>
    `
  return tr
}

export function deleteRow (id) {
  const row = tableBody.querySelector(`[data-row-id="${id}"]`)
  row?.remove()
}

function renderRowStatus (isActive) {
  const status = isActive ? 'Active' : 'Inactive'
  const statusClass = isActive ? 'success' : 'danger'

  return `<span class="badge badge-${statusClass}">${status}</span>`
}
