import React, { useEffect, useState } from "react";
import axios from "axios";
import ColorPicker from "@vtaits/react-color-picker";
import "@vtaits/react-color-picker/dist/index.css";
import icons from "../../../../../assets/icons/free-icon.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  CardTitle,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import "./datatables.scss";
import ClickAwayListener from "react-click-away-listener";
import Select, { components } from "react-select";

const AddPrebuiltContents = () => {
  const { Option } = components;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [width, setWidth] = useState(null);

  const [errorName, setErrorName] = useState("");
  const [name, setName] = useState("");

  const [textColorEnable, setTextColorEnable] = useState(false);
  const [textColor, setTextColor] = useState("#343a40");
  const [textContent, setTextContent] = useState("");
  const [selectedIconPrefix, setSelectedIconPrefix] = useState("fab");
  const [selectedIconValue, setSelectedIconValue] = useState("fa-facebook");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [myClass, setMyClass] = useState("");
  const [selectedIconShow, setSelectedIconShow] = useState({
    label: "fab fa-facebook",
    value: "fab fa-facebook",
  });
  const [iconOptions, setIconOptions] = useState([]);

  const [errors, setErrors] = useState(null);

  const closeTextColorPicker = () => {
    setTextColorEnable(false);
  };

  const onDragTextColor = (color) => {
    setTextColor(color);
  };

  const OptionWithIcon = (props) => {
    const { onIconSelect } = props.selectProps;
    return (
      <Option {...props}>
        <div
          onMouseDown={() => onIconSelect(props.data.value)}
          className="d-flex gap-2 align-items-center"
        >
          <FontAwesomeIcon icon={props.data.value} />
          {props.data.value}
        </div>
      </Option>
    );
  };

  useEffect(() => {
    const options = [];
    icons.data.map((icon) => options.push({ label: icon, value: icon }));
    setIconOptions(options);
  }, []);

  const handleSelectedIcon = (value) => {
    const splitIcon = value.split(" ");
    setSelectedIconShow({ label: value, value: value });
    setSelectedIconPrefix(splitIcon[0]);
    setSelectedIconValue(splitIcon[1]);
  };

  const createPrebuiltContent = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${productId}/prebuilt-contents`,
        {
          name: name,
          textColor: textColor,
          textContent: textContent,
          icon: selectedIconPrefix + " " + selectedIconValue,
          description: description,
          destination: destination,
          myClass: myClass,
        },
        { headers }
      );

      console.log(response);

      navigate("/product/" + productId + "/pre-built/contents");
    } catch (error) {
      console.log(error.response.data.errors);

      const thisErrors = {};
      for (let i = 0; i < error.response.data.errors.length; i++) {
        console.log(error.response.data.errors[i].key);
        thisErrors[error.response.data.errors[i].key] =
          error.response.data.errors[i].message;
      }

      setErrors(thisErrors);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="d-flex justify-content-between mb-2">
            <h4>{t("Add Pre-built Contents")}</h4>
          </div>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>
                    <div className="d-flex justify-content-between">
                      <span>Detail</span>
                    </div>
                  </CardTitle>
                  <Row>
                    <Col className="mb-4" md={3}>
                      <Label>Name</Label>
                      <Input
                        className="form-control"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      ></Input>
                      {errors && (
                        <small className="text-danger">{errors.name}</small>
                      )}
                    </Col>
                    <Col md={3}>
                      <div>
                        <Label>Text color</Label>
                        <div className="d-flex gap-2">
                          <Input
                            type="text"
                            className="colorpicker-default"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            maxLength={7}
                          />
                          <div
                            onClick={() => {
                              setTextColorEnable(!textColorEnable);
                            }}
                            className="btn"
                            style={{
                              border: "1px rgb(206, 212, 218) solid",
                              backgroundColor: textColor,
                              width: 40,
                              height: 40,
                            }}
                          ></div>
                          {textColorEnable ? (
                            <ClickAwayListener
                              onClickAway={closeTextColorPicker}
                            >
                              <>
                                <ColorPicker
                                  style={{
                                    position: "absolute",
                                    right: 10,
                                    marginTop: "2.8rem",
                                    zIndex: 500,
                                  }}
                                  saturationHeight={100}
                                  saturationWidth={100}
                                  value={textColor}
                                  onDrag={onDragTextColor}
                                />
                              </>
                            </ClickAwayListener>
                          ) : null}
                        </div>
                        {errors && (
                          <small className="text-danger">
                            {errors.textColor}
                          </small>
                        )}
                      </div>
                    </Col>
                    <Col md={3}>
                      <Label>Icon</Label>
                      <div className="form-floating mb-3">
                        <div className="d-flex gap-1 align-items-center">
                          <div
                            style={{
                              background: "#5865f2",
                              color: "white",
                              width: 35,
                              height: 35,
                            }}
                            className="rounded d-flex align-items-center justify-content-center p-2"
                          >
                            <FontAwesomeIcon
                              size="lg"
                              icon={[selectedIconPrefix, selectedIconValue]}
                            />
                          </div>
                          <div className="w-100">
                            <Select
                              value={selectedIconShow}
                              onIconSelect={(value) => {
                                handleSelectedIcon(value);
                              }}
                              options={iconOptions}
                              components={{ Option: OptionWithIcon }}
                            />
                          </div>
                        </div>
                      </div>
                      {errors && (
                        <small className="text-danger">{errors.icon}</small>
                      )}
                    </Col>
                    <Col md={3}>
                      <Label>Text</Label>
                      <Input
                        className="form-control"
                        placeholder="Text"
                        onChange={(e) => setTextContent(e.target.value)}
                        value={textContent}
                      ></Input>
                      {errors && (
                        <small className="text-danger">
                          {errors.textContent}
                        </small>
                      )}
                    </Col>
                    <Col md={3}>
                      <Label>Description</Label>
                      <Input
                        className="form-control"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      ></Input>
                      {errors && (
                        <small className="text-danger">
                          {errors.description}
                        </small>
                      )}
                    </Col>
                    <Col md={3}>
                      <Label>Destination</Label>
                      <Input
                        className="form-control"
                        placeholder="Destination"
                        onChange={(e) => setDestination(e.target.value)}
                        value={destination}
                      ></Input>
                      {errors && (
                        <small className="text-danger">
                          {errors.destination}
                        </small>
                      )}
                    </Col>
                    <Col md={3}>
                      <Label>Class</Label>
                      <Input
                        className="form-control"
                        placeholder="Class"
                        onChange={(e) => setMyClass(e.target.value)}
                        value={myClass}
                      ></Input>
                      {errors && (
                        <small className="text-danger">{errors.myClass}</small>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="d-grid gap-2">
                <Button
                  onClick={createPrebuiltContent}
                  type="button"
                  className="btn btn-primary"
                >
                  Create Pre-built Contents
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddPrebuiltContents;
