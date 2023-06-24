import React from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./datatables.scss";

const AddUserButton = () => {
  const { t } = useTranslation();
  return (
    <Link
      to="/user/create"
      className="btn btn-success waves-effect waves-light "
      type="button"
    >
      {t("Add User")}
    </Link>
  );
};

const ManageProductButton = () => {
  const { t } = useTranslation();
  return (
    <Link
      to="/user/1/manage-product"
      className="btn btn-primary waves-effect waves-light btn-sm "
    >
      {t("Manage Product")}
    </Link>
  );
};

const EditButton = () => {
  const { t } = useTranslation();
  return (
    <Link
      className="btn btn-warning waves-effect waves-light btn-sm "
      to="/user/1/edit"
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
      label: "Full Name",
      field: "fullName",
      sort: "asc",
      width: 150,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 270,
    },
    {
      label: "Phone",
      field: "phone",
      sort: "asc",
      width: 270,
    },
    {
      label: "Manage Product",
      field: "manageProduct",
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
      fullName: "Piykarn nimmakulvirut",
      email: "piyakarn.nmk@gmail.com",
      phone: "0658528414",
      manageProduct: <ManageProductButton />,
      edit: <EditButton />,
      delete: <DeleteButton />,
    },
  ],
};

const User = () => {
  document.title = " User | Marketing tool platform";
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="d-flex justify-content-between mb-2">
            <h4>{t("User")}</h4>
            <AddUserButton />
          </div>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of ordered products.
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

export default User;
