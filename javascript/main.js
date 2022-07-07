const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
const menuCombos = document.querySelector('.combos')
let carritoSecundario = []

/* Funciones para el carrito */
function addItemCarrito(newItem)
{

  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i <  carritoSecundario.length ; i++){
    if( carritoSecundario[i].title.trim() === newItem.title.trim()){
      carritoSecundario[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }

  carritoSecundario.push(newItem)
  
  renderCarrito()
} 


function renderCarrito()
{
  console.log(carritoSecundario)
  tbody.innerHTML = ''
  carritoSecundario.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
  Toastify({
    text: `Tenes ${ carritoSecundario.length} productos en tu carrito `,
    duration: 3000,
    offset:{  
      x:50,
      y:20
    },
   
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    
  }).showToast();
}

function CarritoTotal()
{
  debugger;
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carritoSecundario.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })
 
  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function removeItemCarrito(e)
{
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i< carritoSecundario.length ; i++){

    if( carritoSecundario[i].title.trim() === title.trim())
    {
      carritoSecundario.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e)
{
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      
      CarritoTotal()
      
    }
  })
}

function addLocalStorage()
{
  localStorage.setItem('carritoSecundario', JSON.stringify( carritoSecundario))
}

window.onload = function()
{
  const storage = JSON.parse(localStorage.getItem('carritoSecundario'));
  if(storage){
    carritoSecundario = storage;
    renderCarrito()
  }
}

const getProducts = async () => 
{
  try
  {
    const response = await fetch(
    "https://my-json-server.typicode.com/Manuel-Rodriguez-Pomares/CoderHouse-ProyectoJavaScript-ManuelRodriguezPomares/lista"
    );

    const data = await response.json()
    let carrito = data;
    renderMenu(carrito);
    
  }
  catch (error)
  {
    console.log("getProducts error: " + error);
  }
} 
getProducts()



/* Renderizar los productos en el inicio */

function renderMenu(combos) 
{
  combos.map((combo) => {
    let comboItem = document.createElement("div");
    let cardItem = document.createElement("div");
    let title = document.createElement("h5");
    let img = document.createElement("img");
    let cardBody = document.createElement("div");
    let description = document.createElement("p");
    let price = document.createElement("h5");
    let containerButton = document.createElement("div");
    let btn = document.createElement("button");

    comboItem.classList = "col d-flex justify-content-center mb-4";

    cardItem.classList = "card shadow mb-1 bg-dark rounded";
    cardItem.style = "width: 20rem;";

    title.classList = "card-title pt-2 text-center text-primary";
    title.textContent = combo.title;

    img.classList = "card-img-top";
    img.src = combo.img;
    img.alt = combo.title;

    cardBody.className = "card-body";

    description.classList = "card-text text-white-50 description";
    description.textContent = combo.description;

    price.classList = "text-primary";
    price.innerHTML = `Precio: <span class="precio">${combo.precio}</span>`;

    containerButton.classList = "d-grid gap-2";

    btn.classList = "btn btn-primary button";
    btn.textContent = "Añadir a Carrito";
    btn.addEventListener("click", (e) => {
      boton = e.target
      item = boton.closest('.card')
      const itemTitle = item.querySelector('.card-title').textContent;
      const itemPrice = item.querySelector('.precio').textContent;
      const itemImg = item.querySelector('.card-img-top').src; 
      const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
      }
    
      addItemCarrito(newItem)
      
      
    });

    containerButton.append(btn);
    cardBody.append(description);
    cardBody.append(price);
    cardBody.append(containerButton);
    cardItem.append(title);
    cardItem.append(img);
    cardItem.append(cardBody);
    comboItem.append(cardItem);

    menuCombos.appendChild(comboItem);
  });
}

