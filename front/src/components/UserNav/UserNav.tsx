import { Link } from "react-router-dom";
import styles from "./UserNav.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
export const UserNav = () => {
  const { user } = useContext(UserContext);
  const handleLogout = (event: any) => {
    console.log("cerrando sesion");
  };
  return (
    <>
      {user ? (
        <div className={styles.avatar}>
          <img src={user.avatar} />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.login}>
            <Link to={"/login"}>Sign in</Link>
          </div>
          <div className={styles.register}>
            <Link to={"/register"}>Sign up</Link>
          </div>
        </div>
      )}
    </>
  );
};
