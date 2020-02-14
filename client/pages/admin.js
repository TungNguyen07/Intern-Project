import React from "react";
import Dashboard from "../components/Admin/DashBoard";
import Header from "../components/Header/HeaderComponent";

const Admin = () => {
  return (
    <div>
      <Header title="Admin" />
      <Dashboard />
    </div>
  );
};

export default Admin;
