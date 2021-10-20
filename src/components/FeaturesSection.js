import React from "react";
import Section from "./Section";
import Container from "@material-ui/core/Container";
import SectionHeader from "./SectionHeader";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  itemsContainer: {
    marginTop: 60,
  },
  row: {
    // Reverse every other row
    "&:nth-of-type(even)": {
      flexDirection: "row-reverse",
    },

    // Spacing between rows
    "&:not(:last-child)": {
      marginBottom: `${theme.spacing(3)}px`,
    },
  },
  figure: {
    maxWidth: 300,
    margin: "30px auto",
  },
  image: {
    height: "auto",
    maxWidth: "100%",
  },
}));

function FeaturesSection(props) {
  const classes = useStyles();

  const items = [
    {
      title: "1. Define tu Calendario",
      description:
        "Selecciona los días y las horas de la semana en que estarás disponible para citas y reuniones.",
      image: "https://staging.files.eleadertech.com/ronny/time.svg",
    },
    {
      title: "2. Define tu Enlace Único",
      description:
        "Personaliza tu Enlace Único. Con este enlace, cualquier persona podrá ver tu calendario para solicitarte citas.",
      image: "https://staging.files.eleadertech.com/ronny/unique-link.svg",
    },
    {
      title: "3. Comparte tu Enlace Único",
      description:
        "Comparte tu Enlace Único donde quieras: bio de redes sociales, emails, tarjetas de presentación...",
      image: "https://staging.files.eleadertech.com/ronny/social-girl.svg",
    },
    {
      title: "4. Gestiona solicitudes",
      description:
        "Acepta o declina solicitudes de citas con un clic. Tu mantienes el control de tu tiempo.",
      image: "https://staging.files.eleadertech.com/ronny/switches.svg",
    },
    {
      title: "5. Reúnete en Línea",
      description:
        "Por cada reunión que confirmes, te enviaremos un email con un enlace seguro para que hagas tu reunión con audio y video.",
      image: "https://staging.files.eleadertech.com/ronny/online-meeting.svg",
    },
    {
      title: "¡GRATIS SIEMPRE!",
      description:
        "Gracias a la tecnología que implementamos, tus reuniones con audio y video son GRATIS y SIN LÍMITE de tiempo. Y así será SIEMPRE. No necesitarás (ni tus clientes) instalar ningún software ni aplicación.",
      image:
        "https://staging.files.eleadertech.com/ronny/online-celebration.svg",
    },
  ];

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        <Container
          maxWidth="md"
          disableGutters={true}
          className={classes.itemsContainer}
        >
          {items.map((item, index) => (
            <Grid
              className={classes.row}
              container={true}
              item={true}
              alignItems="center"
              spacing={4}
              key={index}
            >
              <Grid item={true} xs={12} md={6}>
                <Box
                  textAlign={{
                    xs: "center",
                    md: "left",
                  }}
                >
                  <Typography variant="h5" gutterBottom={true}>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
              <Grid item={true} xs={12} md={6}>
                <figure className={classes.figure}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={classes.image}
                  />
                </figure>
              </Grid>
            </Grid>
          ))}
        </Container>
      </Container>
    </Section>
  );
}

export default FeaturesSection;
