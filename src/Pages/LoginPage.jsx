import React from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoginImg from "../Images/loginImg.png";

function LoginPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        sessionStorage.setItem("username", data.usernameOrEmail);
        navigate("/home");
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-[#FFFFFF]">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 col-lg-5">
                        <Card className="p-4 border-0 mx-auto" style={{ maxWidth: "400px" }}>
                            <div className="text-left mb-4">
                                <h2 className="mb-2 text-left">Sign In</h2>
                                <p className="text-left">
                                    New user?{" "}
                                    <a href="#" className="text-primary">
                                        Create an account
                                    </a>
                                </p>
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3" controlId="usernameOrEmail">
                                    <Form.Label>Username or email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username or email"
                                        {...register("usernameOrEmail", {
                                            required: "This field is required",
                                        })}
                                        isInvalid={errors.usernameOrEmail}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.usernameOrEmail?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        {...register("password", {
                                            required: "Password is required",
                                            pattern: {
                                                value:
                                                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message:
                                                    "Password must be at least 8 characters long, with 1 capital letter, 1 number, and 1 symbol",
                                            },
                                        })}
                                        isInvalid={errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="keepMeSignedIn">
                                    <Form.Check
                                        type="checkbox"
                                        label="Keep me signed in"
                                        {...register("keepMeSignedIn")}
                                    />
                                </Form.Group>

                                <Button type="submit" variant="dark" className="w-100 mb-3">
                                    Sign In
                                </Button>
                            </Form>

                            <div className="text-center my-2">
                                <Row className="align-items-center">
                                    <Col><hr /></Col>
                                    <Col xs="auto"><p className="m-0 custom-text">Or Sign In With</p>    </Col>
                                    <Col><hr /></Col>
                                </Row>

                                <div className="d-flex justify-content-center gap-3  pt-3">
                                    <FaGoogle size={40} className="text-muted cursor-pointer border border-dark rounded-circle p-2" />
                                    <FaFacebook size={40} className="text-muted cursor-pointer border border-dark rounded-circle p-2" />
                                    <FaLinkedin size={40} className="text-muted cursor-pointer border border-dark rounded-circle p-2" />
                                    <FaTwitter size={40} className="text-muted cursor-pointer border border-dark rounded-circle p-2" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Section: Illustration */}
                    <div className="col-md-6 d-none d-md-flex justify-content-center">
                        <img
                            src={LoginImg}
                            alt="Illustration"
                            className="img-fluid w-40"
                        />
                    </div>
                </div>
            </div>
            <style jsx>{`
      .custom-text {
  font-family: 'Noto Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0.03em;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
 `}</style>
        </div>
    );
};

export default LoginPage;
