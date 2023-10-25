# integradorjs-Lara-Ruiz
{[MAIN.JS]}

/*Primero cargue los productos en un [Array] dentro de un {.JSON}*/

    {
        "id": "sillon-01",
        "titulo": "SALMON",
        "imagen": "./img/1expo.png",
        "href": "./producto1.html",
        "categoria": {
            "nombre": "Colores",
            "id": "colores"
        },
        "precio": 18000
    },

Coloque estos datos para luego identificarlos mas facilmente, llamarlos individualmente y tambien poder dividirlo por secciones.

--[CARGAR PRODUCTOS]--

La primer funcion que realice fue:

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
                <a class="producto-detalle" href="${producto.href}">Ver detalle</a>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

Para que la funcion realice lo que yo le pido,
fui llamando del DOM los elementos que iba a utilizar:

/*const contenedorProductos = document.querySelector("#contenedor-productos");*/


Lo que logré con esta funcion es "llamar" a todos los productos (que antes estaban en mi HTML) desde JS para no sobrecargar mi index.html

-Dentro de la funcion se encuentra el [.forEach] para que recorra todos los elementos de mi [Array]. 

-Luego hice un .createElement para tener un ("div") que seria el que contenga cada elemento que muestro en el index.html.

-Con los elementos /*${producto.}*/ lo que hago es buscarlos desde mi [Array] con los identificadores que les designe a cada uno
para no tener que hacerlo uno por uno.

--[FILTRAR PRODUCTOS]--

Para poder seccionar mis productos dependiento su id utilice la siguiente funcion:

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTargetc("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
}); 

Llamo a los botones desde el DOM:

/*const botonesCategorias = document.querySelectorAll(".boton-categoria");*/

-Primero agrego un /*.forEach*/ para que traiga a todos los botones que llamé.

-Luego agrego un /*.addEventListener*/ para que cuando haga "click" realice una accion.

-Agrego un evento para que los elementos con clase "active" cambien y solo se active el boton que presiono.
Eso lo logro primero removiendo la clase "active" y luego agregando /*.classList.add*/ para que solo active el que elijo.

-Para que funcione y solo muestre la categoria deseada, a la funcion (.cargarProductos) le agrego un parametro /*.productosElegidos*/

-Creo una [variable] para poder agregar un filtro en las categorias de los productos.

-Entonces si (if) es diferente a "todos" (que es el id asignado para todas las categorias) cargue los productos de la categoria deseada.
Tambien puse un [const] de /*productos.find*/ para que detecte el id de cada categoria y cambie ese titulo.

-Y si es diferente (else) muestre todos los productos.
Y acá puse un /*.innerText*/ para que cuando no tenga ninguna categoria asignada muestre el titulo de "Todos los productos".

-Los titulos los traje del DOM con:

/*const tituloPrincipal = document.querySelector("#titulo-principal");*/

--[AGREGAR AL CARRITO]--

-Creo una funcion llamando del DOM a los botones que "agregan":

/*let botonesAgregar = document.querySelectorAll(".producto-agregar");*/

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

-Llevo esa funcion a la que se llama (cargarProductos) para que cuando se la llame, se actualicen los [botones de agregar]

/*actualizarBotonesAgregar();*/

-Luego, dentro de la misma funcion agrego un .forEach para que cada boton tenga un [.addEventListener] que al hacer "click" 
genere la funcion /*agregarAlCarrito*/ que realizo más abajo.


function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #457041, #609A5B)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
          },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

-Lo primero que hace es buscar en los productos agregados, el que coincida con el id de cada uno /*productos.find*/

-Luego corrobora que ese producto exista en el [Array], eso lo logro con una [variable].

-Si (if) coincide con el id de alguno de los productos guardados, se le aumenta la cantidad al producto.

-Sino (else) se hace el /*.push*/ que es el que manda el producto al carrito.

-Por ultimo dentro de la funcion guardo los productos agregados al [LocalStorage] para luego recuperarlos desde la pagina de "Carrito".


--[ACTUALIZAR NUMERO DEL CARRITO]--

Llamo a ese numero desde el DOM:

/*const numerito = document.querySelector("#numerito");*/

Y luego creo la funcion [actualizarNumerito()] que va a ser llamada desde "agregarAlCarrito"


function actualizarNumerito() {

    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
    
}

-Primero se reduce con la propiedad /*.reduce*/ y luego se le agregan dos parametros.
Un acumulador (acc) y despues lo que se va a recorrer (producto).

-Se suma el acumulador con la cantidad de producto y que la cuenta arranque en 0 /*acc + producto.cantidad, 0*/.

-Por ultimo le pedimos que el numero que esta en el HTML se actualice a la propiedad que escribimos anteriormente.


{[CARRITO.JS]}

Lo primero que hago es llamar al [LocalStorage] para que traiga toda la informacion guardada.

/*let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);*/

Luego traigo del DOM los elementos que voy a necesitar:

/*const contenedorCarritoVacio = document.querySelector("#carrito-vacio");*/

/*const contenedorCarritoProductos = document.querySelector("#carrito-productos");*/

/*const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");*/

/*const contenedorCarritoComprado = document.querySelector("#carrito-comprado");*/

Y recien ahi creo la funcion

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="fa-solid fa-trash-can" style="color: #884325;"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

-En principio agrego una [variable] para que:

-Si (if) hay productos en el carrito, no se muestre el mensaje "carrito vacio" ni el de "carrito comprado", esto lo logro con la clase "disabled".

Y que se remueva la clase "disabled" a los productos del carrito y a las acciones.

-Creo un [.forEach] con un contenedor (div) para guardar los productos que se van a ver en el carrito con sus diferentes atributos.

/*const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML =*/

-Y ahi, al igual que antes con los elementos /*${producto.}*/ lo que hago es buscarlos desde mi [Array] con los identificadores que les designe a cada uno
para no tener que hacerlo uno por uno.

-Y sino (else) se invierten las clases [remove] y [add] del "disabled".


--[ACTUALIZAR BOTON DE ELIMINAR]--

Primero llamo del DOM: 

/*let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");*/

Y despues creo la funcion:

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

-En donde cada vez que haga "click" en el boton que asignamos, se eliminara del carrito

Con la funcion:

function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #457041, #609A5B)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
          },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

-Primero se busca en el [index] si el producto si esta en el carrito. 

/*productosEnCarrito.findIndex(producto => producto.id === idBoton)*/

-Luego hago un [splice] para que se elimine del index y un solo producto.

/*productosEnCarrito.splice(index, 1);*/

-Y para terminar los sacamos del [LocalStorage]


--[VACIAR CARRITO]--

Esta siguente funcion es para "setear" el carrito:

llamo del DOM:

/*const botonVaciar = document.querySelector("#carrito-acciones-vaciar");*/

Agrego un /*.addEventListener*/ para que cuando se haga click se ejecute.

function vaciarCarrito() {


    Swal.fire({

        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
}

-La primera parte es sacada de una "libreria" para que aparezca un cartel de confirmacion y si eso se confirma

/*if (result.isConfirmed)*/

Que los productos eliminados se reseteen y eso mismo se guarde en el [LocalStorage]


--[ACTUALIZAR TOTAL]--

Llamo del DOM al elemento que voy a utilizar:

/*const contenedorTotal = document.querySelector("#total");*/

Creo la funcion:

function actualizarTotal() {

    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

-Lo que hace el ".reduce" en este caso es recorrer los productos y multiplique los precios por las cantidades de los productos seleccionados
y que empiece en 0.


--[BOTON COMPRAR]--

Llamamos del DOM:

/*const botonComprar = document.querySelector("#carrito-acciones-comprar");*/

Agregamos un /*botonComprar.addEventListener("click", comprarCarrito);*/
para que al hacer click ejecute la funcion:

function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}


-Con [.length = 0] eliminamos todo del [Array]

-Luego seteamos el [LocalStorage]

-Y por ultimo habilitamos los mensajes y acciones que habiamos desabilitado antes con la clase "disabled".










