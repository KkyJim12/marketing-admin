import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Form,
} from "reactstrap";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";

const SettingPage = () => {
  const { t } = useTranslation();
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
              <Card>
                <CardBody>
                  <CardTitle>E-commerce Bottom</CardTitle>
                  <Row className="gap-2">
                    <Col md={12}>
                      <Form method="post" className="wysiwyg-custom">
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      </Form>
                    </Col>

                    <Col className="gap-2 d-grid" md={12}>
                      <button className="btn btn-success mt-3" type="submit">
                        Save
                      </button>
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
                      <Form method="post" className="wysiwyg-custom">
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      </Form>
                    </Col>

                    <Col className="gap-2 d-grid" md={12}>
                      <button className="btn btn-success mt-3" type="submit">
                        Save
                      </button>
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
                      <Form method="post" className="wysiwyg-custom">
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      </Form>
                    </Col>

                    <Col className="gap-2 d-grid" md={12}>
                      <button className="btn btn-success mt-3" type="submit">
                        Save
                      </button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SettingPage;
