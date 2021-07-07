import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState, FormEvent, useCallback, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { LoginRequest } from "../../contexts/auth/interfaces";
import { useStyles } from "./styles";

const Login: React.FC = () => {
  const {login} = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const initialState = { email: "", password: "" } as LoginRequest;

  const [loginForm, setLoginForm] = useState(initialState);

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const isFormValid = checkFormIsValid();
      if (isFormValid) {
        await login(loginForm);
        history.push("/health-check");
      }
    } catch (err) {
      alert(err);
    }
    setLoginForm(initialState);
  };

  const checkFormIsValid = () => {
    return Object.values(loginForm).every((value) => !!value);
  };

  const handleFormInput = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setLoginForm({ ...loginForm, [name]: value });
    },
    [loginForm]
  );

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={loginForm?.email}
            onChange={handleFormInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginForm?.password}
            onChange={handleFormInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
