import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, TabPane, CardTitle, CardSubtitle, CardLink, CardFooter } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faHeart } from "@fortawesome/free-solid-svg-icons";
import { IoIosAnalytics } from "react-icons/io";
import { ResponsiveContainer } from "recharts";
import ThemeOptions from "../../Layout/ThemeOptions";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import { CANCELED } from "dropzone";
import { GetJobAction } from "../../redux/masterdata/masterDataAction";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../Home/style.css"
import { UncontrolledCarousel } from "reactstrap";
// import image1 from "../../assets/utils/images/dropdown-header/abstract1.jpg";
// import image2 from "../../assets/utils/images/dropdown-header/abstract2.jpg";
// import image3 from "../../assets/utils/images/dropdown-header/abstract3.jpg";

import image1 from "../../assets/images/slider-img2.jpg";
import image2 from "../../assets/images/slider-img2.jpg";
import image3 from "../../assets/images/slider-img2.jpg";
import dummyData from './dummyData.json'
import Rating from "react-rating";
import ReactTooltip from 'react-tooltip';

const items = [
    {
        id: 1,
        src: image1,
        altText: "Slide 1",
        caption: "Slide 1",
    },
    {
        id: 2,
        src: image2,
        altText: "Slide 2",
        caption: "Slide 2",
    },
    {
        id: 3,
        src: image3,
        altText: "Slide 3",
        caption: "Slide 3",
    },
];

const CarouselDefault = () => <UncontrolledCarousel style={{ height: "100px !important" }} items={items} />;

export default function HomePage() {
    const dispatch = useDispatch();
    const { lsJob } = useSelector((state) => state.masterdataReducer);
    console.log(dummyData);

    const [onLineCourse, setonLineCourse] = useState([])
    const [offLineCourse, setoffLineCourse] = useState([])

    useEffect(() => {
        dispatch(GetJobAction())
        setonLineCourse(dummyData.dict_f.Online)
        setoffLineCourse(dummyData.dict_f.Offline)
    }, [])

    console.log(onLineCourse)
    console.log(offLineCourse)



    return (
        <Fragment>
            <ThemeOptions />
            <AppHeader />
            <CarouselDefault></CarouselDefault>

            {/* < div className="app-main"> */}
            {/* <AppSidebar /> */}
            {/* <div className="app-main__outer"> */}
            <div className="app-main__inner">
                <Fragment>
                    <Card>
                        <CardBody>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="exampleName">Job</Label>
                                        <Select isMulti components={makeAnimated()}
                                            closeMenuOnSelect={false}
                                            getOptionLabel={option => option.Name}
                                            getOptionValue={option => option.Value}
                                            options={lsJob} className="basic-multi-select" classNamePrefix="select"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="exampleName">Online/OffLine</Label>
                                        <Input type="select">
                                            <option value={""}></option>
                                            <option value={"Online"}>Online</option>
                                            <option value={"OffLine"}>OffLine</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="exampleName">Duration</Label>
                                        <Input type="select">
                                            <option value={""}></option>
                                            <option value={"01-03"}>3 Months</option>
                                            <option value={"01-06"}>6 Months</option>
                                            <option value={"01-09"}>9 Months</option>
                                            <option value={"01-12"}>12 Months</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    <FormGroup>
                                        <Button outline color="primary" style={{ marginTop: "30px" }}>Recommenders</Button>
                                    </FormGroup>
                                </Col>

                            </Row>
                        </CardBody>
                    </Card>
                    <div className="app-main__outer">
                        <div className="app-main__inner mt-2">
                            <Card>
                                <CardBody>
                                    <Row>
                                        {
                                            onLineCourse.map((item, index) => {
                                                return (
                                                    <Col lg="12" xl="3">
                                                        <Card data-tip data-for={item.courseTitle} body className="card-shadow-primary border mb-3" outline color="primary" style={{ height: "500px" }}>
                                                            <CardBody title={item.courseTitle}>

                                                                <CardTitle title={item.courseTitle}>
                                                                    {item.courseTitle && item.courseTitle.length > 50 ? item.courseTitle.substring(0, 49) + "..." : item.courseTitle}
                                                                </CardTitle>
                                                                <CardSubtitle className="mb-0">{item.provider}</CardSubtitle>
                                                                <span className="mr-1 text-success">
                                                                    {item.rating ? item.rating : 0}/5
                                                                </span>
                                                                <Rating stop={5} initialRating={item.rating}
                                                                    emptySymbol={
                                                                        <span className="mr-1 opacity-2">
                                                                            <FontAwesomeIcon size="1x" icon={faHeart} color="red" />
                                                                        </span>
                                                                    }
                                                                    fullSymbol={
                                                                        <span className="mr-1">
                                                                            <FontAwesomeIcon size="1x" icon={faHeart} color="red" />
                                                                        </span>
                                                                    } />
                                                                <span className="text-info">({item.peopleRating ? item.peopleRating : 0})</span>
                                                            </CardBody>
                                                            <CardBody>
                                                                <img src={image1} width={"100%"}></img>
                                                                Some quick example text to build on the card title and make
                                                                up the bulk of the card's content.
                                                                <CardLink href="#">Card Link</CardLink>
                                                                <CardLink href="#">Another Link</CardLink>
                                                            </CardBody>
                                                        </Card>
                                                        <ReactTooltip id={item.courseTitle} aria-haspopup='true' role='example' className="customeTheme">
                                                            <Card style={{ width: "34rem" }}>
                                                                <CardBody className="text-dark">
                                                                    <CardTitle>
                                                                        {item.courseTitle}
                                                                    </CardTitle>
                                                                    <CardSubtitle className="mb-0">{item.provider}</CardSubtitle>
                                                                    <Row>
                                                                        <Col lg={12}>
                                                                            {
                                                                                item.language.split(',').map((_lan, _index) => {
                                                                                    return (
                                                                                        <span className="badge badge-pill badge-light">{_lan}</span>
                                                                                    )
                                                                                })
                                                                            }
                                                                            <br />
                                                                            {
                                                                                item.technologySkill.split(',').map((_tech, _index) => {
                                                                                    return (
                                                                                        <span className={_index % 3 == 0 ?
                                                                                            "badge badge-pill badge-success mr-1"
                                                                                            : _index % 2 || _index % 6 == 0 ? "badge badge-pill badge-warning mr-1"
                                                                                                : "badge badge-pill badge-danger mr-1"}>{_tech}</span>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Col>
                                                                    </Row>

                                                                    <Row className="mt-2">
                                                                        <Col lg={12}>
                                                                            <Button hidden={!item.City} className="mb-2 mr-2 btn-icon btn-icon-only btn-shadow btn-dashed" outline color="info">
                                                                                <i className="pe-7s-map btn-icon-wrapper mr-2"> </i>
                                                                                {item.City}
                                                                            </Button>

                                                                            <Button hidden={!item.duration} className="mb-2 mr-2 btn-icon btn-icon-only btn-shadow btn-dashed" outline color="primary">
                                                                                <i className="pe-7s-timer btn-icon-wrapper mr-2"> </i>
                                                                                {item.duration}
                                                                            </Button>

                                                                            <Button hidden={!item.numStudent} className="mb-2 mr-2 btn-icon btn-icon-only btn-shadow btn-dashed" outline color="success">
                                                                                <i className="pe-7s-study btn-icon-wrapper mr-2"> </i>
                                                                                {item.numStudent}
                                                                            </Button>

                                                                            <Button hidden={!item.level} className="mb-2 mr-2 btn-icon btn-icon-only btn-shadow btn-dashed" outline color="danger">
                                                                                <i className="pe-7s-diamond btn-icon-wrapper mr-2"> </i>
                                                                                {item.level}
                                                                            </Button>

                                                                        </Col>
                                                                    </Row>

                                                                    <p>
                                                                        {item.outcomeLearning}
                                                                    </p>
                                                                    <div className="text-center">
                                                                        <Button className="btn-wide mb-2 mr-2 btn-icon" outline size="lg" color="primary">
                                                                            <i className="pe-7s-cash btn-icon-wrapper"> </i>
                                                                            {item.feeVND == 0 ? "Free" : item.feeVND + " VNĐ"}
                                                                        </Button>
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        </ReactTooltip>
                                                    </Col>

                                                )
                                            })
                                        }
                                    </Row>


                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </Fragment>
            </div>
            {/* </div> */}
            {/* </div> */}
        </Fragment>
    )
}
