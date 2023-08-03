import { useLoaderData } from "@remix-run/react"
import ListadoGuitarras from "~/components/ListadoGuitarras"
import { getGuitarras } from "~/models/guitarras.server";
// import { useOutletContext  } from "@remix-run/react";

import styles from "~/styles/guitarras.css"

export function meta() {
  return {
    title:"GuitarLA - Tienda de Guitarras",
    description: "GuitarLA - Nuestra Coleccion de Guitarras"
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

export async function loader(){
  // console.clear()
  const guitarras = await getGuitarras()
  // console.log("Guitarras - Loader ...")
  // console.log("Guitarras.data ...",guitarras.data)
  return guitarras.data
}

export default function Guitarras() {
  const guitarras = useLoaderData()

  // const data = useOutletContext()
  // console.log("Guitarras - context", data)
  // console.log("***************INDEX GUITARRAS*******************************")
  console.log("index guitarras... ",guitarras)
  return (
    <ListadoGuitarras 
      guitarras={guitarras}
    />
  );
}

// @ts-nocheck

