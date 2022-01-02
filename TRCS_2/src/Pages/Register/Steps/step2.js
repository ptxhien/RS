import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Combobox } from "react-widgets";
import { FormGroup, Label, CustomInput, Input, Col, Form, FormText } from "reactstrap";
import { GetAllLanguageAction } from "../../../redux/masterdata/masterDataAction";
import Select from "react-select";
import makeAnimated from "react-select/animated";


export default function WizardStep2({ DTO, setDTO }) {
    const { lsLanguage } = useSelector((state) => state.masterdataReducer);
    const { lsTechnology } = useSelector((state) => state.masterdataReducer);
    const { lsFreeTime } = useSelector((state) => state.masterdataReducer);

    const [techSkill, settechSkill] = useState([])
    const [language, setlanguage] = useState([])
    const [freeTime, setfreeTime] = useState([])

    const [address, setaddress] = useState({
        city: "",
        ward: "",
        district: ""
    })

    useEffect(() => {
        setDTO({ ...DTO, address: address.ward + " ward " + address.district + " district " + address.city + " city" })
    }, [address])

    useEffect(() => {
        var str = ""
        techSkill.forEach(element => {
            str += element.techName + ", "
        });
        if (str) {
            setDTO({ ...DTO, technologySkill: str })
        }
    }, [techSkill])

    useEffect(() => {
        var str = ""
        language.forEach(element => {
            str += element.lanName + ", "
        });
        if (str) {
            setDTO({ ...DTO, language: str })
        }
    }, [language])

    useEffect(() => {
        var str = ""
        freeTime.forEach(element => {
            str += element.Name + ", "
        });
        if (str) {
            setDTO({ ...DTO, freeTime: str })
        }
    }, [freeTime])

    return (
        <Fragment>
            <div className="form-wizard-content">
                <Form>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>
                            What do you do?
                        </Label>
                        <Col sm={10}>
                            <Input type="select" value={DTO.jobNow} onChange={(e) => setDTO({ ...DTO, jobNow: e.target.value })}>
                                <option value={"work"}>I am working</option>
                                <option value={"study"}>I am a student</option>
                                <option value={""}>I am a freelancer</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={2}>
                            What is your degree?
                        </Label>
                        <Col sm={10}>
                            <Input type="select" value={DTO.learnerLevel} onChange={(e) => setDTO({ ...DTO, learnerLevel: e.target.value })}>
                                <option value={""}>Please choose your degree</option>
                                <option value={"Bachelor"}>Bachelor</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleSelect" sm={2}>
                            Where do you live?
                        </Label>
                        <Col sm={3}>
                            <Input type="select" value={address.city} onChange={(e) => setaddress({ ...address, city: e.target.value })}>
                                <option value={""}>Please choose City</option>
                                <option value={"Hồ Chí Minh"}>Hồ Chí Minh</option>
                            </Input>
                        </Col>
                        <Col sm={3}>
                            <Input type="select" value={address.district} onChange={(e) => setaddress({ ...address, district: e.target.value })}>
                                <option value={""}>Please choose District</option>

                                <option value={"Bình Tân"}>Bình Tân</option>
                            </Input>
                        </Col>
                        <Col sm={3}>
                            <Input type="select" value={address.ward} onChange={(e) => setaddress({ ...address, ward: e.target.value })}>
                                <option value={""}>Please choose Ward</option>
                                <option value={"Bình Trị Đông"}>Bình Trị Đông</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleSelectMulti" sm={2}>
                            What languages do you know?
                        </Label>
                        <Col sm={10}>
                            <Select isMulti components={makeAnimated()}
                                closeMenuOnSelect={false}
                                getOptionLabel={option => option.lanName}
                                getOptionValue={option => option.lanName}
                                options={lsLanguage} className="basic-multi-select" classNamePrefix="select"
                                value={language}
                                onChange={(value) => {
                                    setlanguage(value)
                                }}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleSelectMulti" sm={2}>
                            What skills do you know?
                        </Label>
                        <Col sm={10}>
                            <Select isMulti components={makeAnimated()}
                                closeMenuOnSelect={false}
                                getOptionLabel={option => option.techName}
                                getOptionValue={option => option.techName}
                                options={lsTechnology} className="basic-multi-select" classNamePrefix="select"
                                value={techSkill}
                                onChange={(value) => {
                                    settechSkill(value)
                                }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={2}>
                            How much can you spend on courses?
                        </Label>
                        <Col sm={10}>
                            <Input type="select" value={DTO.feeMax} onChange={(e) => setDTO({ ...DTO, feeMax: e.target.value })}>
                                <option value={""}></option>
                                <option value={"less than 5 millions"}>Less than 5 millions</option>
                                <option value={"5 milions to 15 millions"}>5 milions to 15 millions</option>
                                <option value={"15 milions to 30 millions"}>15 milions to 30 millions</option>
                                <option value={"more than 30 milions"}>More than 30 milions</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleSelectMulti" sm={2}>
                            What time is right for you, if we have an offline courses?
                        </Label>
                        <Col sm={10}>
                            <Select isMulti components={makeAnimated()}
                                closeMenuOnSelect={false}
                                getOptionLabel={option => option.Name}
                                getOptionValue={option => option.Name}
                                options={lsFreeTime} className="basic-multi-select" classNamePrefix="select"
                                value={freeTime}
                                onChange={(value) => {
                                    setfreeTime(value)
                                }}
                            />
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        </Fragment>
    )
}
