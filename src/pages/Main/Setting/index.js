import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Alert,
} from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ImageResize from "quill-image-resize-module-react";
import Quill from "quill";
Quill.register("modules/imageResize", ImageResize);

const SettingPage = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const [eCommerceContent, setEcommerceContent] = useState();

  const [myProductContent, setMyProductContent] = useState();

  const [orderHistoryContent, setOrderHistoryContent] = useState();

  const [buttonSettingContent, setButtonSettingContent] = useState();

  const [websiteSetupContent, setWebsiteSetupContent] = useState();

  const [restError, setRestError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  const resetSaveContentError = () => {
    setRestError("");
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["link", "image"],
      ["clean"], // remove formatting button
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const getContents = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/settings`,
        { headers }
      );

      console.log(response);

      const contents = response.data.data;

      setEcommerceContent(contents.eCommercePage);
      setMyProductContent(contents.myProductPage);
      setOrderHistoryContent(contents.orderHistoryPage);
      setButtonSettingContent(contents.buttonSettingPage);
      setWebsiteSetupContent(contents.websiteSetupPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  const saveContent = async () => {
    resetSaveContentError();

    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/settings`,
        {
          eCommerceContent: eCommerceContent,
          myProductContent: myProductContent,
          orderHistoryContent: orderHistoryContent,
          buttonSettingContent: buttonSettingContent,
          websiteSetupContent: websiteSetupContent,
        },
        { headers }
      );

      setSaveSuccess("Save success");

      setInterval(function () {
        setSaveSuccess("");
      }, 3000);
    } catch (error) {
      setRestError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Breadcrumbs
              title={t("Platform Name")}
              breadcrumbItem={t("Setting")}
            />
            <Col md={12}>
              {saveSuccess && (
                <Alert className="text-success alert-success">
                  {saveSuccess}
                </Alert>
              )}
              {restError && (
                <Alert className="text-danger alert-danger">{restError}</Alert>
              )}
            </Col>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>E-commerce Bottom</CardTitle>
                  <Row className="gap-2">
                    <Col style={{ height: 300 }} md={12}>
                      <ReactQuill
                        style={{ height: "80%" }}
                        modules={modules}
                        theme="snow"
                        value={eCommerceContent}
                        onChange={setEcommerceContent}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>My Product Bottom</CardTitle>
                  <Row className="gap-2">
                    <Col style={{ height: 300 }} md={12}>
                      <ReactQuill
                        style={{ height: "80%" }}
                        modules={modules}
                        theme="snow"
                        value={myProductContent}
                        onChange={setMyProductContent}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>Order History Bottom</CardTitle>
                  <Row className="gap-2">
                    <Col style={{ height: 300 }} md={12}>
                      <ReactQuill
                        style={{ height: "80%" }}
                        modules={modules}
                        theme="snow"
                        value={orderHistoryContent}
                        onChange={setOrderHistoryContent}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>Button Setting</CardTitle>
                  <Row className="gap-2">
                    <Col style={{ height: 300 }} md={12}>
                      <ReactQuill
                        style={{ height: "80%" }}
                        modules={modules}
                        theme="snow"
                        value={buttonSettingContent}
                        onChange={setButtonSettingContent}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>Website Setup</CardTitle>
                  <Row className="gap-2">
                    <Col style={{ height: 300 }} md={12}>
                      <ReactQuill
                        style={{ height: "80%" }}
                        modules={modules}
                        theme="snow"
                        value={websiteSetupContent}
                        onChange={setWebsiteSetupContent}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="gap-2 d-grid" md={12}>
              <button
                onClick={saveContent}
                className="btn btn-success mt-3"
                type="button"
              >
                Save
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SettingPage;
