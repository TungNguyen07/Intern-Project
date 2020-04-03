import React from "react";

import Header from "../components/Header/HeaderComponent";
import Dashboard from "../components/Admin/DashboardComponent";
import withAuthAdmin from "../auth/AuthAdminHOC";

const Admin = () => {
  return (
    <div>
      <Header title="Admin" />
      <Dashboard />
    </div>
  );
};

export default withAuthAdmin(Admin);
