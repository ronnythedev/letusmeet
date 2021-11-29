import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth } from "./../util/auth.js";
import { useForm } from "react-hook-form";

function SettingsPassword(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);

  const { register, handleSubmit, errors, reset, getValues } = useForm();

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);

    auth
      .updatePassword(data.pass)
      .then((response) => {
        reset();

        if (response.code === undefined || response.code === 200) {
          props.onStatus({
            type: "success",
            message: "¡Tu contraseña se ha actualizado!",
          });
        } else if (response.code === 404) {
          props.onStatus({
            type: "error",
            message:
              "No se pudo encontrar un usuario para actualizar contraseña",
          });
        } else {
          props.onStatus({
            type: "error",
            message: "Hubo un error y no se pudo actualizar la contraseña",
          });
        }
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          // Update state to show re-authentication modal
          props.onStatus({
            type: "requires-recent-login",
            // Resubmit after reauth flow
            callback: () => onSubmit({ pass: data.pass }),
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
            type="password"
            label="Nueva Contraseña"
            name="pass"
            placeholder="Nueva Contraseña"
            error={errors.pass ? true : false}
            helperText={errors.pass && errors.pass.message}
            fullWidth={true}
            inputRef={register({
              required: "Por favor ingresa la contraseña",
            })}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <TextField
            variant="outlined"
            type="password"
            label="Confirme nueva contraseña"
            name="confirmPass"
            placeholder="Confirmación de Contraseña"
            error={errors.confirmPass ? true : false}
            helperText={errors.confirmPass && errors.confirmPass.message}
            fullWidth={true}
            inputRef={register({
              required: "Por favor ingresa la nueva contraseña otra vez",
              validate: (value) => {
                if (value === getValues().pass) {
                  return true;
                } else {
                  return "Este valor no concuerda con tu nueva contraseña";
                }
              },
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
            {!pending && <span>Guardar</span>}

            {pending && <CircularProgress size={28} />}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SettingsPassword;
