let criterios=["Sin ordenar","Ascendente por precio", "Descendente por precio"]
let cart;

function creaListaCriterios(){

	const selectCriterios = document.getElementById("criteriosOrdenacion")

	criterios.forEach((cri,index)=>{
		const option = document.createElement("option")
		option.value = index
		option.appendChild(document.createTextNode(cri))
		selectCriterios.appendChild(option)
	})
	
	selectCriterios.addEventListener("change", (e)=>{
		pintaArticulos(criterios[e.target.value])
	})
}


function pintaArticulos(orden){

	const listaArticulosCopy = [...listaArticulos]

	switch(orden){
		case "Sin ordenar":
			listaArticulosCopy
			break;
		case "Ascendente por precio":
			listaArticulosCopy.sort((a, b) => a.precio - b.precio)
			
			break;
		case "Descendente por precio":
			listaArticulosCopy.sort((a, b) => b.precio - a.precio)
			break;
	}

	const catalog = document.getElementById("contenedor")
	catalog.innerHTML = ""

	listaArticulosCopy.forEach(art=>{
		
		catalog.innerHTML += `
		<div class='col'>
			<div class='card mb-4'>
				<img src='assets/${art.codigo}.jpg' class='card-img-top'>
				<div class='card-body'>
					<h5 class='card-title'>${art.nombre}</h5>
					<p class='card-text'>${art.descripcion}</p>
					<b>
						<p class='card-text text-center'>${art.precio}</p>
					</b>
				</div>
				<button id='${art.codigo}' class='btn-success m-3 rounded'>Comprar</button>
			</div>
		</div> 
		`
	})


	const btns = document.querySelectorAll(".btn-success")
	btns.forEach(btn=>{
		btn.addEventListener("click",()=>{
			cart.anyadeArticulo(listaArticulos.find(art => art.codigo == btn.id)) //Lo mete en la clasew carrito
			ponArticuloEnCarrito() //Esto lo pinta y lo coje de la clase carrito
		})
	})
		
}
	
	
function ponArticuloEnCarrito(){

	const carritoBox = document.getElementById("dialogContent")
	carritoBox.innerHTML =""
	let cesta = ""

	cesta = "<table class='table table-striped'>"
	cesta += `
	<tr>
		<th class="oculto">id</th>
		<th>product</th>
		<th>nombre</th>
		<th>descripcion</th>
		<th>precio</th>
		<th>unidades</th>
		<th>total</th>
		<th></th>
	</tr>
	` 

	cart.articulos.forEach(cartArt=>{
	
		cesta += `
		<tr class="${cartArt.codigo}">
			<td class="oculto">${cartArt.codigo}</td>
			<td><img style="width:50px;" src="assets/${cartArt.codigo}.jpg"></td>
			<td>${cartArt.nombre}</td>
			<td>${cartArt.descripcion}</td>
			<td>${cartArt.precio}</td>
			<td>${cartArt.unidades}</td>
			<td>${cartArt.unidades*cartArt.precio}</td>
			<td>
				<button class="btn btn-primary btnAdd">+</button>
				<button class="btn btn-warning btnRemove">-</button>
				<button class="btn btn-danger btnDelete">Borrar</button>
			</td>
		</tr>
		` 
	})

	cesta += "</table>"
	carritoBox.innerHTML = cesta


	const basket = document.querySelector(".basket")
	basket.innerHTML= cart.items

	const total =document.getElementById("total")
	total.innerHTML = cart.total +"€"

	if(!cart.articulos.length > 0){
		carritoBox.innerHTML = "Cesta vacia"
		total.innerHTML = ""
	}


	/*Botones*/
	const btnsDelete = document.querySelectorAll(".btnDelete")
	const btnsAdd = document.querySelectorAll(".btnAdd")
	const btnsRemove = document.querySelectorAll(".btnRemove")

	
	btnsDelete.forEach(btn=>{

		btn.addEventListener("click",()=>{
			//cart.borraArticulo(btn.parentNode.parentNode.childNodes[1].textContent)
			cart.borraArticulo(btn.parentNode.parentNode.classList[0])
			ponArticuloEnCarrito()
		})
	})	


	btnsAdd.forEach(btn=>{
		btn.addEventListener("click",()=>{
			//cart.modificaUnidades(btn.parentNode.parentNode.childNodes[1].textContent, "+")
			cart.modificaUnidades(btn.parentNode.parentNode.classList[0], "+")
			ponArticuloEnCarrito()
		})
	})	


	btnsRemove.forEach(btn=>{
		btn.addEventListener("click",()=>{
			//cart.modificaUnidades(btn.parentNode.parentNode.childNodes[1].textContent, "-")
			cart.modificaUnidades(btn.parentNode.parentNode.classList[0], "-")
			ponArticuloEnCarrito()
		})
	})	

}


function verCarro(){
	const cartImg = document.querySelector(".cart")
	const dialog = document.getElementById("miDialogo")

	const idPedido = document.getElementById("idPedido")
	const btnSeguirComprando = document.getElementById("btnCierraDialog")
	const btnEfectuarPedido = document.getElementById("btnEfectuaPedido")


	cartImg.addEventListener("click", ()=>{
		dialog.showModal()	


		if(cart.articulos.length < 1){
			alert("El carrito esta vacio")
			dialog.close()	
		}
	})

	
	idPedido.innerHTML = cart.id

	btnSeguirComprando.addEventListener("click", ()=>{ dialog.close()})	
	btnEfectuarPedido.addEventListener("click", ()=>{ 
		document.write( JSON.stringify(
			{
				id: cart.id,
				fecha: new Date().toLocaleDateString(),
				nombre: cart.nombre,
				articulos: cart.articulos,
				total: cart.total
			}
			
		))
	
	})	
}


function buscarProductos(){
	
	const buscador = document.getElementById("search")
	buscador.addEventListener("keyup", e=>{
	
		if (e.target.matches("#search")){
			
			if (e.key ==="Escape")e.target.value = ""
	
			document.querySelectorAll(".card-title").forEach(product =>{
				
				product.textContent.toLowerCase().includes(e.target.value.toLowerCase())
				?product.parentNode.parentNode.parentNode.classList.remove("oculto")
				:product.parentNode.parentNode.parentNode.classList.add("oculto")
			})
	
		}
	
	})

}

function efectuaPedido(){

	


	
}

window.onload=()=>{

	cart = new Carrito(Date.now())
	buscarProductos()

	creaListaCriterios()
	pintaArticulos(0)
	verCarro()
	
	
}




