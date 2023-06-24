import React from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./datatables.scss";

const AddProductButton = () => {
  const { t } = useTranslation();
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

const EditButton = () => {
  const { t } = useTranslation();
  return (
    <Link
      className="btn btn-warning waves-effect waves-light btn-sm "
      to="/product/1/edit"
    >
      {t("Edit")}
    </Link>
  );
};

const DeleteButton = () => {
  const { t } = useTranslation();
  return (
    <button
      className="btn btn-danger waves-effect waves-light btn-sm"
      type="button"
    >
      {t("Delete")}
    </button>
  );
};

const data = {
  columns: [
    {
      label: "Image",
      field: "image",
      sort: "asc",
      width: 150,
    },
    {
      label: "Product Name",
      field: "productName",
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
  rows: [
    {
      id: 1,
      image: (
        <img
          style={{ width: "75%", height: 50, objectFit: "cover" }}
          src="https://marketing-cta.netlify.app/static/media/product-1.177fc83a46c6592a200b.jpg"
          alt="product"
        />
      ),
      productName: "Test",
      domains: 3,
      duration: 30,
      price: 4000,
      edit: <EditButton />,
      delete: <DeleteButton />,
    },
  ],
};

const Product = () => {
  document.title = " Product | Marketing tool platform";
  const { t } = useTranslation();
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

                  <MDBDataTable
                    responsive
                    bordered
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

export default Product;
