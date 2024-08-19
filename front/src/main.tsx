import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);

// Usar HandleError para mostrar los mensajes o mostrar el input en rojo
// Crear home - contact - about us - footer
// El usuario que no este logeado no puede crear tareas ni ver sus tareas. (Lo podria redirigir a una especie de muestra de las tareas.)
// Buscar un logo para usar en vez de inicio
// Las tarjetas deben tener un color por default, luego el usuairo puede cambiar este color segun quiera.
// Cambiar botones a sign in y sign up

// En userNav debo desplegar un menu cuando se apreta en la imagen

// modularizar(axios,Toast,error,etc)

// SE ESTA CREANDO UNA CREDENTIAL NULL PARA UN USER
