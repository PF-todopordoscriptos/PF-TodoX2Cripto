import React from "react";

import style from "./About.module.css";

const About = () => {
  return (
    <div className={style.contTodo}>

      <div className={style.contTitulo}>
        <h1 className={style.Titulo}>About</h1>
      </div>

      <div className={style.contMedio}>
      <div className={style.contP}>
        <p className={style.pp}>Todo x 2 Criptos es una compañía fundada en 2.022 especializada en tecnología financiera. Con un profundo conocimiento de la tecnología Blockchain y de las criptomonedas. Ayudamos a individuos a acceder, comerciar y gestionar criptomonedas y activos digitales de forma óptima.</p>
        <p className={style.pp}>Siendo la puerta de acceso a mercados sin fricciones, dejando obsoleto el sistema financiero tradicional, la compañía está formada 7 personas: idealistas, emprendedores tecnológicos, investigadores, traders cuantitativos, financieros, e ingenieros.</p>
        <p className={style.pp}>Operamos sin descanso alrededor de todas las fases horarias y de todo el mundo, con oficinas centrales en Argentina, America del Sur.</p>
      </div>
      <div className={style.contDino}>
        <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1671219807/cripto/pbyyyfclacsoq3hyrcs9.png" alt="dino" className={style.dino}/>
      </div>
      </div>

    </div>
  );
};

export default About;
