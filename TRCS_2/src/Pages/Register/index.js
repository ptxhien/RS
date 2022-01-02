import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

import bg3 from "../../assets/utils/images/originals/citynights.jpg";

import { Col, Row, Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import MultiStep from "../Forms/Elements/Wizard/Wizard";
import Step1 from "./Steps/step1";
import Step2 from "./Steps/step2";
import Step3 from "./Steps/step3";
import { GetAllLanguageAction, GetAllTechnologyAction, GetFreeTimeAction } from "../../redux/masterdata/masterDataAction";
import { registerAction } from "../../redux/actions/account/accountAction";

export default function Register() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        initialSlide: 0,
        autoplay: true,
        adaptiveHeight: true,
    };

    const dispatch = useDispatch();

    const [DTO, setDTO] = useState({
        email: "",
        password: "",
        fullname: "",
        phone: "",
        address: "",
        gender: "",
        learnerLevel: "",
        language: "",
        jobNow: "",
        technologySkill: "",
        feeMax: "",
        freeTime: ""
    })

    const steps = [
        { name: "Account Information", component: <Step1 DTO={DTO} setDTO={setDTO} /> },
        { name: "Payment Information", component: <Step2 DTO={DTO} setDTO={setDTO} /> },
        { name: "Finish Wizard", component: <Step3 DTO={DTO} onClickRegister={onClickRegister} /> },
    ];

    useEffect(() => {
        dispatch(GetAllLanguageAction())
        dispatch(GetAllTechnologyAction())
        dispatch(GetFreeTimeAction())
    }, [])

    function onClickRegister() {
        dispatch(registerAction(DTO));
    }
    return (
        <Fragment>
            <div className="h-100">
                <Row className="h-100 no-gutters">
                    {/* <Col lg="7" md="12" className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center">
                        <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                            <div className="app-logo" />
                            <h4>
                                <div>Welcome,</div>
                                <span>
                                    It only takes a{" "}
                                    <span className="text-success">few seconds</span> to create
                                    your account
                                </span>
                            </h4>
                            <div>
                                <Form>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleEmail">
                                                    <span className="text-danger">*</span> Email
                                                </Label>
                                                <Input type="email" name="email" id="exampleEmail" placeholder="Email here..." />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleName">Name</Label>
                                                <Input type="text" name="text" id="exampleName" placeholder="Name here..." />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="examplePassword">
                                                    <span className="text-danger">*</span> Password
                                                </Label>
                                                <Input type="password" name="password" id="examplePassword" placeholder="Password here..." />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="examplePasswordRep">
                                                    <span className="text-danger">*</span> Repeat
                                                    Password
                                                </Label>
                                                <Input type="password" name="passwordrep" id="examplePasswordRep" placeholder="Repeat Password here..." />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup className="mt-3" check>
                                        <Input type="checkbox" name="check" id="exampleCheck" />
                                        <Label for="exampleCheck" check>
                                            Accept our{" "}
                                            <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()}>
                                                Terms and Conditions
                                            </a>
                                            .
                                        </Label>
                                    </FormGroup>
                                    <div className="mt-4 d-flex align-items-center">
                                        <h5 className="mb-0">
                                            Already have an account?{" "}
                                            <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()} className="text-primary">
                                                Sign in
                                            </a>
                                        </h5>
                                        <div className="ml-auto">
                                            <Button color="primary" className="btn-wide btn-pill btn-shadow btn-hover-shine" size="lg">
                                                Create Account
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Col> */}
                    <Col lg="7" md="12" className="h-100">
                        <Card className="main-card mb-3 h-100 ">
                            <CardBody>
                                <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                                    <div className="app-logo" />
                                    <h4>
                                        <div>Welcome,</div>
                                        <span>
                                            It only takes a{" "}
                                            <span className="text-success">few seconds</span> to create
                                            your account
                                        </span>
                                    </h4>
                                </Col>
                                <MultiStep showNavigation={true} steps={steps} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="5" className="d-lg-flex d-xs-none">
                        <div className="slider-light">
                            <Slider {...settings}>
                                <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                    <div className="slide-img-bg"
                                        style={{
                                            backgroundImage: "url(" + bg3 + ")",
                                        }} />
                                    <div className="slider-content">
                                        <h3>Scalable, Modular, Consistent</h3>
                                        <p>
                                            Easily exclude the components you don't require.
                                            Lightweight, consistent Bootstrap based styles across
                                            all elements and components
                                        </p>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </Col>

                </Row>
            </div>
        </Fragment>
    )
}
