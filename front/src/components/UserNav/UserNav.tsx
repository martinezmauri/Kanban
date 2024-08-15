import { Link } from "react-router-dom"
import styles from "./UserNav.module.css"
export const UserNav = () => {
  return (
    <div className={styles.container}>
        <div className={styles.login}>
            <Link to={"/login"}>Login</Link>
        </div>
        <div className={styles.register}>
            <Link to={"/register"}>Register</Link>
        </div>
    </div>
  )
}
