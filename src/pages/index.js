import React from "react";
import HeroSection from "./../components/HeroSection";
import FeaturesSection from "./../components/FeaturesSection";
import TestimonialsSection from "./../components/TestimonialsSection";
import NewsletterSection from "./../components/NewsletterSection";

function IndexPage(props) {
  return (
    <>
      <HeroSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Reuniones en línea fáciles y gratis"
        subtitle="Con nuestra solución podrás gestionar tu calendario, confirmar citas y hacer reuniones en línea gratis y sin límites de tiempo."
        image="https://staging.files.eleadertech.com/ronny/main2.jpg"
        buttonText="Iniciar"
        buttonColor="primary"
        buttonPath="/auth/singin"
      />
      <FeaturesSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="¿Cómo funciona?"
        subtitle="5 Simples Pasos"
      />
      <TestimonialsSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Esto es lo que dicen de nosotros"
        subtitle=""
      />
      <NewsletterSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Mantente Informado"
        subtitle="Recibe nuestros últimos artículos y actualizaciones"
        buttonText="Suscribir"
        buttonColor="primary"
        inputPlaceholder="Ingresa tu email"
        subscribedMessage="¡Ya estás suscrito!"
      />
    </>
  );
}

export default IndexPage;
