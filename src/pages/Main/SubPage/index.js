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
        className="btn btn-success waves-effect waves-light "
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
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/pages/${id}`
      );
      getSubPages();
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
        label: "Sort Type",
        field: "sortType",
        sort: "asc",
        width: 270,
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

  document.title = " Page | Marketing tool platform";
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initData);

  const getSubPages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/sub-pages`
      );

      const fetchData = response.data.data;
      const clonedData = initData;

      for (let i = 0; i < fetchData.length; i++) {
        const newData = {
          pageName: fetchData[i].name,
          sortType: fetchData[i].sortType,
          sortValue: fetchData[i].sortValue,
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
    getSubPages();
  }, []);

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
