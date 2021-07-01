import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Search></Search>
      <Info />
      <User />
      <Repos />
    </div>
  );
};

export default Dashboard;
