import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../helpers/Toast";

export const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: any): void => {
    const { name, value } = event.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    setSubmit(true);
  };

  const Toast = createToast();

  const handleClearInputs = (): void => {
    setDataLogin({
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    if (submit) {
      const loginUser = async (): Promise<void> => {
        try {
          const response = await axios.post(
            "http://localhost:3000/users/login",
            {
              username: dataLogin.username,
              password: dataLogin.password,
            }
          );
          if (response.status === 200) {
            handleClearInputs();
            Toast.fire({
              icon: "success",
              title: "Login in successfully",
              imageUrl: response.data.user.avatar,
              imageHeight: 50,
              imageAlt: "Avatar user",
            });

            navigate("/myTasks");
          }
        } catch (error: any) {
          if (error.response.status === 400) {
            handleClearInputs();
            Toast.fire({
              icon: "error",
              title: `${error.response.data.message}`,
            });
          }
        } finally {
          setSubmit(false);
        }
      };
      loginUser();
    }
  }, [dataLogin, submit]);

  return (
    <div className={styles.hero}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <section>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={dataLogin.username}
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={dataLogin.password}
            onChange={handleChange}
          />
        </section>
        <button>Iniciar sesion</button>
      </form>
    </div>
  );
};
// Error status : 200 , 400, 500

// modularizar toast
