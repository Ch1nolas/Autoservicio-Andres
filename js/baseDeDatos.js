// Variables
const baseDeDatos = [
    {
        "id": 1,
        "nombre": "Molida Intermedia",
        "precio": "$ 699",
        "categoria": "Carnes",
        "imagen": "https://jumboargentina.vtexassets.com/arquivos/ids/672125-800-auto?v=637703409949200000&width=800&height=auto&aspect=true"
    },
    {
        "id":2,
        "nombre": "Vino Tetra Arizu",
        "precio": "$ 199",
        "categoria": "Carnes",
        "imagen": "https://jumboargentina.vtexassets.com/arquivos/ids/568693-800-auto?v=637149145148370000&width=800&height=auto&aspect=true"
    },
    {
        "id":3,
        "nombre": "Pure de tomates",
        "precio": "$ 99",
        "categoria": "Mercado",
        "imagen": "https://jumboargentina.vtexassets.com/arquivos/ids/711891-800-auto?v=637943710476600000&width=800&height=auto&aspect=true"
    },
    {
        "id":4,
        "nombre": "Cerveza Stella Astois",
        "precio": "$ 400",
        "categoria": "Alcohol",
        "imagen": "https://jumboargentina.vtexassets.com/arquivos/ids/685563-800-auto?v=637786570144800000&width=800&height=auto&aspect=true"
    },
    {
        "id":5,
        "nombre": "Dr Lemon V/Sabores",
        "precio": "$ 299",
        "categoria": "Alcohol",
        "imagen": "https://jumboargentina.vtexassets.com/arquivos/ids/199651-800-auto?v=636383613451830000&width=800&height=auto&aspect=true"
    },
    {
        "id":6,
        "nombre": "Dr Lemon V/Sabores",
        "precio": "$ 299",
        "categoria": "Alcohol",
        "imagen": "https://jumboargentina.vtexassets.com/arquivos/ids/199651-800-auto?v=636383613451830000&width=800&height=auto&aspect=true"
    },
    {
        "id":7,
        "nombre": "Dr Lemon Mojito",
        "precio": "$ 299",
        "categoria": "Alcohol",
        "imagen": "https://jumboargentina.vtexassets.com/arquivos/ids/199651-800-auto?v=636383613451830000&width=800&height=auto&aspect=true"
    },
    
];

let carrito = [];
const divisa = '';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

//Card en el HTML
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-3');
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+ Agregar al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', añadirProductoAlCarrito);
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/* Evento para añadir un producto al carrito de la compra */
function añadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();

}

/* Dibuja todos los productos guardados en el carrito */
function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-5', 'dropdown-item', 'd-flex');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    DOMtotal.textContent = calcularTotal();
}

//Evento pora borrar item del carrito
function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
}



//Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();

