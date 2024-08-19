import { LoginData } from "../views/Login/LoginData.interface";

interface Registro {
  name: string;
  email: string;
  birthdate: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export const validateRegister = (input: Registro) => {
  const { name, email, birthdate, username, password, confirmPassword } = input;
  const errors = {
    nameError: "",
    emailError: "",
    birthdateError: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
  };
  if (!name.trim()) {
    errors.nameError = "El nombre es obligatorio";
  } else if (/^[a-zA-Z]+( [a-zA-Z]+)?$/.test(name) === false) {
    errors.nameError = "El nombre debe contener unicamente letras";
  }
  if (!email.trim()) {
    errors.emailError = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.emailError = "El email no es valido";
  }
  if (!birthdate.trim()) {
    errors.birthdateError = "La fecha de nacimiento es obligatoria";
  } else {
    const currentDate = new Date();
    const birthDate = new Date(birthdate);
    if (birthDate >= currentDate) {
      errors.birthdateError =
        "La fecha de nacimiento debe ser anterior a la fecha actual.";
    }
  }
  if (!username.trim()) {
    errors.usernameError = "El nombre de usuario es obligatorio";
  }
  if (!password.trim()) {
    errors.passwordError = "La contraseña es obligatoria";
  }
  if (password !== confirmPassword) {
    errors.confirmPasswordError = " Las contraseñas no coinciden";
  }
  return errors;
};

export const validateLogin = (input: LoginData) => {
  const { username, password } = input;
  const errors = {
    usernameError: "",
    passwordError: "",
  };
  if (!username.trim()) {
    errors.usernameError = "El nombre de usuario es obligatorio";
  }
  if (!password.trim()) {
    errors.passwordError = "La contraseña es obligatoria";
  }
  return errors;
};
