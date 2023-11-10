import { useState } from "react";
import { Box, Title, Content, Img, Span, Line, Wrapper, Text } from "./style";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import useRequest from "../../hooks/useRequest";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { MD5 } from "crypto-js";
import { API_URL } from "../../util/api";
import { useRegister } from "../../context/context";

const Register = ({ signin }) => {
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
    message: '',
    status: null,
  });
  const { setUser } = useRegister();
  const [loading, setLoading] = useState(false);

  const { open, vertical, horizontal, message, status } = state;

  const request = useRequest();
  const navigate = useNavigate();

  const handleClose = () => setState({ ...state, open: false });

  const onSignUp = async (e) => {
    e.preventDefault()
    setLoading(true);
    const data = e.target.elements;

    const raw = {
      name: data.name.value,
      email: data.email.value,
      key: data.username.value,
      secret: data.password.value,
    };


    const options = {
      url: `/signup`,
      method: "POST",
      raw
    }
    let headers = new Headers();
    headers.append("Key", data.username.value.toString());
    headers.append("Sign", MD5(options.method + options.url + JSON.stringify(raw) + raw.secret).toString());

    request({
      ...options,
      headers,

    }).then((res) => {
      console.log(res);
      setLoading(false);
      if (res.isOk) {
        setState({ ...state, open: true, message: 'Successfully registered!', status: 'success' })
        navigate("/signin");
      } else {
        if (res.message.includes("key")) res.message = "User with this username already exists"
        setState({ ...state, open: true, message: res.message, status: 'error' })
      }
    }).catch((err) => {
      setLoading(false);
      console.log(err);

    });
  };

  const onSignIn = async (e) => {
    e.preventDefault()
    setLoading(true);
    const data = e.target.elements;
    const options = {
      url: `/myself`,
      method: "GET",
    }
    const headers = new Headers();
    headers.append("Key", data.username.value.toString());
    headers.append("Sign", MD5(options.method + options.url + data.password.value).toString());

    fetch(`${API_URL + options.url}`, {
      method: options.method,
      headers,
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setLoading(false);
        if (result.isOk) {
          setUser(result.data)
          navigate("/");
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error)
      });

  }
  return (
    <Box>
      <Title>Sign {signin ? 'in' : 'up'}</Title>
      <Content>
        <Button variant="outlined" color="primary">
          <Img src="/icons/google.svg" alt="google" /> Continue with Google
        </Button>
        <Button variant="outlined" color="primary">
          <Img src="/icons/facebook.svg" alt="facebook" /> Continue with Facebook
        </Button>
      </Content>

      <Wrapper>
        <Line />
        <Span>OR</Span>
        <Line />
      </Wrapper>

      <form onSubmit={signin ? onSignIn : onSignUp}>
        <Content gap="15px">
          {
            !signin &&
            <>
              <TextField required size="small" name="name" variant="standard" label="Your name" />
              <TextField required size="small" name="email" variant="standard" label="Your email" />
            </>
          }
          <TextField required size="small" name="username" variant="standard" label="Your username" />
          <TextField required size="small" name="password" variant="standard" label="Your password" type="password" />

          <LoadingButton color="secondary" variant="contained" type="submit" loading={loading}>Submit</LoadingButton>
          {
            signin ?
              <Text>You have not account yet? Go to <Link to="/signup">sign up</Link></Text> :
              <Text>Already signed up? Go to <Link to="/signin">sign in</Link></Text>
          }
        </Content>
      </form>


      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
        autoHideDuration={3000}
      >
        <Alert severity={status} variant="filled">{message}</Alert>
      </Snackbar>

    </Box>
  );
};

Register.propTypes = {
  signin: PropTypes.any,
}


export default Register