import { useState, useEffect } from "react"
import styles from "~/styles/carrito.css"
import { useOutletContext } from "@remix-run/react";

export function links() {
  return [
    {
      rel:"stylesheet",
      href: styles
    },
  ]
}
/*
export function meta() {
  return {
    title:"GuitarLA - Carrito de Compras ",
    description:"Venta de guitarras, música, blog, carrito de compras, tienda"
  }
}*/

function Carrito() {

  const [total, setTotal] = useState(0)
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext()
  // console.log({carrito})

  useEffect(() => {
    // Recalcular "Total"
    const calculoTotal=carrito.reduce((total, producto) => total + (producto.cantidad*producto.precio), 0)
    
    setTotal(calculoTotal)
  }, [carrito])

  return (
    <main className="contenedor">
      <h1 className="heading"></h1>
      {/* <img src="/public/img/carrito.png" alt="icono" /> */}

      <div className="contenido">
        {/* -- Seccion "LISTA DE ARTICULOS" */}
        <div className="carrito">
          <h2>Articulos</h2>
          {carrito.length === 0 ? "Carrito Vacio" 
            : (carrito.map(producto => (
              <div key={producto.id} className="producto">
                <div>
                  <img src={producto.imagen} alt={`Imagen del Producto ${producto.nombre}`} />
                </div>

                <div>
                  <p className="nombre">{producto.nombre}</p>
                  <p>Cantidad:</p>
                    <select 
                      value={producto.cantidad}
                      onChange={e => actualizarCantidad(
                        {
                          id: producto.id,
                          cantidad: +e.target.value
                        }
                      )}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    
                  <p className="precio">{producto.precio}</p>
                  <p className="subtotal">Subtotal $ 
                    <span> {producto.cantidad * producto.precio} </span>
                  </p>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarGuitarra(producto.id)}
                  >X</button>
                </div>

              </div>
            )))
          }
        </div>

        {/* -- Seccion "RESUMEN DEL PEDIDO" */}
        <aside className="resumen">
          <h3>Resumen del Pedido</h3>
          <p>Total a Pagar: ${total}</p>
        </aside>

      </div>
    </main>
  )
}


export default Carrito