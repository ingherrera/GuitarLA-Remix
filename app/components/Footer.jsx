import Navegacion from "./Navegacion"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor contenido">
        <Navegacion/>
        <p className="copyright">Todos los derechos reservados { new Date().getFullYear() } </p>
      </div>
    </footer>
  )
}

