import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"
import imageHome from "../../assets/home.png"
import imageTask from "../../assets/task.png"
import imageAbout from "../../assets/acerca-de.png"
import imageContact from "../../assets/contact.png"
import { UserNav } from "../UserNav/UserNav"

const Navbar = () => {
  return (
    <div className={styles.hero}>
      <nav className={styles.navigation}>
        <Link to={"/"} className={styles.buttonNavigation}>
          <img src={imageHome} alt="" />
          <p>Home</p>
        </Link>
        <Link to={"/myTasks"} className={styles.buttonNavigation}>
          <img src={imageTask} alt="" />
          <p>My tasks</p>
        </Link>
        <Link to={"/about"} className={styles.buttonNavigation}>
          <img src={imageAbout} alt="" />
          <p>About us</p>
        </Link>
        <Link to={"/contact"} className={styles.buttonNavigation}>
          <img src={imageContact} alt="" />
          <p>Contact</p>
        </Link>
      </nav>
      <div className={styles.user}>
        {<UserNav/>}
      </div>
    </div>
  )
}

export default Navbar;

// modularizar la interface

// Agregar user

// El main debe montarse en app (Usar un helper para validar si el user esta logeado.)

{/* <ul className={styles.list}>
        <li><Link to={"/"} className={styles.menu}>Home</Link></li>
        <li><a className={styles.menu} href="">Turnos</a></li>
        <li><a className={styles.menu} href="">Nosotros</a></li>
        <li><a className={styles.menu} href="">Contacto</a></li>
      </ul>
        {isLoged === true ? (
          <ul className={styles.userAction}>
            <li><a href="">Login</a></li>
            <li><a href="">Register</a></li>
          </ul>
        ):<></>} */}

        /* interface NavbarProps{
  isLoged: boolean
} */

