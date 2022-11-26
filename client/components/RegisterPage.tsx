import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useRegisterUserMutation } from "../redux/api/authApi";
import { useEffect } from "react";
import { setUser } from "../redux/features/authSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { setCookie } from "nookies";

const initialState = {
  email: "",
  password: "",
};

export const RegisterPage: React.FC = () => {
  {
    const [formValue, setFormValue] = useState(initialState);
    const { email, password } = formValue;

    const [
      registerUser,
      {
        data: registerData,
        isSuccess: isRegisterSuccess,
        isError: isRegisterError,
        error: registerError,
      },
    ] = useRegisterUserMutation();

    const dispatch = useAppDispatch();

    const router = useRouter();

    const handleChange = (e: any) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
      if (password && email) {
        await registerUser({ email, password });
      }
    };
    useEffect(() => {
      if (isRegisterSuccess) {
        dispatch(
          setUser({
            access_token: registerData.access_token,
            refresh_token: registerData.refresh_token,
          })
        );
        setCookie(undefined, "access_token", registerData.access_token, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        setCookie(undefined, "refresh_token", registerData.access_token, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        router.push("/");
      }
    }, [isRegisterSuccess]);

    useEffect(() => {
      if (isRegisterError) {
        alert("error register");
      }
    }, [isRegisterError]);

    return (
      <Container>
        <Card className="mt-5">
          <Card.Body>
            <h1>Register</h1>
            <Row>
              <Col>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group className=" mt-4">
                        <Row>
                          <Col md="3">
                            <Form.Label>Username :</Form.Label>
                          </Col>
                          <Col>
                            {" "}
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
                      <Button onClick={() => handleRegister()}>Register</Button>
                    </Col>
                    <Col md="12">
                      <Link href={"/login"}>Already have an account?</Link>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};
