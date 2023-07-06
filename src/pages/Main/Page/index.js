import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./datatables.scss";

const Page = () => {
  document.title = " Page | Marketing tool platform";
  const { t } = useTranslation();
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

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initData);

  useEffect(() => {
    getPages();
  }, [isLoading]);

  const getPages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/pages`
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

        clonedData.rows.push(newData);
      }

      setData(clonedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const AddPageButton = () => {
    const { t } = useTranslation();
    return (
      <Link
        to="/page/create"
        className="btn btn-success waves-effect waves-light "
        type="button"
      >
        {t("Add Page")}
      </Link>
    );
  };

  const EditButton = (props) => {
    const { t } = useTranslation();
    return (
      <Link
        className="btn btn-warning waves-effect waves-light btn-sm "
        to={"/page/" + props.id + "/edit"}
      >
        {t("Edit")}
      </Link>
    );
  };

  const deletePage = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/pages/${id}`
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="d-flex justify-content-between mb-2">
            <h4>{t("Page")}</h4>
            <AddPageButton />
          </div>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of ordered pages.
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

export default Page;
