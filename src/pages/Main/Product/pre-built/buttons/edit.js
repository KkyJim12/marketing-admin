import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import icons from "../../../../../assets/icons/free-icon.json";
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
import Select, { components } from "react-select";

const EditPrebuiltProduct = () => {
  document.title = " My Product | Marketing tool platform";
  const { Option } = components;

  const { productId, id } = useParams();
  const navigate = useNavigate();

  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  const [errorName, setErrorName] = useState("");

  const [name, setName] = useState("");
  const [buttonText, setButtonText] = useState("Minible");
  const [backgroundColorEnable, setBackgroundColorEnable] = useState(false);
  const [bodyColorEnable, setBodyColorEnable] = useState(false);
  const [textColorEnable, setTextColorEnable] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
  const [bodyColor, setBodyColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#f5f5f5");
  const [buttonSize, setButtonSize] = useState(70);

  const [buttonPositionTop, setButtonPositionTop] = useState(null);
  const [buttonPositionRight, setButtonPositionRight] = useState(20);
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

  const [selectedIconPrefix, setSelectedIconPrefix] = useState("fab");
  const [selectedIconValue, setSelectedIconValue] = useState("facebook");
  const [selectedIconShow, setSelectedIconShow] = useState({
    label: "fab facebook",
    value: "fab facebook",
  });

  const [iconOptions, setIconOptions] = useState([]);

  const previewButton = useCallback(
    (node) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
        setWidth(node.getBoundingClientRect().width);
      }
    },
    [buttonText, buttonSize]
  );

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

  const buttonStyles = [
    "Rounded Button",
    "Rounded Button With Text",
    "Long Rounded Button#1",
    "Long Rounded Button#2",
  ];
  const [selectedButtonStyle, setSelectedButtonStyle] =
    useState("Rounded Button");

  const contacts = [
    { id: 1, title: "Whatsapp", iconValue: "whatsapp" },
    { id: 2, title: "Discord", iconValue: "discord" },
    { id: 3, title: "Line", iconValue: "line" },
    { id: 4, title: "Facebook", iconValue: "facebook" },
    { id: 5, title: "Youtube", iconValue: "youtube" },
  ];

  const getTextWidth = (text, font) => {
    // re-use canvas object for better performance
    const canvas =
      getTextWidth.canvas ||
      (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    console.log(metrics.width);
    return metrics.width;
  };

  useEffect(() => {
    const options = [];
    icons.data.map((icon) =>
      options.push({
        label: icon,
        value: icon,
      })
    );
    setIconOptions(options);
  }, []);

  useEffect(() => {
    getPrebuiltButton();
  }, [productId, id]);

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

  const getPrebuiltButton = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${productId}/prebuilt-buttons/${id}/edit`,
        { headers }
      );

      const product = response.data.data;

      console.log(product, "asd");

      setName(product.name);
      setBackgroundColor(product.backgroundColor);
      setButtonText(product.textContent);
      setBodyColor(product.bodyColor);
      setTextColor(product.textColor);
      setButtonSize(product.size);
      setButtonPositionTop(product.top);
      setButtonPositionRight(product.right);
      setButtonPositionBottom(product.bottom);
      setButtonPositionLeft(product.left);
      setIconInput(product.iconType);
      setIsPCChecked(product.visibleOnPC);
      setIsTabletChecked(product.visibleOnTablet);
      setIsMobileChecked(product.visibleOnMobile);
      if (product.iconType === "font-awesome") {
        setSelectedIconShow({ label: product.icon, value: product.icon });
        setSelectedIconPrefix(product.icon.split(" ")[0]);
        setSelectedIconValue(product.icon.split(" ")[1]);
      } else {
        setUploadedIconUrl(product.icon);
        setPreviewUploadedIcon(product.icon);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const updatePrebuiltButton = async () => {
    setErrorName("");

    if (name === "") {
      setErrorName("Please insert pre-built name");
      return;
    }

    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${productId}/prebuilt-buttons/${id}`,
        {
          name: name,
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

  const handleSelectedIcon = (value) => {
    const splitIcon = value.split(" ");
    setSelectedIconShow({ label: value, value: value });
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

  const handleName = (e) => {
    setName(e.target.value);
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
          <Col md={4}>
            <Card>
              <CardBody>
                <CardTitle className="h4 mb-4">
                  <span>Attribute</span>
                </CardTitle>
                <div>
                  <Label>Name</Label>
                  <div className="d-flex gap-2">
                    <Input
                      onChange={handleName}
                      value={name}
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  {errorName && (
                    <small className="text-danger">{errorName}</small>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={12}>
            <Card>
              <CardBody>
                <CardTitle className="h4 mb-4">
                  <span>Button Styles</span>
                </CardTitle>
                <Row>
                  {buttonStyles.map((buttonStyle, index) => {
                    return (
                      <Col md={2} key={index}>
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
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          maxLength={7}
                        />
                        <div
                          onClick={() => {
                            setBackgroundColorEnable(!backgroundColorEnable);
                          }}
                          className="btn"
                          style={{
                            border: "1px rgb(206, 212, 218) solid",
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
                          onChange={(e) => setBodyColor(e.target.value)}
                          maxLength={7}
                        />
                        <div
                          onClick={() => {
                            setBodyColorEnable(!bodyColorEnable);
                          }}
                          className="btn"
                          style={{
                            border: "1px rgb(206, 212, 218) solid",
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
                          onClick={() => handleButtonSize(60)}
                          className="btn btn-light"
                        >
                          Small
                        </button>
                        <button
                          onClick={() => handleButtonSize(70)}
                          className="btn btn-light"
                        >
                          Medium
                        </button>
                        <button
                          onClick={() => handleButtonSize(80)}
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
                            <div className="d-flex gap-1 align-items-center">
                              <div
                                style={{
                                  background: backgroundColor,
                                  color: textColor,
                                  width: 35,
                                  height: 35,
                                }}
                                className="rounded d-flex align-items-center justify-content-center"
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
                    onClick={updatePrebuiltButton}
                    type="button"
                    className="btn btn-warning"
                  >
                    Update Pre-built Button
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
                style={{
                  float: buttonPositionRight === null ? "left" : "right",
                }}
                className="d-flex gap-2 align-items-center"
              >
                <div
                  style={{
                    width: buttonSize,
                    height: buttonSize,
                    background: backgroundColor,
                    zIndex: 99998,
                  }}
                  id="fab-button-cover"
                ></div>
                <button
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
                  type="button"
                  style={{
                    zIndex: 99999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                        width: buttonSize / 2,
                        height: buttonSize / 2,
                      }}
                      src={previewUploadedIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      style={{
                        width: buttonSize / 2,
                        height: buttonSize / 2,
                      }}
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
                <div
                  style={{
                    width: width,
                    height: buttonSize,
                    background: backgroundColor,
                    zIndex: 99998,
                    opacity: 0.4,
                  }}
                  id="fab-button-cover"
                ></div>
                <button
                  ref={previewButton}
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
                  type="button"
                  className="d-flex justify-content-center align-items-center gap-3 px-4"
                  style={{
                    zIndex: 99999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                        width: buttonSize / 2,
                        height: buttonSize / 2,
                      }}
                      src={previewUploadedIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      style={{
                        width: buttonSize / 2,
                        height: buttonSize / 2,
                      }}
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
                <div
                  style={{
                    width: buttonSize,
                    height: buttonSize,
                    background: backgroundColor,
                    zIndex: 99998,
                    right: buttonPositionLeft === null && 10,
                    left: buttonPositionRight === null && 10,
                  }}
                  id="fab-button-cover"
                ></div>
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
                    <h5 className="my-auto">{buttonText}</h5>
                  </div>
                )}
                <button
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
                  type="button"
                  style={{
                    zIndex: 99999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                        width: buttonSize / 2,
                        height: buttonSize / 2,
                      }}
                      src={previewUploadedIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      style={{
                        width: buttonSize / 2,
                        height: buttonSize / 2,
                      }}
                      icon={[selectedIconPrefix, selectedIconValue]}
                    />
                  )}
                </button>
                {buttonPositionLeft && (
                  <div
                    className="px-3 py-2 d-flex justify-content-center align-items-center"
                    style={{
                      background: "white",
                      borderRadius: 10,
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    }}
                  >
                    <h5 className="my-auto">{buttonText}</h5>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  float: "right",
                  position: buttonPositionLeft && "relative",
                  left:
                    buttonPositionLeft &&
                    buttonSize / 2.8 +
                      getTextWidth(buttonText) *
                        (buttonSize === 90
                          ? 2.2
                          : buttonSize === 70
                          ? 2.2
                          : 2.5),
                }}
                className="d-flex gap-2 align-items-center"
              >
                <div
                  style={{
                    width: width,
                    height: buttonSize,
                    background: backgroundColor,
                    opacity: 0.15,
                    zIndex: 99998,
                  }}
                  id="fab-button-cover"
                ></div>
                <button
                  ref={previewButton}
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
                  type="button"
                  className="d-flex align-items-center gap-3"
                  style={{
                    zIndex: 99999,
                    paddingLeft: 20,
                    paddingRight: buttonSize,
                    height: buttonSize - 10,
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
                      position: "absolute",
                      right: 3 + (buttonPositionRight ? 10 : 0),
                      background: backgroundColor,
                      width: (buttonSize - 10) * 0.95,
                      height: (buttonSize - 10) * 0.95,
                      borderRadius: "50%",
                    }}
                  >
                    {iconInput === "upload" && previewUploadedIcon ? (
                      <img
                        style={{
                          width: buttonSize / 2.5,
                          height: buttonSize / 2.5,
                        }}
                        src={previewUploadedIcon}
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={{
                          width: buttonSize / 2.5,
                          height: buttonSize / 2.5,
                        }}
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
                  top: buttonPositionTop
                    ? buttonSize === 60
                      ? 60
                      : buttonSize === 70
                      ? 80
                      : 100
                    : null,
                  left: buttonPositionLeft ? 0 : null,
                  bottom: buttonPositionBottom
                    ? 400 + contacts.length * 10
                    : null,
                  right: buttonPositionRight
                    ? buttonSize === 60
                      ? 290 + 20
                      : buttonSize === 70
                      ? 280 + 20
                      : 270 + 20
                    : null,
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
                            borderTop: "1px solid rgb(229 231 235)",
                          }}
                          className="py-3 px-4"
                        >
                          <div className="row">
                            <div className="col-2">
                              <div
                                className="d-flex justify-content-center align-items-center h-100"
                                style={{ fontSize: 24 }}
                              >
                                <FontAwesomeIcon
                                  icon={["fab", contact.iconValue]}
                                />
                              </div>
                            </div>
                            <div className="col-8">
                              <div className="d-flex flex-column gap-1">
                                <div
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  {contact.title}
                                </div>
                                <div
                                  style={{
                                    fontSize: 10,
                                  }}
                                >
                                  {contact.title}
                                </div>
                              </div>
                            </div>
                            <div className="col-2">
                              <div
                                className="d-flex justify-content-center align-items-center h-100"
                                style={{ fontSize: 24 }}
                              >
                                <FontAwesomeIcon
                                  icon={["fas", "chevron-right"]}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default EditPrebuiltProduct;
