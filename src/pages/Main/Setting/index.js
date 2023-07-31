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

import Breadcrumbs from "../../../components/Common/Breadcrumb";

import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const SettingPage = () => {
  const { t } = useTranslation();

  const [eCommerceContent, setEcommerceContent] = useState(() =>
    EditorState.createEmpty()
  );

  const [myProductContent, setMyProductContent] = useState(() =>
    EditorState.createEmpty()
  );

  const [orderHistoryContent, setOrderHistoryContent] = useState(() =>
    EditorState.createEmpty()
  );

  const [restError, setRestError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  const onEcommerceEditorStateChange = (editorState) => {
    setEcommerceContent(editorState);
  };

  const onMyProductEditorStateChange = (editorState) => {
    setMyProductContent(editorState);
  };

  const onOrderHistoryEditorStateChange = (editorState) => {
    setOrderHistoryContent(editorState);
  };

  const resetSaveContentError = () => {
    setRestError("");
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

      // Set e-commerce content
      const eCommerceContentBlocks = convertFromHTML(
        JSON.parse(contents.eCommercePage)
      );

      const eCommerceContentState = ContentState.createFromBlockArray(
        eCommerceContentBlocks.contentBlocks,
        eCommerceContentBlocks.entityMap
      );

      setEcommerceContent(EditorState.createWithContent(eCommerceContentState));

      // Set my product content
      const myProductContentBlocks = convertFromHTML(
        JSON.parse(contents.myProductPage)
      );

      const myProductContentState = ContentState.createFromBlockArray(
        myProductContentBlocks.contentBlocks,
        myProductContentBlocks.entityMap
      );

      setMyProductContent(EditorState.createWithContent(myProductContentState));

      // Set order history content
      const orderHistoryContentBlock = convertFromHTML(
        JSON.parse(contents.orderHistoryPage)
      );

      const orderHistoryContentState = ContentState.createFromBlockArray(
        orderHistoryContentBlock.contentBlocks,
        orderHistoryContentBlock.entityMap
      );

      setOrderHistoryContent(
        EditorState.createWithContent(orderHistoryContentState)
      );
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
          eCommerceContent: JSON.stringify(
            draftToHtml(convertToRaw(eCommerceContent.getCurrentContent()))
          ),
          myProductContent: JSON.stringify(
            draftToHtml(convertToRaw(myProductContent.getCurrentContent()))
          ),
          orderHistoryContent: JSON.stringify(
            draftToHtml(convertToRaw(orderHistoryContent.getCurrentContent()))
          ),
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
                    <Col md={12}>
                      <div className="wysiwyg-custom">
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          editorState={eCommerceContent}
                          onEditorStateChange={onEcommerceEditorStateChange}
                        />
                      </div>
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
                    <Col md={12}>
                      <div className="wysiwyg-custom">
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          editorState={myProductContent}
                          onEditorStateChange={onMyProductEditorStateChange}
                        />
                      </div>
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
                    <Col md={12}>
                      <div className="wysiwyg-custom">
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          editorState={orderHistoryContent}
                          onEditorStateChange={onOrderHistoryEditorStateChange}
                        />
                      </div>
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
