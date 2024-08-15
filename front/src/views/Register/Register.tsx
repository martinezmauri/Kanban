import axios from "axios";
import { useEffect, useState } from "react";
import { createToast } from "../../helpers/Toast";

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    birthdate: "",
    username: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);
  const Toast = createToast();

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmit(true);
  };
  const handleClearInputs = (): void => {
    setRegisterData({
      name: "",
      email: "",
      birthdate: "",
      username: "",
      password: "",
    });
  };
  useEffect(() => {
    if (submit) {
      const registerUser = async (): Promise<void> => {
        try {
          const response = await axios.post(
            "http://localhost:3000/users/register",
            {
              name: registerData.name,
              email: registerData.email,
              birthdate: registerData.birthdate,
              username: registerData.username,
              password: registerData.password,
            }
          );
          if (response.status === 201) {
            handleClearInputs();
            Toast.fire({
              icon: "success",
              title: "Registro exitoso",
            });
          }
        } catch (error: any) {
          if (error.response.status !== 201) {
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
      registerUser();
    }
  }, [submit, registerData]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            name="name"
            value={registerData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
          />

          <label htmlFor="birthdate">Fecha de nacimiento</label>
          <input
            type="date"
            name="birthdate"
            value={registerData.birthdate}
            onChange={handleChange}
          />

          <label htmlFor="username">Nombre de usuario: </label>
          <input
            type="text"
            name="username"
            value={registerData.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Contraseña: </label>
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
          />
        </section>
        <button>Registrarse</button>
      </form>
    </div>
  );
};
