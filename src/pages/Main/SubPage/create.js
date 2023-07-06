import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Label,
  Form,
  Alert,
} from "reactstrap";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [mainPageId, setMainPageId] = useState(null);
  const [content, setContent] = useState(() => EditorState.createEmpty());

  const [pageChoices, setPageChoices] = useState([]);

  const [nameError, setNameError] = useState("");
  const [sortValueError, setSortValueError] = useState("");
  const [restError, setRestError] = useState("");

  const resetCreatePageError = () => {
    setNameError("");
    setSortValueError("");
  };

  const getPageChoices = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/pages`
      );
      setPageChoices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPageChoices(); // eslint-disable-next-line
  }, []);

  const createSubPage = async (e) => {
    e.preventDefault();
    resetCreatePageError();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/sub-pages`,
        {
          name: name,
          sortValue: sortValue,
          mainPageId: mainPageId,
          content: JSON.stringify(
            draftToHtml(convertToRaw(content.getCurrentContent()))
          ),
        }
      );

      navigate("/sub-page");
    } catch (error) {
      const errors = error.response.data.errors;
      if (error.response.status === 422) {
        errors.map((error) => {
          if (error.key === "name") {
            return setNameError(error.message);
          } else if (error.key === "sortValue") {
            return setSortValueError(error.message);
          } else {
            return false;
          }
        });
      } else {
        setRestError(error.response.data.message);
      }
    }
  };

  const onEditorStateChange = (editorState) => {
    setContent(editorState);
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Form onSubmit={(e) => createSubPage(e)}>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <CardTitle>Add Sub Page</CardTitle>
                    {restError && (
                      <Alert className="text-danger">{restError}</Alert>
                    )}
                    <Row className="gap-2">
                      <Col md={12}>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-Label"
                        >
                          Sub Page Name
                        </Label>
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Sub Page Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          {nameError && (
                            <small className="text-danger">{nameError}</small>
                          )}
                        </div>
                      </Col>
                      <Col className="mt-2" md={12}>
                        <div>
                          <Label className="col-md-2 col-form-Label">
                            Sort
                          </Label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Sort"
                            value={sortValue}
                            onChange={(e) => setSortValue(e.target.value)}
                          />

                          {sortValueError && (
                            <small className="text-danger">
                              {sortValueError}
                            </small>
                          )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-Label"
                        >
                          Main Page
                        </Label>
                        <div>
                          <select
                            onChange={(e) => setMainPageId(e.target.value)}
                            className="form-control"
                          >
                            <option value={null}>
                              Please select main page
                            </option>
                            {pageChoices.map((pageChoice) => {
                              return (
                                <option
                                  key={pageChoice.id}
                                  value={pageChoice.id}
                                >
                                  {pageChoice.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="wysiwyg-custom">
                          <Editor
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            editorState={content}
                            onEditorStateChange={onEditorStateChange}
                          />
                        </div>
                      </Col>

                      <Col className="gap-2 d-grid" md={12}>
                        <button className="btn btn-success mt-3" type="submit">
                          Create Sub Page
                        </button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Form>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CreatePage;
