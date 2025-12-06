import React from "react";


const Contacto=()=>{
    return(
      <main>
        <h2 id="titulo-principal" className="titulo-principal">
          Información De Contacto
        </h2>

        <h3 className="mini-titulo">Número</h3>
        <p className="info">+56 (22) 23456789</p>

        <h3 className="mini-titulo">Redes Sociales</h3>
        <p className="info">@Pasteleria_Mil_Sabores_Santiago</p>

        <h3 className="mini-titulo">Ubicación</h3>
        <p className="info">Te esperamos en:</p>

        <iframe
          className="info-mapa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0890365209634!2d-70.66055698847885!3d-33.44698677327988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c507f91be917%3A0xcfac72a68dd4b986!2sDuoc%20UC%20-%20Sede%20Padre%20Alonso%20de%20Ovalle!5e0!3m2!1ses!2scl!4v1758139298431!5m2!1ses!2scl"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa ubicación Pastelería Mil Sabores"
        ></iframe>
      </main>
  );
};

export default Contacto;