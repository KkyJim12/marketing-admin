import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageChoices, setPageChoices] = useState([]);
  const [name, setName] = useState("");
  const [sortType, setSortType] = useState("upper");
  const [sortValue, setSortValue] = useState("");
  const [subMenuOf, setSubMenuOf] = useState(null);
  const [content, setContent] = useState(() => EditorState.createEmpty());

  const [nameError, setNameError] = useState("");
  const [sortTypeError, setSortTypeError] = useState("");
  const [sortValueError, setSortValueError] = useState("");
  const [restError, setRestError] = useState("");

  const resetEditPageError = () => {
    setNameError("");
    setSortTypeError("");
    setSortValueError("");
  };

  const getPageChoices = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/pages/choices/main`
      );
      setPageChoices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/pages/${id}/edit`
      );
      const page = response.data.data;
      setName(page.name);
      setSortType(page.sortType);
      setSortValue(page.sortValue);

      if (page.pageId) {
        setSubMenuOf(page.pageId);
      }

      const contentBlocks = convertFromHTML(JSON.parse(page.content));

      const contentState = ContentState.createFromBlockArray(
        contentBlocks.contentBlocks,
        contentBlocks.entityMap
      );

      setContent(EditorState.createWithContent(contentState));
    } catch (error) {
      console.log(error);
    }
  };

  const editPage = async (e) => {
    e.preventDefault();
    resetEditPageError();

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/pages/${id}`,
        {
          name: name,
          sortType: sortType,
          sortValue: sortValue,
          subMenuOf: subMenuOf,
          content: JSON.stringify(
            draftToHtml(convertToRaw(content.getCurrentContent()))
          ),
        }
      );

      navigate("/page");
    } catch (error) {
      const errors = error.response.data.errors;
      if (error.response.status === 422) {
        errors.map((error) => {
          if (error.key === "name") {
            return setNameError(error.message);
          } else if (error.key === "sortType") {
            return setSortTypeError(error.message);
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

  useEffect(() => {
    getPageChoices(); // eslint-disable-next-line
    getPage(); // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Form onSubmit={(e) => editPage(e)}>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <CardTitle>Edit Page</CardTitle>
                    {restError && (
                      <Alert className="text-danger">{restError}</Alert>
                    )}
                    <Row className="gap-2">
                      <Col md={12}>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-Label"
                        >
                          Page Name
                        </Label>
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Page Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          {nameError && (
                            <small className="text-danger">{nameError}</small>
                          )}
                        </div>
                      </Col>
                      <Col md={3}>
                        <Label className="col-md-2 col-form-Label">Sort</Label>
                        <div className="d-flex gap-2">
                          <div className="vstack gap-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="sortType"
                                id="upper"
                                value="upper"
                                onChange={() => setSortType("upper")}
                                checked={sortType === "upper"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="upper"
                              >
                                Upper
                              </label>
                            </div>
                          </div>
                          <div className="vstack gap-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="sortType"
                                id="middle"
                                value="middle"
                                onChange={() => setSortType("middle")}
                                checked={sortType === "middle"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="middle"
                              >
                                Middle
                              </label>
                            </div>
                          </div>
                          <div className="vstack gap-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="sortType"
                                id="lower"
                                value="lower"
                                onChange={() => setSortType("lower")}
                                checked={sortType === "lower"}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="lower"
                              >
                                Lower
                              </label>
                            </div>
                          </div>
                        </div>
                        {sortTypeError && (
                          <small className="text-danger">{sortTypeError}</small>
                        )}
                      </Col>
                      <Col className="mt-2" md={12}>
                        {sortType === "upper" || sortType === "lower" ? (
                          <>
                            <div>
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
                          </>
                        ) : (
                          <>
                            <select className="form-control">
                              <option value={null}>Select Position</option>
                              <option value={1}>
                                Between E-commerce and My Product
                              </option>
                              <option value={2}>
                                Between My Product and Order History
                              </option>
                            </select>
                            {sortValueError && (
                              <small className="text-danger">
                                {sortValueError}
                              </small>
                            )}
                          </>
                        )}
                      </Col>
                      <Col md={12}>
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-Label"
                        >
                          Sub menu of
                        </Label>
                        <div>
                          <select
                            onChange={(e) => setSubMenuOf(e.target.value)}
                            className="form-control"
                          >
                            <option value={null}>None</option>
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
                          Update Page
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

export default EditPage;