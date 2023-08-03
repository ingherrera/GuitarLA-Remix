import imagen from "../../public/img/nosotros.jpg"
import styles from "~/styles/nosotros.css"
import { useOutletContext  } from "@remix-run/react";
 
export function meta(){
  return(
    {
      title: "GuitarLA - Sobre Nosotros",
      description: "Venta de guitarras, blog de música"
    }
  )
}

export function links(){
  return[
    {
      rel:"stylesheet",
      href:styles
    },
    {
      rel:"preload",
      href: imagen,
      as: "image"
    }
  ]
}

export default function Nosotros() {
  const data = useOutletContext()
  console.log("Nosotros - context", data)
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt ="Imagen sobre Nosotros"/>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet libero non sagittis pulvinar. Morbi aliquet, odio ut congue ullamcorper, lectus nibh molestie libero, quis commodo massa mauris in mi.</p>
          <p>Vestibulum quis posuere risus. Maecenas malesuada felis sit amet arcu imperdiet finibus. Pellentesque porttitor erat nisi, feugiat fermentum quam varius ut. Pellentesque aliquet ornare mauris ut pretium. Suspendisse a felis faucibus, vestibulum urna ac, venenatis nibh. </p>
        </div>
      </div>
    </main>
  );
}
