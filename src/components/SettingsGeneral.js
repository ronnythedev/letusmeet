import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth } from "./../util/auth.js";
import { useForm } from "react-hook-form";

function SettingsGeneral(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);

    return auth
      .updateProfile(data)
      .then(() => {
        // Set success status
        props.onStatus({
          type: "success",
          message: "Your profile has been updated",
        });
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          props.onStatus({
            type: "requires-recent-login",
            // Resubmit after reauth flow
            callback: () => onSubmit(data),
          });
        } else {
          // Set error status
          props.onStatus({
            type: "error",
            message: error.message,
          });
        }
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <TextField
            variant="outlined"
            type="text"
            label="Nombrre"
            name="firstName"
            placeholder="Nombre"
            defaultValue={auth.user.firstName}
            error={errors.firstName ? true : false}
            helperText={errors.firstName && errors.firstName.message}
            fullWidth={true}
            inputRef={register({
              required: "Por favor ingresa tu nombre",
            })}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <TextField
            variant="outlined"
            type="text"
            label="Apellido"
            name="lastName"
            placeholder="Apellido"
            defaultValue={auth.user.lastName}
            error={errors.lastName ? true : false}
            helperText={errors.lastName && errors.lastName.message}
            fullWidth={true}
            inputRef={register({
              required: "Por favor ingresa tu apellido",
            })}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            name="email"
            placeholder="user@example.com"
            defaultValue={auth.user.email}
            error={errors.email ? true : false}
            helperText={errors.email && errors.email.message}
            fullWidth={true}
            inputRef={register({
              required: "Please enter your email",
            })}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={pending}
            fullWidth={true}
          >
            {!pending && <span>Save</span>}

            {pending && <CircularProgress size={28} />}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SettingsGeneral;
