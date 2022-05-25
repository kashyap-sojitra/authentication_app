import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { login, register } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
// import { GoogleLogin } from 'react-google-login';
// import GoogleButton from 'react-google-button'
import "./LoginScreen.css";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  let navigate = useNavigate();   
  useEffect(() => {
    
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };


  // const responseGoogle = (response) => {
  //   console.log(response);
  //   const result = response.profileObj;
  //   const token = response.tokenId;

  //   try {
  //     dispatch(register(result, token));

  //     navigate('/home');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const googleError = (error) => {
  //   console.log(error);
  //   alert('Google Sign In was unsuccessful. Try again later');
  // }

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{marginTop:"20px"}}>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button style={{marginTop:"20px"}} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {/* <GoogleLogin
            clientId="631145219788-eau991k299ru3o4qbaihhlgak5vavmos.apps.googleusercontent.com"
            render={(renderProps) => (
              <GoogleButton style={{marginTop:"20px"}} onClick={renderProps.onClick} >
                Google Sign In
              </GoogleButton>
            )}
            onSuccess={responseGoogle}
            onFailure={googleError}
            cookiePolicy={'single_host_origin'}
          /> */}
        <Row className="py-3">
          
          <Col>
            New User ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen;