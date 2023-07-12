import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  Container,
  Modal,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";
import "./datatables.scss";

const OrderHistory = () => {
  document.title = " Order History | Marketing tool platform";
  const { t } = useTranslation();

  const ViewButton = (props) => {
    if (props.status === "Wait for checking" || props.status === "Success") {
      return (
        <button
          onClick={() => toggleViewSlipModal(props.image)}
          className="btn btn-info waves-effect waves-light btn-sm "
          type="button"
        >
          {t("View")}
        </button>
      );
    } else {
      return <>-</>;
    }
  };

  const AcceptButton = (props) => {
    if (props.status === "Wait for checking") {
      return (
        <button
          onClick={() => acceptOrder(props.id)}
          className="btn btn-success waves-effect waves-light btn-sm "
          type="button"
        >
          {t("Accept")}
        </button>
      );
    } else {
      return <>-</>;
    }
  };

  const acceptOrder = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/orders/${id}/accept`
      );

      console.log(response);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const DeclineButton = (props) => {
    if (props.status === "Wait for checking") {
      return (
        <button
          onClick={() => declineOrder(props.id)}
          className="btn btn-warning waves-effect waves-light btn-sm "
          type="button"
        >
          {t("Decline")}
        </button>
      );
    } else {
      return <>-</>;
    }
  };

  const declineOrder = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/orders/${id}/decline`
      );

      console.log(response);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const CancelButton = (props) => {
    if (props.status === "Cancel" || props.status === "Success") {
      return <>-</>;
    } else {
      return (
        <button
          onClick={() => cancelOrder(props.id)}
          className="btn btn-danger waves-effect waves-light btn-sm"
          type="button"
        >
          {t("Cancel")}
        </button>
      );
    }
  };

  const cancelOrder = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/orders/${id}/cancel`
      );

      console.log(response);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const initData = {
    columns: [
      {
        label: "Order ID",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Package Name",
        field: "name",
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
        label: "Price",
        field: "price",
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
    rows: [],
  };

  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrders(); // eslint-disable-next-line
  }, [isLoading]);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/orders`
      );

      console.log(response.data.data);

      const fetchData = response.data.data;
      const clonedData = initData;

      for (let i = 0; i < fetchData.length; i++) {
        const newData = {
          id:
            fetchData[i].id.substring(0, 4) +
            "..." +
            fetchData[i].id.substring(
              fetchData[i].id.length - 5,
              fetchData[i].id.length - 1
            ),
          name: fetchData[i].name,
          type: fetchData[i].type,
          domains: fetchData[i].domains,
          duration: fetchData[i].duration,
          price: fetchData[i].price,
          orderDate: moment(fetchData[i].createdAt).format(
            "DD/MM/YYYY, h:mm a"
          ),
          paymentDate: fetchData[i].paymentDate
            ? moment(fetchData[i].paymentDate).format("DD/MM/YYYY, h:mm a")
            : "-",
          status: fetchData[i].status,
          view: (
            <ViewButton
              status={fetchData[i].status}
              image={fetchData[i].image}
            />
          ),
          accept: (
            <AcceptButton id={fetchData[i].id} status={fetchData[i].status} />
          ),
          decline: (
            <DeclineButton id={fetchData[i].id} status={fetchData[i].status} />
          ),
          cancel: (
            <CancelButton id={fetchData[i].id} status={fetchData[i].status} />
          ),
        };
        clonedData.rows.push(newData);
      }
      setData(clonedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [viewSlipModal, setViewSlipModal] = useState(false);
  const [slipImage, setSlipImage] = useState("");
  const toggleViewSlipModal = (imageUrl) => {
    console.log(imageUrl);
    setViewSlipModal(!viewSlipModal);
    setSlipImage(imageUrl);
  };

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

          <Modal
            isOpen={viewSlipModal}
            toggle={() => {
              toggleViewSlipModal("");
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                View Slip
              </h5>
              <button
                type="button"
                onClick={() => {
                  setViewSlipModal(false);
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: 300, objectFit: "cover" }}
                  src={slipImage}
                  alt="slip"
                />
              </div>
            </div>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OrderHistory;
