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



      <div class={style.container}>
        <div class={style.carousel}>
          <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673564725/js_hozpd1.png" className={style.img} alt="js" />
            </div>
          <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673564725/html_siseph.png" className={style.img} alt="html" />
            </div>
          <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673564725/css_irv80j.png" className={style.img} alt="css" />
            </div>
          <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673564725/nodejs_puzodm.png" className={style.img} alt="node" />
            </div>
          <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673564725/express_zov0lb.png" className={style.img} alt="express" />
            </div>
          <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673564726/react_qi7wcp.png" className={style.img} alt="react" />
            </div>
          <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673564725/redux_v4tk92.png" className={style.img} alt="redux" />
            </div>
          <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673565048/material-ui_mdoaxj.png" className={style.img} alt="material" />
            </div>
          <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673565070/Firebase_Logo_ll8ogs.png" className={style.img} alt="firebase" />
            </div>
            <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673566063/icon-256x256_emcbtf.png" className={style.img} alt="mp" />
            </div>
            <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673566401/azure-logo_bp6twl.png" className={style.img} alt="azure" />
            </div>
            <div class={style.carousel__face}>
            <img src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673566666/render_kcbggy.png" className={style.img} alt="render" />
            </div>
        </div>
      </div>


    </div>
  );
};

export default About;
