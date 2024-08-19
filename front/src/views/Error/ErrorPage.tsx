import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div style={{ textAlign: "center", padding: "100px", color: "black" }}>
      <h1 style={{ padding: "30px" }}>!UPS!</h1>
      <p>Parece que no podemos encontrar la página que estas buscando.</p>
      <p>Seras redirigido a la pagina principal</p>
      <p style={{ padding: "30px" }}>Codigo de error: 404</p>
    </div>
  );
};
