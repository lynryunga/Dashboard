const body = document.querySelector('body');
const tbodyProducts = document.querySelector('#tbodyProducts');
const btnAddUpdate = document.querySelector('#btnAddUpdate');

body.onload = () => {

  const products = getProducts();
  fillTable(products);
}

function fillTable(products) {
  let trs = [];

  products.forEach( (p, i) => {

    const tr = createRow(p);
    //Agregar fila de producto 
    trs.push(tr)
  })
  //trs al body
  tbodyProducts.append(...trs);
}

function createRow(p) {

  const trProduct = document.createElement('TR');
    //Icono de borrar
    const iDelete = document.createElement('I');
    const tdDelete = document.createElement('TD');
    tdDelete.appendChild(iDelete)
    iDelete.className = 'fas fa-trash';
  
    //Icono de actualizar
    const iUpdate = document.createElement('I');
    iUpdate.className = 'fas fa-pen';
    const tdUpdate = document.createElement('TD');
    tdUpdate.appendChild(iUpdate);
  
    //Columna de nombre
    const tdProduct = document.createElement('TD');
    tdProduct.textContent = p.name;
  
    //Columa de existencias
    const tdStock = document.createElement('TD');
    tdStock.textContent = p.stock;
  
    const tdPrice = document.createElement('TD');
    tdPrice.textContent = p.price;
  
    const tdStatus = document.createElement('TD');
    tdStatus.textContent = p.status;
  
    //TD dentro de TR
    trProduct.append(tdDelete, tdUpdate, tdProduct, tdStock, tdPrice, tdStatus);
  
    //Guarda tr en un arreglo
    return trProduct
}

btnAddUpdate.addEventListener('click', handlerAddClick)

function handlerAddClick(e) {
  const valueProduct = document.querySelector('#inProduct').value;
  const valueStock = Number(document.querySelector('#inStock').value);
  const valuePrice = Number(document.querySelector('#inPrice').value);
  const valueStatus = Number(document.querySelector('#inStatus').value);
   
  const newProduct = addProduct(valueProduct, valueStock, valuePrice, valueStatus);

  const row = createRow(newProduct)
  tbodyProducts.appendChild(row);
  alert('PRODUCTO CREADO');

  e.preventDefault();
}