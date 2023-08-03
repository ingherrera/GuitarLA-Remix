import ListadoPosts from "~/components/ListadoPosts";
import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/posts.server.js";
import styles from "~/styles/blog.css";

export function meta() {
  return {
    title:"GuitarLA - Nuestro Blog",
    description: "GuitarLA - Blog de Musica y venta de Guitarras"
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

export async function loader() {
  // console.log("*****************Loader***********")
  const posts = await getPosts()
  return posts.data
}

export default function Blog() {
  const posts = useLoaderData()
  // console.log(posts)

  return (
    <div>
      <ListadoPosts
        posts = {posts}
      />
    </div>
  )
}
