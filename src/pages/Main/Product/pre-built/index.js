import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import "./datatables.scss";

const PrebuiltProduct = () => {
  document.title = " Pre-built Button | Marketing tool platform";
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
        label: "Background Color",
        field: "backgroundColor",
        sort: "asc",
        width: 150,
      },
      {
        label: "Body Color",
        field: "bodyColor",
        sort: "asc",
        width: 150,
      },
      {
        label: "Text Color",
        field: "textColor",
        sort: "asc",
        width: 150,
      },
      {
        label: "Size",
        field: "size",
        sort: "asc",
        width: 270,
      },
      {
        label: "Top",
        field: "top",
        sort: "asc",
        width: 270,
      },
      {
        label: "Right",
        field: "right",
        sort: "asc",
        width: 270,
      },
      {
        label: "Bottom",
        field: "bottom",
        sort: "asc",
        width: 270,
      },
      {
        label: "Left",
        field: "left",
        sort: "asc",
        width: 270,
      },
      {
        label: "Icon Type",
        field: "iconType",
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
    getPrebuiltButtons(); // eslint-disable-next-line
  }, [isLoading]);

  const getPrebuiltButtons = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${productId}/prebuilt-buttons`,
        { headers }
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
          backgroundColor: fetchData[i].backgroundColor,
          bodyColor: fetchData[i].bodyColor,
          textColor: fetchData[i].textColor,
          size: fetchData[i].size,
          top: fetchData[i].top ? fetchData[i].top : "-",
          right: fetchData[i].right ? fetchData[i].right : "-",
          bottom: fetchData[i].bottom ? fetchData[i].bottom : "-",
          left: fetchData[i].left ? fetchData[i].left : "-",
          iconType: fetchData[i].iconType,
          icon: fetchData[i].icon,
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
        to={"/product/" + productId + "/pre-built/button/create"}
        className="btn btn-primary waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Add Pre-built")}
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
        `${process.env.REACT_APP_API_URL}/api/v1/admin/products/${productId}/prebuilt-buttons/${id}`,{headers}
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
            <h4>{t("Pre-built Button")}</h4>
            <AddPreBuiltProductButton />
          </div>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of pre-built buttons.
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
