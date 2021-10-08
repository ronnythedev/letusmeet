import React from "react";
import Section from "./Section";
import Container from "@material-ui/core/Container";
import SectionHeader from "./SectionHeader";
import Auth from "./Auth";

function AuthSection(props) {
  // Values for each auth type
  const allTypeValues = {
    signin: {
      // Top title
      title: "Bienvenido",
      // Submit button text
      buttonText: "Ingresar",
      // Link text to other auth types
      linkTextSignup: "Crear una cuenta",
      linkTextForgotpass: "¿Olvidaste el Password?",
    },
    signup: {
      title: "Créate una cuenta",
      buttonText: "Crear cuenta",
      linkTextSignin: "Ingresar",
    },
    forgotpass: {
      title: "Créate un nuevo password",
      buttonText: "Restablecer password",
    },
    changepass: {
      title: "Selecciona un password nuevo",
      buttonText: "Cambiar password",
    },
  };

  // Ensure we have a valid auth type
  const currentType = allTypeValues[props.type] ? props.type : "signup";

  // Get values for current auth type
  const typeValues = allTypeValues[currentType];

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container maxWidth="xs">
        <SectionHeader
          title={allTypeValues[currentType].title}
          subtitle=""
          size={4}
          textAlign="center"
        />
        <Auth
          type={currentType}
          typeValues={typeValues}
          providers={props.providers}
          afterAuthPath={props.afterAuthPath}
          key={currentType}
        />
      </Container>
    </Section>
  );
}

export default AuthSection;
