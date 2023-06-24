import React from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";
import "./datatables.scss";

const ViewButton = () => {
  const { t } = useTranslation();
  return (
    <button
      className="btn btn-info waves-effect waves-light btn-sm "
      type="button"
    >
      {t("View")}
    </button>
  );
};

const AcceptButton = () => {
  const { t } = useTranslation();
  return (
    <button
      className="btn btn-success waves-effect waves-light btn-sm "
      type="button"
    >
      {t("Accept")}
    </button>
  );
};

const DeclineButton = () => {
  const { t } = useTranslation();
  return (
    <button
      className="btn btn-warning waves-effect waves-light btn-sm "
      type="button"
    >
      {t("Decline")}
    </button>
  );
};

const CancelButton = () => {
  const { t } = useTranslation();
  return (
    <button
      className="btn btn-danger waves-effect waves-light btn-sm"
      type="button"
    >
      {t("Cancel")}
    </button>
  );
};

const data = {
  columns: [
    {
      label: "Package Name",
      field: "packageName",
      sort: "asc",
      width: 150,
    },
    {
      label: "Type",
      field: "type",
      sort: "asc",
      width: 270,
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
      label: "Order Date",
      field: "orderDate",
      sort: "asc",
      width: 270,
    },
    {
      label: "Payment Date",
      field: "paymentDate",
      sort: "asc",
      width: 270,
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
      width: 270,
    },
    {
      label: "View",
      field: "view",
      sort: "asc",
      width: 270,
    },
    {
      label: "Accept",
      field: "accept",
      sort: "asc",
      width: 270,
    },
    {
      label: "Decline",
      field: "decline",
      sort: "asc",
      width: 270,
    },
    {
      label: "Cancel",
      field: "cancel",
      sort: "asc",
      width: 270,
    },
  ],
  rows: [
    {
      id: 1,
      packageName: "Floating action button #1",
      type: "Floating action button",
      domains: 3,
      duration: 30,
      orderDate: "15/06/2023",
      paymentDate: "-",
      status: "Wait for payment",
      view: <ViewButton />,
      accept: "",
      decline: "",
      cancel: <CancelButton />,
    },

    {
      id: 2,
      packageName: "Floating action button #1",
      type: "Floating action button",
      domains: 3,
      duration: 30,
      orderDate: "15/06/2023",
      paymentDate: "-",
      status: "Check Payment",
      view: <ViewButton />,
      accept: <AcceptButton />,
      decline: <DeclineButton />,
      cancel: <CancelButton />,
    },
    {
      id: 3,
      packageName: "Floating action button #1",
      type: "Floating action button",
      domains: 3,
      duration: 30,
      orderDate: "15/06/2023",
      paymentDate: "-",
      status: "Order Success",
      view: <ViewButton />,
      accept: "",
      decline: "",
      cancel: "",
    },

    {
      id: 3,
      packageName: "Floating action button #1",
      type: "Floating action button",
      domains: 3,
      duration: 30,
      orderDate: "15/06/2023",
      paymentDate: "-",
      status: "Order Cancel",
      view: <ViewButton />,
      accept: "",
      decline: "",
      cancel: "",
    },
  ],
};

const OrderHistory = () => {
  document.title = " Order History | Marketing tool platform";
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={t("Platform Name")}
            breadcrumbItem={t("Order History")}
          />
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

export default OrderHistory;
