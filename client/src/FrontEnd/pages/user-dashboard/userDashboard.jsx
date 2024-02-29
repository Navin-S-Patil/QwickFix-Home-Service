import React, { useState, useEffect } from "react";
import style from "./userDashboard.module.css";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { styled } from "@mui/system";

const StyledDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  "& .MuiDataGrid-cell": {
    fontSize: "14px",
    color: "#333",
  },
});

function UserDashboard() {
  const [data, setData] = useState({});

  // Data is passed in local storage from sign in form
  useEffect(() => {
    const response = localStorage.getItem("response");
    if (response) {
      setData(JSON.parse(response));
    }
  }, []);

  const columns = [
    { field: "service.id", headerName: "ID", width: 70 },
    { field: "service.name", headerName: "Name", width: 130 },
    { field: "service.email", headerName: "Email", width: 130 },
    { field: "service.serviceName", headerName: "Service Name", width: 130 },
    {
      field: "service.serviceDesc",
      headerName: "Service Description",
      width: 130,
    },
    { field: "service.date", headerName: "Date", width: 130 },
    { field: "service.address", headerName: "Address", width: 130 },
    { field: "service.phone", headerName: "Phone", width: 130 },
    { field: "service.serviceStatus", headerName: "Status", width: 130 },
  ];

  const [rows, setRows] = useState([]);

  // const rows = [
  //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  async function handleClick() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/service/getServices",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1 className={style.heading}>Welcome, {data.name}!</h1>
      </header>

      <section className={style.section}>
        <div className={style.infoCard}>
          <h2>Your Profile</h2>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Role:</strong> {data.role}
          </p>
        </div>

        <div className={style.actions}>
          <button className={style.button}>Edit Profile</button>
          <button className={style.button}>Change Password</button>
        </div>
      </section>

      <section className={style.section}>
        <div className={style.ordersCard}>
          <h2>Your Orders</h2>
          {/* table add kar, yat 1. sr no. 2. order date. 3. detail. 4. status */}
          {/* Display a list of user's orders or recent activity */}
          {rows.length == 0 ? (
            <div style={{ height: "auto", width: "100%" }}>
              <p>Order Is empty, please make some order</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className={style.ordersTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name & Email</th>
                    <th>Service Name & Desc</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {row.service.name} <br /> {row.service.email}
                      </td>
                      <td>
                        {row.service.serviceName} <br />{" "}
                        {row.service.serviceDesc}
                      </td>
                      <td>
                        Service Date : {row.service.date.split("T")[0]} <br />{" "}
                        Booking Date : {row.service.time.split("T")[0]}{" "}
                      </td>
                      <td>{row.service.address}</td>
                      <td>{row.service.phone}</td>
                      <td className={row.service.serviceStatus == "Pending"? style.pendingOrder : null} >{row.service.serviceStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button className={style.loadButton} onClick={handleClick}>
            Load Order
          </button>
        </div>

        <div className={style.recentActivity}>
          <h2>Recent Activity</h2>
          {/* Display recent user activity or notifications */}
        </div>
      </section>

      <section className={style.section}>
        <div className={style.supportCard}>
          <h2>Customer Support</h2>
          <p>Contact us if you need assistance.</p>
          <button className={style.button}>Contact Support</button>
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
