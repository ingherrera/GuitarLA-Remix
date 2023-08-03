import { getGuitarras  } from "~/models/guitarras.server.js";
import { getPosts  } from "~/models/posts.server.js";
import { getCurso  } from "~/models/curso.server.js";
import { useLoaderData } from '@remix-run/react'
import ListadoGuitarras from "~/components/ListadoGuitarras"
import ListadoPosts from "~/components/ListadoPosts"
import Curso from "~/components/Curso"
import stylesGuitarras from "~/styles/guitarras.css"
import stylesBlog from "~/styles/blog.css"
import stylesCurso from "~/styles/curso.css"

export function links(){
  return[
    {
      rel:"stylesheet",
      href:stylesGuitarras
    },
    {
      rel:"stylesheet",
      href:stylesBlog
    },
    {
      rel:"stylesheet",
      href:stylesCurso
    },
  ]
}

export async function loader(){
  // console.log("*****************Loader Index***********")
  const [guitarras, posts, curso]= await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ])
  
  // console.log("Guitarras..",guitarras)
  // console.log("Posts..",posts)
  // console.log("Curso..",curso)
  return {
    guitarras:guitarras.data,
    posts: posts.data,
    curso: curso.data,
  }
}


export default function Index() {
  const {guitarras, posts, curso } = useLoaderData();
  // console.log("Guitarras=",guitarras)
  // console.log("Post=",posts)
  // console.log("Curso=",curso)

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras 
          guitarras={guitarras}
          />
      </main>

      <Curso
        curso={curso.attributes}
      />

      <section className="contenedor">
        <ListadoPosts
          posts = {posts}
          />
      </section>
    </>
  );
}


