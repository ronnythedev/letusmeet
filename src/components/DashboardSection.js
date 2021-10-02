import React from "react";
import Section from "./Section";
import Container from "@material-ui/core/Container";
import SectionHeader from "./SectionHeader";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "./../util/router.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
}));

function DashboardSection(props) {
  const classes = useStyles();

  const auth = useAuth();
  const router = useRouter();

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
        <Accordion>
          <AccordionSummary />
        </Accordion>
      </Container>
    </Section>
  );
}

export default DashboardSection;
