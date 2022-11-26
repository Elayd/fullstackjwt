import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useLoginUserMutation } from "../redux/api/authApi";
import { useEffect } from "react";
import { setUser } from "../redux/features/authSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { setCookie } from "nookies";

const initialState = {
  email: "",
  password: "",
};

export const AuthPage: React.FC = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else {
      alert("error");
    }
  };
  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(
        setUser({
          access_token: loginData.access_token,
          refresh_token: loginData.refresh_token,
        })
      );
      setCookie(undefined, "access_token", loginData.access_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "refresh_token", loginData.refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      router.push("/");
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (isLoginError) {
      console.log("1");
    }
  }, [isLoginError]);

  return (
    <Container>
      <Card className="mt-5">
        <Card.Body>
          <Row>
            <h1>Login</h1>
            <Col>
              <Form>
                <Row>
                  <Col md="12">
                    <Form.Group
                      className=" mt-4"
                      controlId="validationFormikUsername"
                    >
                      <Row>
                        <Col md="3">
                          <Form.Label>Username :</Form.Label>
                        </Col>
                        <Col>
                          <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md="12" className=" mt-4">
                    <Form.Group>
                      <Row>
                        <Col md="3">
                          <Form.Label>Password :</Form.Label>
                        </Col>
                        <Col>
                          <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md="12" className="mt-5">
                    <Button onClick={() => handleLogin()}>Login</Button>
                  </Col>

                  <Col md="12">
                    <Link href={"/register"}>Don't have an account?</Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
