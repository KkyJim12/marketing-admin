import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./datatables.scss";

const SubPage = () => {
  const AddSubPageButton = () => {
    const { t } = useTranslation();
    return (
      <Link
        to="/sub-page/create"
        className="btn btn-primary waves-effect waves-light "
        type="button"
      >
        {t("Add Sub Page")}
      </Link>
    );
  };

  const EditButton = (props) => {
    const { t } = useTranslation();
    return (
      <Link
        className="btn btn-warning waves-effect waves-light btn-sm "
        to={"/sub-page/" + props.id + "/edit"}
      >
        {t("Edit")}
      </Link>
    );
  };

  const deletePage = async (id) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/sub-pages/${id}`,
        { headers }
      );
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteButton = (props) => {
    const { t } = useTranslation();
    return (
      <button
        onClick={() => deletePage(props.id)}
        className="btn btn-danger waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Delete")}
      </button>
    );
  };

  const initData = {
    columns: [
      {
        label: "Page Name",
        field: "pageName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Sort Value",
        field: "sortValue",
        sort: "asc",
        width: 270,
      },
      {
        label: "Sub Menu Of",
        field: "subMenuOf",
        sort: "asc",
        width: 270,
      },
      {
        label: "Icon",
        field: "icon",
        sort: "asc",
        width: 270,
      },
      {
        label: "Edit",
        field: "edit",
        sort: "asc",
        width: 270,
      },
      {
        label: "Delete",
        field: "delete",
        sort: "asc",
        width: 270,
      },
    ],
    rows: [],
  };

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initData);

  const getSubPages = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/sub-pages`,
        { headers }
      );

      const fetchData = response.data.data;
      const clonedData = initData;

      for (let i = 0; i < fetchData.length; i++) {
        const newData = {
          pageName: fetchData[i].name,
          sortValue: fetchData[i].sortValue,
          subMenuOf: fetchData[i].pageId,
          icon: fetchData[i].icon,
          edit: <EditButton id={fetchData[i].id} />,
          delete: <DeleteButton id={fetchData[i].id} />,
        };

        if (fetchData[i].pageId) {
          newData.subMenuOf = fetchData[i].page.name;
        } else {
          newData.subMenuOf = "-";
        }

        clonedData.rows.push(newData);
      }

      setData(clonedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubPages(); // eslint-disable-next-line
  }, [isLoading]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="d-flex justify-content-between mb-2">
            <h4>{t("Sub Page")}</h4>
            <AddSubPageButton />
          </div>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of ordered sub pages.
                  </CardSubtitle>
                  {isLoading === false && (
                    <MDBDataTable
                      responsive
                      bordered
                      data={data}
                      noBottomColumns
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SubPage;
