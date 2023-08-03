import { getPost } from "~/models/posts.server.js"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import {formatearFecha} from "~/utils/helpers.js"
import styles from "~/styles/blog.css";

export function links(){
  return[
    {
      rel:"stylesheet",
      href:styles
    }
  ]
}

export function meta({data}) {
  // console.log("------------META-----------")
  // console.log(data)
  // console.log("data.data[0]..", data.data[0])
  // console.log("data.data[0].attr.", data.data[0])
  
  if (!data){
    return {
      title:"GuitarLA - Entrada No encontrada",
      description:"Guitarras, venta de guitarras, Entrada no encontrada"
    }
  }

  const titulo = data?.data[0]?.attributes.titulo
  
  return {
    title:`GuitarLA - ${titulo}`,
    description:`Guitarras, venta de guitarras, entrada  ${titulo}`
  }
}

export async function loader({params}) {
  // console.log({params});
  const {postUrl} = params
  // console.log("postUrl=", postUrl);

  const post = await getPost(postUrl)
  console.log("post recuperado..", post);
  
  if(post.data.length === 0) {
    throw new Response("Data de Response",{
      status: 404,
      statusText: 'Entrada No Encontrada'
    })
  }

  // return post.data[0].attributes
  return post
}



export default function Post() {
  
  // console.clear()
  const post = useLoaderData()
  // console.log("------------------ function Post ---------------")
  // console.log(post)

  const {contenido, imagen, publishedAt, titulo}= post.data[0].attributes

  const data = useOutletContext()
  console.log(`Context $postUrl - ${titulo} =`,data)

  return (
    <article className="contenedor post mt-3">
      <img src={imagen.data.attributes.url} alt={`imagen blog ${titulo}`}/>
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  )
}