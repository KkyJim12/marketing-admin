import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import icons from "./free-icon.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickAwayListener from "react-click-away-listener";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  Input,
  Button,
} from "reactstrap";
import ColorPicker from "@vtaits/react-color-picker";
import "@vtaits/react-color-picker/dist/index.css";

const AddPrebuiltProduct = () => {
  document.title = " My Product | Marketing tool platform";

  const { productId } = useParams();
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("Minible");
  const [backgroundColorEnable, setBackgroundColorEnable] = useState(false);
  const [bodyColorEnable, setBodyColorEnable] = useState(false);
  const [textColorEnable, setTextColorEnable] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
  const [bodyColor, setBodyColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#f5f5f5");
  const [buttonSize, setButtonSize] = useState(75);

  const [buttonPositionTop, setButtonPositionTop] = useState(null);
  const [buttonPositionRight, setButtonPositionRight] = useState(10);
  const [buttonPositionBottom, setButtonPositionBottom] = useState(20);
  const [buttonPositionLeft, setButtonPositionLeft] = useState(null);

  const [iconInput, setIconInput] = useState("font-awesome");
  const [isPCChecked, setIsPCChecked] = useState(true);
  const [isTabletChecked, setIsTabletChecked] = useState(true);
  const [isMobileChecked, setIsMobileChecked] = useState(true);
  const [floatingActionButton, setFloatingActionButton] = useState(false);

  const [uploadedIcon, setUploadedIcon] = useState("");
  const [uploadedIconUrl, setUploadedIconUrl] = useState("");
  const [previewUploadedIcon, setPreviewUploadedIcon] = useState("");

  const [selectedIconPrefix, setSelectedIconPrefix] = useState("fas");
  const [selectedIconValue, setSelectedIconValue] = useState("message");

  const buttonStyles = [
    "Rounded Button",
    "Rounded Button With Text",
    "Long Rounded Button#1",
    "Long Rounded Button#2",
  ];
  const [selectedButtonStyle, setSelectedButtonStyle] =
    useState("Rounded Button");

  const contacts = [
    { id: 1, title: "Email", icon: "fast-mail-alt" },
    { id: 2, title: "Phone", icon: "phone" },
    { id: 3, title: "Line", icon: "line" },
    { id: 4, title: "Facebook", icon: "facebook" },
    { id: 5, title: "Youtube", icon: "youtube" },
  ];

  const handleUploadIcon = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadedIcon(undefined);
      return;
    }

    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/images`,
        formData,
        { headers }
      );
      setUploadedIconUrl(response.data.data);
    } catch (error) {
      console.log(error);
    }

    setUploadedIcon(e.target.files[0]);
  };

  useEffect(() => {
    if (!uploadedIcon) {
      setPreviewUploadedIcon(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(uploadedIcon);
    setPreviewUploadedIcon(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedIcon]);

  const createPrebuiltButton = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${productId}/prebuilt-buttons`,
        {
          buttonStyle: selectedButtonStyle,
          backgroundColor: backgroundColor,
          bodyColor: bodyColor,
          textColor: textColor,
          textContent: buttonText,
          size: buttonSize,
          top: buttonPositionTop,
          right: buttonPositionRight,
          bottom: buttonPositionBottom,
          left: buttonPositionLeft,
          iconType: iconInput,
          icon:
            iconInput === "font-awesome"
              ? selectedIconPrefix + " " + selectedIconValue
              : uploadedIconUrl,
          visibleOnPC: isPCChecked,
          visibleOnTablet: isTabletChecked,
          visibleOnMobile: isMobileChecked,
        },
        { headers }
      );

      navigate("/product/" + productId + "/pre-built/button");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedIcon = (e) => {
    const splitIcon = e.target.value.split(" ");
    setSelectedIconPrefix(splitIcon[0]);
    setSelectedIconValue(splitIcon[1]);
  };

  const handlePositionTop = (e) => {
    setButtonPositionTop(parseInt(e.target.value));
  };

  const handlePositionRight = (e) => {
    setButtonPositionRight(parseInt(e.target.value));
  };

  const handlePositionBottom = (e) => {
    setButtonPositionBottom(parseInt(e.target.value));
  };

  const handlePositionLeft = (e) => {
    setButtonPositionLeft(parseInt(e.target.value));
  };

  const onDragBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  const onDragBodyColor = (color) => {
    setBodyColor(color);
  };

  const onDragTextColor = (color) => {
    setTextColor(color);
  };

  const handleButtonText = (e) => {
    setButtonText(e.target.value);
  };

  const handleButtonSize = (size) => {
    setButtonSize(size);
  };

  const handleButtonPosition = (t, r, b, l) => {
    setButtonPositionTop(t);
    setButtonPositionRight(r);
    setButtonPositionBottom(b);
    setButtonPositionLeft(l);
  };

  const closeBackgroundColorPicker = () => {
    setBackgroundColorEnable(false);
  };

  const closeBodyColorPicker = () => {
    setBodyColorEnable(false);
  };

  const closeTextColorPicker = () => {
    setTextColorEnable(false);
  };

  const closeFloatingActionButton = () => {
    if (floatingActionButton) {
      setFloatingActionButton(false);
    }
  };

  const openIconUploadInput = () => {
    document.getElementById("iconUploadInput").click();
  };

  const selectButtonStyle = (buttonStyle) => {
    setSelectedButtonStyle(buttonStyle);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <Col md={12}>
            <Card>
              <CardBody>
                <CardTitle className="h4 mb-4">
                  <span>Button Styles</span>
                </CardTitle>
                <Row>
                  {buttonStyles.map((buttonStyle) => {
                    return (
                      <Col md={2}>
                        <div className="d-flex flex-column gap-2">
                          <Label>{buttonStyle}</Label>
                          <Button
                            onClick={() => selectButtonStyle(buttonStyle)}
                            type="button"
                            className={
                              buttonStyle === selectedButtonStyle
                                ? "btn btn-success"
                                : "btn btn-info"
                            }
                          >
                            {buttonStyle === selectedButtonStyle
                              ? "Selected"
                              : "Choose this style"}
                          </Button>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md={12}>
            {/* Button Editor */}
            <Card>
              <CardBody>
                <CardTitle className="h4 mb-4">
                  <span>Button Editor</span>
                </CardTitle>
                <Row>
                  <Col md={2}>
                    <div>
                      <Label>Background color</Label>
                      <div className="d-flex gap-2">
                        <Input
                          type="text"
                          className="colorpicker-default"
                          value={backgroundColor}
                          readOnly
                        />
                        <div
                          onClick={() => {
                            setBackgroundColorEnable(!backgroundColorEnable);
                          }}
                          className="btn"
                          style={{
                            backgroundColor: backgroundColor,
                            width: 40,
                            height: 40,
                          }}
                        ></div>
                        {backgroundColorEnable ? (
                          <ClickAwayListener
                            onClickAway={closeBackgroundColorPicker}
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
                                value={backgroundColor}
                                onDrag={onDragBackgroundColor}
                              />
                            </>
                          </ClickAwayListener>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div>
                      <Label>Body color</Label>
                      <div className="d-flex gap-2">
                        <Input
                          type="text"
                          className="colorpicker-default"
                          value={bodyColor}
                          readOnly
                        />
                        <div
                          onClick={() => {
                            setBodyColorEnable(!bodyColorEnable);
                          }}
                          className="btn"
                          style={{
                            backgroundColor: bodyColor,
                            width: 40,
                            height: 40,
                          }}
                        ></div>
                        {bodyColorEnable ? (
                          <ClickAwayListener onClickAway={closeBodyColorPicker}>
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
                                value={bodyColor}
                                onDrag={onDragBodyColor}
                              />
                            </>
                          </ClickAwayListener>
                        ) : null}
                      </div>
                    </div>
                  </Col>
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
                          <ClickAwayListener onClickAway={closeTextColorPicker}>
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
                    </div>
                  </Col>
                  <Col md={3}>
                    <div>
                      <Label>Text</Label>
                      <div className="d-flex gap-2">
                        <Input
                          onChange={handleButtonText}
                          value={buttonText}
                          type="text"
                          className="form-control"
                          placeholder="Button Text"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="d-flex flex-column">
                      <Label>Size</Label>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          onClick={() => handleButtonSize(50)}
                          className="btn btn-light"
                        >
                          Small
                        </button>
                        <button
                          onClick={() => handleButtonSize(75)}
                          className="btn btn-light"
                        >
                          Medium
                        </button>
                        <button
                          onClick={() => handleButtonSize(100)}
                          className="btn btn-light"
                        >
                          Large
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            {/* End Button Editor */}

            <Row>
              {/*  Position Editor */}
              <Col className="pb-4" md={12}>
                <Card className="h-100">
                  <CardBody>
                    <CardTitle className="h4 mb-4">
                      <span>Position Editor</span>
                    </CardTitle>
                    <Row>
                      <Col md={6}>
                        <div className="d-flex flex-column">
                          <Label>Position</Label>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              onClick={() =>
                                handleButtonPosition(20, null, null, 20)
                              }
                              className="btn btn-light"
                            >
                              Top Left
                            </button>
                            <button
                              onClick={() =>
                                handleButtonPosition(20, 10, null, null)
                              }
                              className="btn btn-light"
                            >
                              Top Right
                            </button>
                            <button
                              onClick={() =>
                                handleButtonPosition(null, null, 20, 20)
                              }
                              className="btn btn-light"
                            >
                              Bottom Left
                            </button>
                            <button
                              onClick={() =>
                                handleButtonPosition(null, 10, 20, null)
                              }
                              className="btn btn-light"
                            >
                              Bottom Right
                            </button>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="d-flex gap-2">
                          <div className="">
                            <Label>Top</Label>
                            <Input
                              type="number"
                              className={
                                buttonPositionTop === null
                                  ? "form-control bg-light"
                                  : "form-control"
                              }
                              placeholder="Top"
                              onChange={handlePositionTop}
                              value={
                                buttonPositionTop === null
                                  ? ""
                                  : buttonPositionTop
                              }
                              disabled={buttonPositionTop === null}
                            />
                          </div>
                          <div className="">
                            <Label>Right</Label>
                            <Input
                              type="number"
                              className={
                                buttonPositionRight === null
                                  ? "form-control bg-light"
                                  : "form-control"
                              }
                              placeholder="Right"
                              onChange={handlePositionRight}
                              value={
                                buttonPositionRight === null
                                  ? ""
                                  : buttonPositionRight
                              }
                              disabled={buttonPositionRight === null}
                            />
                          </div>
                          <div className="">
                            <Label>Bottom</Label>
                            <Input
                              type="number"
                              className={
                                buttonPositionBottom === null
                                  ? "form-control bg-light"
                                  : "form-control"
                              }
                              placeholder="Bottom"
                              onChange={handlePositionBottom}
                              value={
                                buttonPositionBottom === null
                                  ? ""
                                  : buttonPositionBottom
                              }
                              disabled={buttonPositionBottom === null}
                            />
                          </div>
                          <div className="">
                            <Label>Left</Label>
                            <Input
                              type="number"
                              className={
                                buttonPositionLeft === null
                                  ? "form-control bg-light"
                                  : "form-control"
                              }
                              placeholder="Left"
                              onChange={handlePositionLeft}
                              value={
                                buttonPositionLeft === null
                                  ? ""
                                  : buttonPositionLeft
                              }
                              disabled={buttonPositionLeft === null}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              {/* End Position Editor */}
            </Row>
            <Row>
              <Col md={6}>
                {/* Icon Editor */}
                <Card>
                  <CardBody>
                    <div className="d-flex gap-4">
                      <CardTitle className="h4 mb-4">Icon</CardTitle>
                      <div className="d-flex gap-2">
                        <div className="vstack gap-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="icon"
                              id="manual"
                              value="manual"
                              onClick={(e) => setIconInput("font-awesome")}
                              checked={iconInput === "font-awesome"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="manual"
                            >
                              Fontawesome
                            </label>
                          </div>
                        </div>
                        <div className="vstack gap-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="icon"
                              id="upload"
                              value="upload"
                              onClick={(e) => setIconInput("upload")}
                              checked={iconInput === "upload"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="upload"
                            >
                              Upload
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Row>
                      <Col md={12}>
                        {iconInput === "font-awesome" ? (
                          <div className="form-floating mb-3">
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
                            <label htmlFor="floatingSelectGrid">
                              Select Icon ({icons.data.length})
                            </label>
                          </div>
                        ) : (
                          <div className="form-floating mb-3">
                            {previewUploadedIcon && (
                              <div className="d-flex justify-content-center mb-3">
                                <img
                                  style={{ height: 100 }}
                                  src={previewUploadedIcon}
                                />
                              </div>
                            )}
                            <button
                              className="btn-rounded waves-effect waves-light btn btn-primary w-100"
                              type="button"
                              onClick={openIconUploadInput}
                            >
                              Upload
                            </button>
                            <input
                              onChange={handleUploadIcon}
                              id="iconUploadInput"
                              className="d-none"
                              type="file"
                            />
                          </div>
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                {/* End Icon Editor */}
              </Col>
              {/* Visibility Editor */}
              <Col className="pb-4" md={6}>
                <Card className="h-100">
                  <CardBody>
                    <CardTitle className="h4 mb-4">Visibility Editor</CardTitle>
                    <Row>
                      <span>Visibility</span>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="visibleOnPC"
                            checked={isPCChecked}
                            onClick={(e) => setIsPCChecked(!isPCChecked)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="visibleOnPC"
                          >
                            PC
                          </label>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="visibleOnTablet"
                            value=""
                            checked={isTabletChecked}
                            onClick={(e) =>
                              setIsTabletChecked(!isTabletChecked)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="visibleOnTablet"
                          >
                            Tablet
                          </label>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="visibleOnMobile"
                            value=""
                            checked={isMobileChecked}
                            onClick={(e) =>
                              setIsMobileChecked(!isMobileChecked)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="visibleOnMobile"
                          >
                            Mobile
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              {/* End Visibility Editor */}
            </Row>
            <Row>
              <Col md={12}>
                <div className="d-grid gap-2">
                  <Button
                    onClick={createPrebuiltButton}
                    type="button"
                    className="btn btn-success"
                  >
                    Create Pre-built Button
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <div
            style={{
              top: buttonPositionTop,
              right: buttonPositionRight,
              bottom: buttonPositionBottom,
              left: buttonPositionLeft,
              position: "fixed",
              width: buttonSize,
              height: buttonSize,
              zIndex: 99999,
            }}
          >
            {selectedButtonStyle === "Rounded Button" ? (
              <div
                style={{ float: "right" }}
                className="d-flex gap-2 align-items-center"
              >
                <button
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
                  type="button"
                  style={{
                    width: buttonSize,
                    height: buttonSize,
                    borderRadius: "50%",
                    border: 0,
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    backgroundColor: backgroundColor,
                    color: textColor,
                    fontSize:
                      iconInput === "upload" && previewUploadedIcon ? "" : 32,
                  }}
                  className={
                    iconInput === "upload" && previewUploadedIcon ? "p-3" : ""
                  }
                >
                  {iconInput === "upload" && previewUploadedIcon ? (
                    <img
                      style={{
                        width: 35,
                        height: 35,
                      }}
                      src={previewUploadedIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={[selectedIconPrefix, selectedIconValue]}
                    />
                  )}
                </button>
              </div>
            ) : selectedButtonStyle === "Long Rounded Button#1" ? (
              <div
                style={{
                  float: buttonPositionRight === null ? "left" : "right",
                }}
                className="d-flex gap-2 align-items-center"
              >
                <button
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
                  type="button"
                  className="d-flex justify-content-center align-items-center gap-3 px-4"
                  style={{
                    width: "100%",
                    height: buttonSize,
                    borderRadius: 9999,
                    border: 0,
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    backgroundColor: backgroundColor,
                    color: textColor,
                    fontSize: 32,
                    whiteSpace: "nowrap",
                  }}
                >
                  {iconInput === "upload" && previewUploadedIcon ? (
                    <img
                      style={{
                        width: 35,
                        height: 35,
                      }}
                      src={previewUploadedIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={[selectedIconPrefix, selectedIconValue]}
                    />
                  )}
                  <h5 style={{ color: textColor }}>{buttonText}</h5>
                </button>
              </div>
            ) : selectedButtonStyle === "Rounded Button With Text" ? (
              <div
                style={{
                  float: buttonPositionRight === null ? "left" : "right",
                  whiteSpace: "nowrap",
                }}
                className="d-flex gap-2 align-items-center"
              >
                {buttonPositionRight && (
                  <div
                    className="px-3 py-2 d-flex justify-content-center align-items-center"
                    style={{
                      background: "white",
                      borderRadius: 10,
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    }}
                  >
                    <h5>{buttonText}</h5>
                  </div>
                )}
                <button
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
                  type="button"
                  style={{
                    width: buttonSize,
                    height: buttonSize,
                    borderRadius: "50%",
                    border: 0,
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    backgroundColor: backgroundColor,
                    color: textColor,
                    fontSize:
                      iconInput === "upload" && previewUploadedIcon ? "" : 32,
                  }}
                  className={
                    iconInput === "upload" && previewUploadedIcon ? "p-3" : ""
                  }
                >
                  {iconInput === "upload" && previewUploadedIcon ? (
                    <img
                      style={{
                        width: 35,
                        height: 35,
                      }}
                      src={previewUploadedIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={[selectedIconPrefix, selectedIconValue]}
                    />
                  )}
                </button>
                {buttonPositionLeft && <h5>{buttonText}</h5>}
              </div>
            ) : (
              <div
                style={{
                  float: buttonPositionRight === null ? "left" : "right",
                }}
                className="d-flex gap-2 align-items-center"
              >
                <button
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
                  type="button"
                  className="d-flex justify-content-center align-items-center gap-3 px-2"
                  style={{
                    width: "100%",
                    height: buttonSize,
                    borderRadius: 9999,
                    border: 0,
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    backgroundColor: "white",
                    color: textColor,
                    fontSize: 32,
                    whiteSpace: "nowrap",
                  }}
                >
                  <h5
                    style={{
                      color: "#374151",
                    }}
                  >
                    {buttonText}
                  </h5>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      background: backgroundColor,
                      width: buttonSize * 0.9,
                      height: buttonSize * 0.9,
                      borderRadius: "50%",
                    }}
                  >
                    {iconInput === "upload" && previewUploadedIcon ? (
                      <img
                        style={{
                          width: 35,
                          height: 35,
                        }}
                        src={previewUploadedIcon}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={[selectedIconPrefix, selectedIconValue]}
                      />
                    )}
                  </div>
                </button>
              </div>
            )}
            {floatingActionButton && (
              <div
                style={{
                  position: "relative",
                  top: buttonPositionTop ? 90 : null,
                  left: buttonPositionLeft ? 0 : null,
                  bottom: buttonPositionBottom
                    ? 370 + contacts.length * 10
                    : null,
                  right: buttonPositionRight ? 300 : null,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: backgroundColor,
                      paddingTop: 15,
                      paddingBottom: 15,
                      paddingRight: 20,
                      paddingLeft: 20,
                      color: textColor,
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                      width: 350,
                      fontWeight: 600,
                      fontSize: 20,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {buttonText}
                  </div>

                  <ClickAwayListener onClickAway={closeFloatingActionButton}>
                    <div
                      style={{
                        marginRight: buttonPositionRight
                          ? buttonPositionRight
                          : null,
                        background: bodyColor,
                        cursor: "pointer",
                        minHeight: 300,
                        width: "100%",
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        color: "rgb(75 85 99)",
                        fontWeight: 500,
                        boxShadow:
                          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                      }}
                    >
                      {contacts.map((contact) => {
                        return (
                          <div
                            key={contact.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              borderTop: "1px solid rgb(229 231 235)",
                            }}
                            className="py-3 px-4"
                          >
                            <i
                              style={{
                                fontSize: 24,
                              }}
                              className={"uil-" + contact.icon}
                            ></i>
                            <span
                              style={{
                                fontSize: 20,
                              }}
                            >
                              {contact.title}
                            </span>
                            <i
                              style={{
                                fontSize: 24,
                                marginLeft: "auto",
                              }}
                              className="uil-angle-right"
                            ></i>
                          </div>
                        );
                      })}
                    </div>
                  </ClickAwayListener>
                </div>
              </div>
            )}
          </div>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AddPrebuiltProduct;
