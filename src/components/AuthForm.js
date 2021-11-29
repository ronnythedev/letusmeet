import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth } from "./../util/auth.js";
import { useForm } from "react-hook-form";

function AuthForm(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const { handleSubmit, register, errors, getValues } = useForm();

  const submitHandlersByType = {
    signin: ({ email, pass }) => {
      return auth.signin(email, pass).then((user) => {
        props.onAuth(user);
      });
    },
    signup: ({ firstName, lastName, email, pass }) => {
      return auth.signup(firstName, lastName, email, pass).then((user) => {
        props.onAuth(user);
      });
    },
    forgotpass: ({ email }) => {
      return auth.sendPasswordResetEmail(email).then((response) => {
        if (response.code === undefined || response.code === 200) {
          props.onFormAlert({
            type: "success",
            message: "Se envió un email para restablecer el password",
          });
        } else if (response.code === 404) {
          props.onFormAlert({
            type: "error",
            message: "Email no existe",
          });
        } else {
          props.onFormAlert({
            type: "error",
            message: "Hubo un error y no se pudo enviar el email",
          });
        }
        setPending(false);
      });
    },
    changepass: ({ pass }) => {
      return auth.confirmPasswordReset(pass).then((response) => {
        if (response.code === undefined || response.code === 200) {
          props.onFormAlert({
            type: "success",
            message: "Tu password se actualizó correctamente",
          });
        } else if (response.code === 400) {
          props.onFormAlert({
            type: "error",
            message: "Falta información. No se puede actualizar la contraseña",
          });
        } else if (response.code === 404) {
          props.onFormAlert({
            type: "error",
            message: "Token inválido. No se puede actualizar la contraseña",
          });
        } else if (response.code === 410) {
          props.onFormAlert({
            type: "error",
            message:
              "El enlance utilizado ya expiró. Por favor solicite uno nuevo",
          });
        } else {
          props.onFormAlert({
            type: "error",
            message: "Hubo un error y no se pudo actualizar la contraseña",
          });
        }
        setPending(false);
      });
    },
  };

  // Handle form submission
  const onSubmit = ({ firstName, lastName, email, pass }) => {
    // Show pending indicator
    setPending(true);

    // Call submit handler for auth type
    submitHandlersByType[props.type]({
      firstName,
      lastName,
      email,
      pass,
    }).catch((error) => {
      if (props.type === "signin") {
        if (error.message === "Cannot Sign In. Invalid credentials.") {
          props.onFormAlert({
            type: "error",
            message: "El email y constraseña ingresados son inválidos",
          });
        } else {
          props.onFormAlert({
            type: "error",
            message: "Se produjo un error y no se pudo ingresar",
          });
        }
      } else if (props.type === "signup") {
        if (
          error.message === "User already exists, please try to login instead."
        ) {
          props.onFormAlert({
            type: "error",
            message: "El usuario ya existe, intente ingresar con constraseña.",
          });
        } else {
          props.onFormAlert({
            type: "error",
            message: `Hubo un error al crear el usuario. Por favor vuelva a intentar. Ref: ${error.message}`,
          });
        }
      }
      setPending(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container={true} spacing={2}>
        {["signup"].includes(props.type) && (
          <Grid item={true} xs={12}>
            <TextField
              variant="outlined"
              type="text"
              label="Nombre"
              name="firstName"
              placeholder="Jose"
              error={errors.firstName ? true : false}
              helperText={errors.firstName && errors.firstName.message}
              fullWidth={true}
              inputRef={register({
                required: "Por favor ingresa tu nombre",
              })}
            />
          </Grid>
        )}

        {["signup"].includes(props.type) && (
          <Grid item={true} xs={12}>
            <TextField
              variant="outlined"
              type="text"
              label="Apellido"
              name="lastName"
              placeholder="Rojas"
              error={errors.lastName ? true : false}
              helperText={errors.lastName && errors.lastName.message}
              fullWidth={true}
              inputRef={register({
                required: "Por favor ingresa tu apellido",
              })}
            />
          </Grid>
        )}

        {["signup", "signin", "forgotpass"].includes(props.type) && (
          <Grid item={true} xs={12}>
            <TextField
              variant="outlined"
              type="email"
              label="Email"
              name="email"
              placeholder="usuario@ejemplo.com"
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
              fullWidth={true}
              inputRef={register({
                required: "Por favor ingresa tu email",
              })}
            />
          </Grid>
        )}

        {["signup", "signin", "changepass"].includes(props.type) && (
          <Grid item={true} xs={12}>
            <TextField
              variant="outlined"
              type="password"
              label="Password"
              name="pass"
              error={errors.pass ? true : false}
              helperText={errors.pass && errors.pass.message}
              fullWidth={true}
              inputRef={register({
                required: "Por favor ingresa tu password",
                minLength: 6,
              })}
            />
          </Grid>
        )}

        {["signup", "changepass"].includes(props.type) && (
          <Grid item={true} xs={12}>
            <TextField
              variant="outlined"
              type="password"
              label="Confirmar Password"
              name="confirmPass"
              error={errors.confirmPass ? true : false}
              helperText={errors.confirmPass && errors.confirmPass.message}
              fullWidth={true}
              inputRef={register({
                required: "Por favor ingresa tu password otra vez",
                validate: (value) => {
                  if (value === getValues().pass) {
                    return true;
                  } else {
                    return "No concuerda con tu password";
                  }
                },
              })}
            />
          </Grid>
        )}

        <Grid item={true} xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={pending}
            fullWidth={true}
          >
            {!pending && <span>{props.typeValues.buttonText}</span>}

            {pending && <CircularProgress size={28} />}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AuthForm;
