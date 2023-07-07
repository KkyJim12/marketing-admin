import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./datatables.scss";

const User = () => {
  document.title = " User | Marketing tool platform";
  const { t } = useTranslation();
  const initData = {
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
        label: "Last Login",
        field: "lastLogin",
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
    rows: [],
  };

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initData);

  useEffect(() => {
    getUsers(); // eslint-disable-next-line
  }, [isLoading]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/users`
      );

      const fetchData = response.data.data;
      const clonedData = initData;

      for (let i = 0; i < fetchData.length; i++) {
        const newData = {
          id: fetchData[i].id,
          fullName: fetchData[i].fullName,
          email: fetchData[i].email,
          phone: fetchData[i].phone,
          lastLogin: fetchData[i].lastLogin,
          manageProduct: <ManageProductButton id={fetchData[i].id} />,
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

  const ManageProductButton = (props) => {
    const { t } = useTranslation();
    return (
      <Link
        to={"/user/" + props.id + "/manage-product"}
        className="btn btn-primary waves-effect waves-light btn-sm "
      >
        {t("Manage Product")}
      </Link>
    );
  };

  const EditButton = (props) => {
    const { t } = useTranslation();
    return (
      <Link
        className="btn btn-warning waves-effect waves-light btn-sm "
        to={"/user/" + props.id + "/edit"}
      >
        {t("Edit")}
      </Link>
    );
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/users/${id}`
      );
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteButton = (props) => {
    const { t } = useTranslation();

    return (
      <button
        onClick={() => deleteUser(props.id)}
        className="btn btn-danger waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Delete")}
      </button>
    );
  };

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
                  <CardSubtitle className="mb-3">List of users.</CardSubtitle>
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

export default User;
