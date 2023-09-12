import React, { useState } from "react";
import axios from "axios";
import ColorPicker from "@vtaits/react-color-picker";
import "@vtaits/react-color-picker/dist/index.css";
import icons from "./free-icon.json";
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

const AddPrebuiltContents = () => {
  document.title = " Pre-built Contents | Marketing tool platform";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [textColorEnable, setTextColorEnable] = useState(false);
  const [textColor, setTextColor] = useState("#343a40");
  const [textContent, setTextContent] = useState("");
  const [selectedIconPrefix, setSelectedIconPrefix] = useState("fas");
  const [selectedIconValue, setSelectedIconValue] = useState("message");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");

  const [errors, setErrors] = useState(null);

  const closeTextColorPicker = () => {
    setTextColorEnable(false);
  };

  const onDragTextColor = (color) => {
    setTextColor(color);
  };

  const handleSelectedIcon = (e) => {
    const splitIcon = e.target.value.split(" ");
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
          textColor: textColor,
          textContent: textContent,
          icon: selectedIconPrefix + " " + selectedIconValue,
          description: description,
          destination: destination,
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
                    <Col md={2}>
                      <div>
                        <Label>Text color</Label>
                        <div className="d-flex gap-2">
                          <Input
                            type="text"
                            className="colorpicker-default"
                            value={textColor}
                            readOnly
                          />
                          <div
                            onClick={() => {
                              setTextColorEnable(!textColorEnable);
                            }}
                            className="btn"
                            style={{
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
                    <Col md={2}>
                      <Label>Icon</Label>
                      <select
                        className="form-select"
                        id="floatingSelectGrid"
                        aria-label="Floating label select example"
                        onChange={handleSelectedIcon}
                      >
                        {icons &&
                          icons.data.map((icon, index) => {
                            return (
                              <option key={index} value={icon}>
                                {icon}
                              </option>
                            );
                          })}
                      </select>
                      {errors && (
                        <small className="text-danger">{errors.icon}</small>
                      )}
                    </Col>
                    <Col md={2}>
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
                  className="btn btn-success"
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
