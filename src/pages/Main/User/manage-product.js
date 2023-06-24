import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Label,
  Button,
} from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./datatables.scss";

const ManageProduct = () => {
  const { t } = useTranslation();
  const RevokeButton = () => {
    return (
      <Button
        className="btn btn-danger waves-effect waves-light "
        type="button"
      >
        {t("Revoke")}
      </Button>
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
        label: "Remaining Days",
        field: "remainingDays",
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
        label: "Revoke",
        field: "revoke",
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
        remainingDays: 15,
        status: "In Progress",
        revoke: <RevokeButton />,
      },
    ],
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={t("Jimmytechnology")}
            breadcrumbItem={t("Manage Product")}
          />
          <Row>
            <Col md={12}>
              <Row>
                <Col md={12}>
                  <Card>
                    <CardBody>
                      <CardSubtitle className="mb-3">
                        List of user products.
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
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <CardTitle>Add Product to user</CardTitle>
                  <Row>
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Product
                      </Label>
                      <div>
                        <select class="form-control">
                          <option>Select Product</option>
                          <option>ABC</option>
                        </select>
                      </div>
                    </Col>

                    <Col className="gap-2 d-grid" md={12}>
                      <button className="btn btn-success mt-3" type="submit">
                        Confirm
                      </button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ManageProduct;
