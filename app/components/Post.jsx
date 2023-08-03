import { formatearFecha } from "~/utils/helpers.js"
import { Link } from "@remix-run/react";

export default function Post({post}) {
  // console.log("Componente Post..",post)
  const {contenido, imagen, publishedAt, titulo, url}= post
  
  return ( 
    <article className="post">
      <img src={imagen.data.attributes.formats.small.url} alt={`imagen blog ${titulo}`} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="resumen">{contenido}</p>
        <Link className="enlace" to={`/blog/${url}`}>Leer Post</Link>
      </div>
    </article>
  )
}
