const body = document.querySelector('body');
const tbodyProducts = document.querySelector('#tbodyProducts');
const btnAddUpdate = document.querySelector('#btnAddUpdate');
const inProduct = document.querySelector('#inProduct');
const inStock = document.querySelector('#inStock');
const inPrice = document.querySelector('#inPrice');
const inStatus = document.querySelector('#inStatus');

body.onload = () => {

  const products = getProducts();
  fillTable(products);
}

function fillTable(products) {
  let trs = [];

  products.forEach( (p, i) => {

    const tr = createRow(p, i);
    //Agregar fila de producto 
    trs.push(tr)
  })
  //trs al body
  tbodyProducts.append(...trs);
}

function clearTable() {
  tbodyProducts.innerHTML = '';
}

function createRow(p, i) {

  const trProduct = document.createElement('TR');
    //Icono de borrar
    const iDelete = document.createElement('I');
    const tdDelete = document.createElement('TD');
    tdDelete.appendChild(iDelete)
    iDelete.className = 'fas fa-trash';
    iDelete.addEventListener('click', () => {
      const isConfirm = confirm('Seguro que quieres eliminar registro');
      if(isConfirm) {
        //Borrar
        deleteProduct(i);
        clearTable();
        fillTable(getProducts());
      }
    } )
  
    //Icono de actualizar
    const iUpdate = document.createElement('I');
    iUpdate.className = 'fas fa-pen';
    iUpdate.addEventListener('click', () => {
      inProduct.value = p.name;
      inStock.value = p.stock;
      inPrice.value = p.price;
      inStatus.value = p.status;

      btnAddUpdate.textContent = 'ACTUALIZAR';

      btnAddUpdate.onclick = (e) => handlerUpdateClick(e, i)
    })

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

btnAddUpdate.onclick = handlerAddClick;

function handlerAddClick(e) {
  e.preventDefault();

  const valueProduct = inProduct.value;
  const valueStock = Number(inStock.value);
  const valuePrice = Number(inPrice.value);
  const valueStatus = Number(inStatus.value);
  const i = getProducts().length;
   
  const newProduct = addProduct(valueProduct, valueStock, valuePrice, valueStatus);

  const row = createRow(newProduct, i)
  tbodyProducts.appendChild(row);
  alert('PRODUCTO CREADO');

}

function handlerUpdateClick(e, i) {
  e.preventDefault();

  const valueProduct = inProduct.value;
  const valueStock = Number(inStock.value);
  const valuePrice = Number(inPrice.value);
  const valueStatus = Number(inStatus.value);

  console.log(i)

  updateProduct(i, valueProduct, valueStock, valuePrice, valueStatus);
  clearTable();

  const products = getProducts();
  fillTable(products)
  inProduct.value = '';
  inStock.value = '';
  inPrice.value = '';
  inStatus.value = '';
  btnAddUpdate.textContent = "AGREGAR"
  alert('PRODUCTO ACTUALIZADO');

}