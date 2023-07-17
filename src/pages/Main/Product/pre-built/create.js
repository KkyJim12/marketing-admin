import React, { useState } from "react";
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

import ClickAwayListener from "react-click-away-listener";

const AddPrebuiltProduct = () => {
  document.title = " My Product | Marketing tool platform";

  const [buttonText, setButtonText] = useState("Minible");
  const [backgroundColorEnable, setBackgroundColorEnable] = useState(false);
  const [textColorEnable, setTextColorEnable] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#f5f5f5");
  const [buttonSize, setButtonSize] = useState(75);

  const [buttonPositionTop, setButtonPositionTop] = useState(null);
  const [buttonPositionRight, setButtonPositionRight] = useState(20);
  const [buttonPositionBottom, setButtonPositionBottom] = useState(20);
  const [buttonPositionLeft, setButtonPositionLeft] = useState(null);

  const [iconInput, setIconInput] = useState("font-awesome");
  const [isPCChecked, setIsPCChecked] = useState(true);
  const [isTabletChecked, setIsTabletChecked] = useState(true);
  const [isMobileChecked, setIsMobileChecked] = useState(true);
  const [floatingActionButton, setFloatingActionButton] = useState(false);

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
  const closeTextColorPicker = () => {
    setTextColorEnable(false);
  };

  const openIconUploadInput = () => {
    document.getElementById("iconUploadInput").click();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <Col md={12}>
            {/* Button Editor */}
            <Card>
              <CardBody>
                <CardTitle className="h4 mb-4">
                  <span>Button Editor</span>
                </CardTitle>
                <Row>
                  <Col md={3}>
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
                  <Col md={3}>
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
                                handleButtonPosition(20, 20, null, null)
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
                                handleButtonPosition(null, 20, 20, null)
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
                              onChange={(e) => setIconInput("font-awesome")}
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
                              onChange={(e) => setIconInput("upload")}
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
                            >
                              <option>Open this select menu</option>
                              <option value="1">Chat</option>
                            </select>
                            <label htmlFor="floatingSelectGrid">
                              Select Icon
                            </label>
                          </div>
                        ) : (
                          <div className="form-floating mb-3">
                            <button
                              className="btn-rounded waves-effect waves-light btn btn-primary  w-100"
                              type="button"
                              onClick={openIconUploadInput}
                            >
                              Upload
                            </button>
                            <input
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
                            id="defaultCheck1"
                            checked={isPCChecked}
                            onChange={(e) => setIsPCChecked(!isPCChecked)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
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
                            id="defaultCheck2"
                            value=""
                            checked={isTabletChecked}
                            onChange={(e) =>
                              setIsTabletChecked(!isTabletChecked)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck2"
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
                            id="defaultCheck2"
                            value=""
                            checked={isMobileChecked}
                            onChange={(e) =>
                              setIsMobileChecked(!isMobileChecked)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck2"
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
                  <Button type="button" className="btn btn-success">
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
            <button
              onClick={(e) => setFloatingActionButton(!floatingActionButton)}
              type="button"
              style={{
                width: buttonSize,
                height: buttonSize,
                borderRadius: "50%",
                border: 0,
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                backgroundColor: backgroundColor,
                color: textColor,
                fontSize: 32,
              }}
            >
              <i className="uil-comment-info-alt"></i>
            </button>
            {floatingActionButton && (
              <div
                style={{
                  position: "relative",
                  top: buttonPositionTop ? 10 : null,
                  left: buttonPositionLeft ? 10 : null,
                  bottom: buttonPositionBottom ? 450 : null,
                  right: buttonPositionRight ? 280 : null,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#3b82f6",
                      paddingTop: 15,
                      paddingBottom: 15,
                      paddingRight: 20,
                      paddingLeft: 20,
                      color: "white",
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                      minWidth: 350,
                      fontWeight: 600,
                      fontSize: 20,
                    }}
                  >
                    {buttonText}
                  </div>
                  <div
                    style={{
                      background: "rgb(125 211 252)",
                      minHeight: 300,
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15,
                      color: "white",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                    className="py-3 px-4"
                  >
                    Email
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

export default AddPrebuiltProduct;
