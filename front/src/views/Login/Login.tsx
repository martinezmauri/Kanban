import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createToast } from "../../helpers/Toast";
import { UserContext } from "../../context/UserContext.tsx";
import { LoginData } from "./LoginData.interface.ts";
import { validateLogin } from "../../helpers/validate.ts";

export const Login: React.FC = () => {
  const [dataLogin, setDataLogin] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
    const newErrors = validateLogin({ ...dataLogin, [name]: value });
    setErrors(newErrors);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const validationErrors = validateLogin(dataLogin);
    setErrors(validationErrors);
    if (validationErrors.usernameError || validationErrors.passwordError) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
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
            setUser(response.data.user);
            handleClearInputs();
            Toast.fire({
              icon: "success",
              title: "Login in successfully",
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
        <section className={styles.field}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={dataLogin.username}
            onChange={handleChange}
            placeholder=" "
          />
        </section>
        <section className={styles.field}>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={dataLogin.password}
            onChange={handleChange}
            placeholder=" "
          />
        </section>
        <button>Iniciar sesion</button>
      </form>
    </div>
  );
};
// Error status : 200 , 400, 500

// modularizar toast
