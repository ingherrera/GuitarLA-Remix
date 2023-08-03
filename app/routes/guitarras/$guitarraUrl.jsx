import { useState } from "react";
import {useLoaderData, useOutletContext} from "@remix-run/react"
import {getGuitarra} from "~/models/guitarras.server"
import styles from "~/styles/guitarras.css"

export async function  loader({params}) {
  const {guitarraUrl} = params
  const guitarra = await getGuitarra(guitarraUrl)

  // console.log("***$guitarraUrl*******loader()********Guitarra*************************")
  // console.log(guitarra);
  

  if(guitarra.data.length === 0) {
    throw new Response("Data de Response",{
      status: 404,
      statusText: 'Guitarra No Encontrada'
    })
  }

  return guitarra
}

export function meta({data}) {
  // console.log({data})
  
  if (!data){
    return {
      title:"GuitarLA - Guitarra No encontrada",
      description:"Guitarras, venta de guitarras, guitarra no encontrada"
    }
  }

  const nombre = data.data[0].attributes.nombre
  
  return {
    title:`GuitarLA - ${nombre}`,
    description:`Guitarras, venta de guitarras, guitarra ${nombre}`
  }
}


export function links(){
  return[
    {
      rel:"stylesheet",
      href:styles
    }
  ]
}



export default function Guitarra() {
  

  const [cantidad, setCantidad] = useState(0)
  
  const guitarra = useLoaderData()

  const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes

  // const data = useOutletContext()
  // console.log(`Context $guitarraUrl - ${nombre} =`,data)

  // const {ciudad} = useOutletContext()
  // console.log({ciudad})

  // const { sumar } = useOutletContext()
  // sumar()
  
  const { agregarCarrito } = useOutletContext()
  // console.log({agregarCarrito})



  const handleSubmit = e => {
    e.preventDefault()

    if (cantidad < 1) {
      alert("Debes seleccionar una cantidad")
      return
    }

    const guitarraSeleccionada = {
      id:guitarra.data[0].id,
      imagen:imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }

    // console.log("Guitarra Seleccionada =",guitarraSeleccionada)
    agregarCarrito(guitarraSeleccionada)
    // agregarCarrito()
  }


  return (
    <div className="guitarra">
      <img src={imagen.data.attributes.url} alt={`Imagen guitarra ${nombre}`} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p className="precio">${precio}</p>
        

        <form 
          onSubmit={handleSubmit}
          className="formulario"
        >
          <label htmlFor="cantidad">Cantidad</label>

          <select 
            // onChange={e => setCantidad(parseInt(e.target.value))}
            onChange={e => setCantidad(+e.target.value)}
            name="" 
            id="cantidad"
          >
            <option value="0">-- Seleccione ---</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          
          <input 
            type="submit"
            value="Agregar al Carrito"
          />
        </form>

      </div> 
    </div>
  )
}
