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
import icons from "./icons.json";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageChoices, setPageChoices] = useState([]);
  const [name, setName] = useState("");
  const [sortType, setSortType] = useState("upper");
  const [sortValue, setSortValue] = useState("");
  const [subMenuOf, setSubMenuOf] = useState(null);
  const [content, setContent] = useState(() => EditorState.createEmpty());
  const [selectedIcon, setSelectedIcon] = useState("fas message");

  const [nameError, setNameError] = useState("");
  const [sortTypeError, setSortTypeError] = useState("");
  const [sortValueError, setSortValueError] = useState("");
  const [restError, setRestError] = useState("");

  const resetEditPageError = () => {
    setNameError("");
    setSortTypeError("");
    setSortValueError("");
  };

  const handleSelectedIcon = (e) => {
    setSelectedIcon(e.target.value);
  };

  const getPageChoices = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/pages`,
        { headers }
      );
      setPageChoices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPage = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/sub-pages/${id}/edit`,
        { headers }
      );
      const page = response.data.data;
      setName(page.name);
      setSortValue(page.sortValue);
      setSelectedIcon(page.icon);

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
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/sub-pages/${id}`,
        {
          name: name,
          sortValue: sortValue,
          subMenuOf: subMenuOf,
          icon: selectedIcon,
          content: JSON.stringify(
            draftToHtml(convertToRaw(content.getCurrentContent()))
          ),
        },
        { headers }
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
                      <Alert className="text-danger alert-danger">
                        {restError}
                      </Alert>
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
                          Sub menu of
                        </Label>
                        <div>
                          <select
                            onChange={(e) => setSubMenuOf(e.target.value)}
                            className="form-control"
                            value={subMenuOf}
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
                        <div className="form-floating mb-3">
                          <select
                            className="form-select"
                            id="floatingSelectGrid"
                            aria-label="Floating label select example"
                            onChange={handleSelectedIcon}
                            value={selectedIcon}
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
