import { Link } from "@remix-run/react"
import logo from "../../public/img/logo.svg"
import Navegacion from "./Navegacion"

export default function Header() {
  return (
    <header className="header">
      <div className="contenedor barra">
        <Link to="/inicio">
          <img className="logo" src={logo} alt="Imagen del Logo" />
        </Link>

        <Navegacion/>
      </div>
    </header>
  )
}
