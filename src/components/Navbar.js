import React, { useState } from "react";
import Section from "./Section";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "./../util/router.js";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useAuth } from "./../util/auth.js";
import { useDarkMode } from "./../util/theme.js";
import { makeStyles } from "@material-ui/core/styles";

import * as userServices from "../services/userServices";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 28,
    marginRight: theme.spacing(2),
  },
  drawerList: {
    width: 250,
  },
  spacer: {
    flexGrow: 1,
  },
  warning: {
    padding: "10px",
    textAlign: "center",
    backgroundColor: "darkorange",
  },
  userLogged: {
    borderRightStyle: "solid",
    borderRightColor: "gray",
    borderRightWidth: "1px",
    paddingRight: "10px",
    fontWeight: "bold",
  },
}));

function Navbar(props) {
  const classes = useStyles();

  const auth = useAuth();
  const darkMode = useDarkMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuState, setMenuState] = useState(null);
  const [sending, setSending] = useState(0);

  // Use inverted logo if specified
  // and we are in dark mode
  const logo =
    props.logoInverted && darkMode.value ? props.logoInverted : props.logo;

  const handleOpenMenu = (event, id) => {
    // Store clicked element (to anchor the menu to)
    // and the menu id so we can tell which menu is open.
    setMenuState({ anchor: event.currentTarget, id });
  };

  const resendConfirmationEmail = () => {
    setSending(1);

    userServices.resendConfirmationEmail().then((response) => {
      if (response.code === undefined || response.code === 200) {
        setSending(2);
        setTimeout(() => {
          setSending(0);
        }, 3000);
      } else {
        alert("Hubo un error al enviar email de confirmación");
      }
    });
  };

  const handleCloseMenu = () => {
    setMenuState(null);
  };

  return (
    <Section bgColor={props.color} size="auto">
      <AppBar position="static" color="transparent" elevation={0}>
        <Container disableGutters={true}>
          <Toolbar>
            <Link to="/dashboard">
              <img src={logo} alt="Logo" className={classes.logo} />
            </Link>
            <div className={classes.spacer} />
            {auth.user && auth.user.firstName && auth.user.lastName && (
              <>
                <div className={classes.userLogged}>
                  {auth.user.firstName + " " + auth.user.lastName}
                </div>
              </>
            )}

            <Hidden smUp={true} implementation="css">
              <IconButton
                onClick={() => {
                  setDrawerOpen(true);
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden xsDown={true} implementation="css">
              {!auth.user && (
                <Button color="inherit" component={Link} to="/auth/signin">
                  Ingresar
                </Button>
              )}

              {auth.user && (
                <>
                  <Button
                    color="inherit"
                    aria-label="Account"
                    aria-controls="account-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      handleOpenMenu(event, "account-menu");
                    }}
                  >
                    Tu Cuenta
                    <ExpandMoreIcon className={classes.buttonIcon} />
                  </Button>
                  <Menu
                    id="account-menu"
                    open={
                      menuState && menuState.id === "account-menu"
                        ? true
                        : false
                    }
                    anchorEl={menuState && menuState.anchor}
                    getContentAnchorEl={undefined}
                    onClick={handleCloseMenu}
                    onClose={handleCloseMenu}
                    keepMounted={true}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <MenuItem component={Link} to="/dashboard">
                      Fechas Disponibles
                    </MenuItem>
                    <MenuItem component={Link} to="/upcoming-meetings-list">
                      Próximas Reuniones
                    </MenuItem>
                    <MenuItem component={Link} to="/meeting-request-list">
                      Solicitudes Pendientes
                    </MenuItem>
                    <MenuItem component={Link} to="/settings/general">
                      Mi Perfil
                    </MenuItem>

                    <Divider />
                    <MenuItem
                      onClick={() => {
                        auth.signout();
                      }}
                    >
                      Salir
                    </MenuItem>
                  </Menu>
                  {/* <IconButton
                    color="inherit"
                    component={Link}
                    to="/meeting-request-list"
                  >
                    <Badge badgeContent={4} color="secondary">
                      <NotificationIcon />
                    </Badge>
                  </IconButton> */}
                </>
              )}

              <IconButton
                color="inherit"
                onClick={darkMode.toggle}
                style={{ opacity: 0.6 }}
              >
                {darkMode.value && <NightsStayIcon />}

                {!darkMode.value && <WbSunnyIcon />}
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List
          className={classes.drawerList}
          onClick={() => setDrawerOpen(false)}
        >
          {!auth.user && (
            <ListItem button={true} component={Link} to="/auth/signin">
              <ListItemText>Ingresar</ListItemText>
            </ListItem>
          )}

          {auth.user && (
            <>
              <MenuItem component={Link} to="/dashboard">
                Fechas Disponibles
              </MenuItem>
              <MenuItem component={Link} to="/upcoming-meetings-list">
                Próximas Reuniones
              </MenuItem>
              <MenuItem component={Link} to="/meeting-request-list">
                Solicitudes Pendientes
              </MenuItem>
              <MenuItem component={Link} to="/settings/general">
                Mi Perfil
              </MenuItem>

              <Divider />
              <ListItem
                button={true}
                onClick={(event) => {
                  auth.signout();
                }}
              >
                <ListItemText>Salir</ListItemText>
              </ListItem>
            </>
          )}
          {/* <ListItem>
            <Badge badgeContent={4} color="primary">
              <NotificationIcon />
            </Badge>
          </ListItem> */}
          <ListItem>
            <IconButton
              color="inherit"
              onClick={darkMode.toggle}
              style={{ opacity: 0.6 }}
            >
              {darkMode.value && <NightsStayIcon />}

              {!darkMode.value && <WbSunnyIcon />}
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
      {auth.user && !auth.user.isEmailConfirmed && (
        <Box className={classes.warning}>
          <span>
            Debes confirmar tu email. Algunas opciones no estarán disponibles
            hasta que no realices esta acción.
          </span>
          &nbsp;
          {sending === 1 ? (
            <span>
              <b>Enviando...</b>
            </span>
          ) : sending === 2 ? (
            <span>
              <b>¡Email enviado!</b>
            </span>
          ) : (
            <a href="#" onClick={resendConfirmationEmail}>
              Reenviar Email de Confirmación
            </a>
          )}
        </Box>
      )}
    </Section>
  );
}

export default Navbar;
