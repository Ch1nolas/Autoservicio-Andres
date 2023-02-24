console.log("Hola Mundo!");

let carrito = [];
const DOMcarrito = document.querySelector("#carrito");

fetch("./js/data/productos.json")
  .then(Response => Response.json())
  .then(data => {
    console.log(data);
  })


// busqueda de categorias
/* function categorias() {
  const resultado = prompt("Ingrese la categoria que quiere buscar");
  const categoria = BDD.filter((el) => el.categoria.includes(resultado));
  console.log(categoria);
  RenderProductos(categoria);
} */

//Listo
function RenderProductos() {
  const productos = document.querySelector("#productos");
  productos.classList.add("ofertas");

  const items = document.createElement("div");
  items.classList.add("row");

  for (item of BDD) {
    items.innerHTML += `
    <div class="card col-sm-3">
      <div class= "card-body">
        <img src=${item.img} alt=${item.nombre} class= "img-fluid">
        <h4 class="card-title">${item.nombre}</h4>
        <p class= "card-text">$ ${item.precio}</p>
        <button class= "btn btn-primary marcador" id=${item.id} > + Agregar al carrito</button>
      </div>
    </div>`;
  }
  productos.appendChild(items);
  AgregarCarrito();
}

//Listo
function AgregarCarrito() {
  const marcador = document.getElementsByClassName("marcador");
  for (const evento of marcador) {
    evento.addEventListener("click", () => {
      let producto = BDD.find((item) => item.id == evento.id);
      toastAgregar();
      carrito.push(producto);
      renderizarCarrito(producto);
      TotalCarrito();
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
      console.log(carrito);
    });
  }
}

//Listo
function renderizarCarrito(producto) {
  const item = document.querySelector("#carrito");
  const li = document.createElement("li");
  li.classList.add(
    "list-group-item",
    "text-right",
    "mx-5",
    "dropdown-item",
    "d-flex"
  );
  li.innerHTML += `${producto.nombre}: $ ${producto.precio}`;
  item.appendChild(li);
}
//listo
function TotalCarrito() {
  const totalP = document.getElementById("total");
  const total = carrito.reduce((acc, el) => acc + el.precio, 0);
  totalP.innerHTML = `
    <p class= "text-center">Total= ${total}</p>
  `;
}

//Listo
function GuardarCarrito() {
  const infols = JSON.parse(localStorage.getItem("carrito"));
  if (infols) {
    infols.forEach((item) => {
      renderizarCarrito(item);
      carrito.push(item);
      console.log(carrito);
    });
  }
}

function toastAgregar() {
  Toastify({
    text: "Se ha agregado un producto al carrito",
    duration: 2000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
function toastRecordatorio() {
  Toastify({
    text: "Hey, tienes articulos en tu carrito",
    duration: 2000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #EE82EE, #2727FF)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

RenderProductos();
GuardarCarrito();
toastRecordatorio();
