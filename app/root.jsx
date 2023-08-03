import { useState, useEffect } from "react"
import { Meta, Links, Outlet, Scripts, LiveReload, useCatch, Link } from "@remix-run/react";
import Header from "~/components/Header";
import styles from "~/styles/index.css";
import Footer from "~/components/Footer";

export function meta() {
  return {
    charset: "utf-8",
    title: "GuitarLA - remix",
    viewport: "width = device-width, initial-scale=1.0",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}


export function comentarios() {


  //Carrito hardcodeado
  const [carrito, setCarrito] = useState([
    {
      cantidad: 3,
      id:1,
      imagen: "https://res.cloudinary.com/dfpw6bzho/image/upload/v1666990573/guitarra_01_075acf5a95.jpg",
      nombre: "Vai",
      precio: 2490
    },
    {
      cantidad: 2,
      id:2,
      imagen: "https://res.cloudinary.com/dfpw6bzho/image/upload/v1666990573/guitarra_01_075acf5a95.jpg",
      nombre: "Clapton",
      precio: 2500
    },
    {
      cantidad: 4,
      id:3,
      imagen: "https://res.cloudinary.com/dfpw6bzho/image/upload/v1666990573/guitarra_01_075acf5a95.jpg",
      nombre: "OtraVai",
      precio: 2800
    }
  ])

  
  //Funcion usada en Context
  function sumar() {
    console.log("Suma 2 + 2 =", 2+2)
  }

  //Ejemplo de Context
  const context={
    guitarLa:"GuitarLA",
    auth:true,
    pascual: "herrera",
    ciudad: "Veracruz",
    sumar
  }

  
}

export default function App() {
  const initialState = []

  const [carrito, setCarrito] = useState(initialState)
  
  // Si existe "carrito" en localStorage, state "carrito" tomará su valor
  useEffect(() => {
    const carritoLS = JSON.parse(localStorage.getItem('carrito'))
    if (carritoLS) {
      setCarrito(carritoLS)
    }
  }, [])
  
  // Si state "carrito" cambia y no es un arreglo vacio, actualizamos  "carrito" de localstorage 
  useEffect(() => {
    if (carrito !== initialState){
      localStorage.setItem('carrito', JSON.stringify(carrito))
    }
  }, [carrito])

  
  const agregarCarrito = guitarra => {
    
    if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
      // console.log("ese elemento YA existe")
      
      const carritoActualizado = carrito.map(guitarraState => {
        if (guitarraState.id === guitarra.id) {
          // Reescribir la cantidad
          guitarraState.cantidad = guitarra.cantidad
        }
        return guitarraState
      })
      // Actualizar el carrito
      setCarrito(carritoActualizado)

    } else {
      // Registro nuevo, agregar al carrito
      // console.log("ese elemento NO existe")
      setCarrito([...carrito, guitarra])
    }
    console.log({carrito})
  } 

  const actualizarCantidad = guitarra => {
    console.log(guitarra)
    
    const carritoActualizado = carrito.map(guitarraState => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad
      }
      return guitarraState
    })

    setCarrito(carritoActualizado)
  }

  
  const eliminarGuitarra = id => {
    console.log("Eliminando...", id)
    const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
    setCarrito(carritoActualizado)
  }

  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra
        }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer/>
        <Scripts/>
        <LiveReload/>
      </body>
    </html>
  );
}

// Manejo de errores
export function CatchBoundary() {
  const error = useCatch()
  //data, es "Data de Response"
  return (
    <Document>
      <p className="error"> {error.status} {error.statusText}</p>
      <Link className='error-enlace' to="/">Volver a la página principal</Link>
    </Document>
  ) 
}

export function ErrorBoundary({error}) {

  return (
    <Document>
      <p className="error"> {error.status} {error.statusText}</p>
      <Link className='error-enlace' to="/">Volver a la página principal</Link>
    </Document>
  ) 
}


