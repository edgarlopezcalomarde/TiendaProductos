class Carrito{
	constructor(id){
		this.id = id
		this.nombre = "John Doe"
		this.articulos = []					
	}
						
	anyadeArticulo(articulo){

		if(this.articulos.includes(articulo)){
			this.articulos.find(art=> art.codigo == articulo.codigo).unidades +=1
		}else{
			articulo.unidades = 1
			this.articulos.push(articulo)	
		}
	
	}			
				
	borraArticulo(codigo){
		this.articulos.splice(this.articulos.findIndex(art => art.codigo == codigo),1)
	}
	
	modificaUnidades(codigo,n){	
		const articulo = this.articulos.find(art=>art.codigo == codigo)

		if(n==="+"){
			articulo.unidades += 1
		}

		if(n==="-"){
			if(articulo.unidades > 1){
				articulo.unidades -= 1
			}else{
				this.borraArticulo(articulo.codigo)
			}
		}
	}	
			
	get total(){
		return this.articulos.reduce((a,b)=> a + (b.precio*b.unidades), 0)
	}

	get items(){
		return this.articulos.reduce((a,b)=> a + b.unidades,0)
	}
}
