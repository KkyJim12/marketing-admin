import React from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./datatables.scss";

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

const EditButton = () => {
  const { t } = useTranslation();
  return (
    <Link
      className="btn btn-warning waves-effect waves-light btn-sm "
      to="/page/1/edit"
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
      label: "Page Name",
      field: "pageName",
      sort: "asc",
      width: 150,
    },
    {
      label: "Sort",
      field: "sort",
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
  rows: [
    {
      id: 1,
      pageName: "About us",
      sort: 1,
      subMenuOf: "-",
      edit: <EditButton />,
      delete: <DeleteButton />,
    },
    {
      id: 2,
      pageName: "Company Profile",
      sort: 2,
      subMenuOf: "About us",
      edit: <EditButton />,
      delete: <DeleteButton />,
    },
  ],
};

const Page = () => {
  document.title = " Page | Marketing tool platform";
  const { t } = useTranslation();
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

export default Page;
