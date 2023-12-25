import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import "./datatables.scss";

const PrebuiltContents = () => {
  document.title = " Pre-built Contents | Marketing tool platform";
  const { t } = useTranslation();
  const { productId } = useParams();

  const initData = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
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

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initData);

  useEffect(() => {
    getPrebuiltContents(); // eslint-disable-next-line
  }, [isLoading]);

  const getPrebuiltContents = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${productId}/prebuilt-contents`,
        { headers }
      );

      console.log(response.data.data);

      const fetchData = response.data.data;
      const clonedData = initData;

      for (let i = 0; i < fetchData.length; i++) {
        const newData = {
          id: fetchData[i].id,
          name: fetchData[i].name,
          textColor: fetchData[i].textColor,
          textContent: fetchData[i].textContent,
          description: fetchData[i].description,
          destination: fetchData[i].destination,
          icon: fetchData[i].icon,
          class: fetchData[i].class,
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

  const AddPreBuiltProductButton = () => {
    return (
      <Link
        to={"/product/" + productId + "/pre-built/contents/create"}
        className="btn btn-primary waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Add Pre-built Contents")}
      </Link>
    );
  };

  const EditButton = (props) => {
    return (
      <Link
        to={`/product/${productId}/pre-built/contents/${props.id}/edit`}
        className="btn btn-warning waves-effect waves-light btn-sm"
      >
        {t("Edit")}
      </Link>
    );
  };

  const DeleteButton = (props) => {
    return (
      <button
        onClick={() => deletePrebuiltButton(props.id)}
        className="btn btn-danger waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Delete")}
      </button>
    );
  };

  const deletePrebuiltButton = async (id) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${productId}/prebuilt-contents/${id}`,
        { headers }
      );
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="d-flex justify-content-between mb-2">
            <h4>{t("Pre-built Contents")}</h4>
            <AddPreBuiltProductButton />
          </div>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of pre-built contents.
                  </CardSubtitle>

                  <MDBDataTable
                    bordered
                    responsive
                    data={data}
                    noBottomColumns
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PrebuiltContents;
