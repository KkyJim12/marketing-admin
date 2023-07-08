import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import "./datatables.scss";

const PrebuiltProduct = () => {
  document.title = " Product | Marketing tool platform";
  const { t } = useTranslation();
  const { id } = useParams();

  const initData = {
    columns: [
      {
        label: "Image",
        field: "image",
        sort: "asc",
        width: 150,
      },
      {
        label: "Product Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Product Type",
        field: "type",
        sort: "asc",
        width: 150,
      },
      {
        label: "Domains",
        field: "domains",
        sort: "asc",
        width: 270,
      },
      {
        label: "Duration",
        field: "duration",
        sort: "asc",
        width: 270,
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 270,
      },
      {
        label: "Pre-built",
        field: "preBuilt",
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
    getProducts(); // eslint-disable-next-line
  }, [isLoading]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products`
      );

      console.log(response.data.data);

      const fetchData = response.data.data;
      const clonedData = initData;

      for (let i = 0; i < fetchData.length; i++) {
        const newData = {
          id: fetchData[i].id,
          image: (
            <img
              style={{ width: 50, height: 50, objectFit: "cover" }}
              src={fetchData[i].image}
              alt={fetchData[i].name}
            />
          ),
          name: fetchData[i].name,
          type: fetchData[i].type,
          domains: fetchData[i].domains,
          duration: fetchData[i].duration,
          price: fetchData[i].price,
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
        to={"/product/" + id + "/pre-built/create"}
        className="btn btn-primary waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Add Pre-built")}
      </Link>
    );
  };

  const EditButton = (props) => {
    return (
      <Link
        className="btn btn-warning waves-effect waves-light btn-sm "
        to={"/product/" + props.id + "/edit"}
      >
        {t("Edit")}
      </Link>
    );
  };

  const DeleteButton = (props) => {
    return (
      <button
        onClick={() => deleteProduct(props.id)}
        className="btn btn-danger waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Delete")}
      </button>
    );
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${id}`
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
            <h4>{t("Pre-built Product")}</h4>
            <AddPreBuiltProductButton />
          </div>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of products.
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

export default PrebuiltProduct;
