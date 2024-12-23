import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import axios from "axios";
import moment from "moment";

const ManageProduct = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [days, setDays] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const revokeProduct = async (userProductId) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/users/${userProductId}/revoke`,
        {},
        { headers }
      );
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const extendProduct = async (userProductId) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/users/${userProductId}/extend`,
        {},
        { headers }
      );
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const ExtendButton = (props) => {
    return (
      <Button
        onClick={() => extendProduct(props.userProductId)}
        className="btn btn-primary waves-effect waves-light "
        type="button"
      >
        {t("Extend")}
      </Button>
    );
  };

  const RevokeButton = (props) => {
    return (
      <Button
        onClick={() => revokeProduct(props.userProductId)}
        className="btn btn-danger waves-effect waves-light "
        type="button"
      >
        {t("Revoke")}
      </Button>
    );
  };

  const initData = {
    columns: [
      { label: "ID", field: "id", width: 150 },
      { label: "White list domains", field: "whitelistDomains", width: 150 },
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
        label: "Extend",
        field: "extend",
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
    rows: [],
  };

  const [data, setData] = useState(initData);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    getUserProducts(); // eslint-disable-next-line
    getProducts();
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
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserProducts = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/users/${id}/manage-products`,
        { headers }
      );

      const fetchData = response.data.data;
      const clonedData = initData;

      console.log(fetchData)

      for (let i = 0; i < fetchData.length; i++) {
        const newData = {
          id: fetchData[i].id,
          packageName: fetchData[i].name,
          type: fetchData[i].type,
          domains: fetchData[i].domains,
          duration: fetchData[i].duration,
          remainingDays:
            moment(fetchData[i].endDate).diff(fetchData[i].startDate, "days") >
            0
              ? moment(fetchData[i].endDate).fromNow() +
                " (" +
                moment(fetchData[i].endDate).diff(
                  fetchData[i].startDate,
                  "days"
                ) +
                ")"
              : "-",
          status: fetchData[i].status,
          extend: <ExtendButton userProductId={fetchData[i].id} />,
          revoke:
            fetchData[i].status === "On going" ? (
              <RevokeButton userProductId={fetchData[i].id} />
            ) : (
              "-"
            ),
          whitelistDomains: fetchData[i].whitelistDomains
        };
        clonedData.rows.push(newData);
      }
      setData(clonedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToUser = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/users/${id}/add-product`,
        { productId: selectedProduct },
        { headers }
      );

      console.log(response);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
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
                  <CardTitle>Add product to user</CardTitle>
                  <Row>
                    <Col md={12}>
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-Label"
                      >
                        Product
                      </Label>
                      <div>
                        <select
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          className="form-control"
                        >
                          <option value="">Select Product</option>
                          {products.map((product) => {
                            return (
                              <option value={product.id} key={product.id}>
                                {product.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </Col>

                    <Col className="gap-2 d-grid" md={12}>
                      <button
                        onClick={addProductToUser}
                        className="btn btn-primary mt-3"
                        type="button"
                      >
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
