import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./datatables.scss";

const Product = () => {
  document.title = " Product | Marketing tool platform";
  const { t } = useTranslation();

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
        label: "Pre-built Button",
        field: "preBuiltButton",
        sort: "asc",
        width: 270,
      },
      {
        label: "Pre-built Contents",
        field: "preBuiltContents",
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
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products`,
        { headers }
      );

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
          preBuiltButton: <AddPreBuiltButton id={fetchData[i].id} />,
          preBuiltContents: <AddPreBuiltContents id={fetchData[i].id} />,
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

  const AddPreBuiltButton = (props) => {
    return (
      <Link
        to={"/product/" + props.id + "/pre-built/button"}
        className="btn btn-primary waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Pre-built Button")}
      </Link>
    );
  };

  const AddPreBuiltContents = (props) => {
    return (
      <Link
        to={"/product/" + props.id + "/pre-built/contents"}
        className="btn btn-primary waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Pre-built Contents")}
      </Link>
    );
  };

  const AddProductButton = () => {
    return (
      <Link
        to="/product/create"
        className="btn btn-success waves-effect waves-light "
        type="button"
      >
        {t("Add Product")}
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
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${id}`,
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
            <h4>{t("Product")}</h4>
            <AddProductButton />
          </div>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of products.
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

export default Product;
