import React, { useContext } from "react";
import { GithubContext } from "../context/context";
const Info = () => {
  const data = useContext(GithubContext);
  console.log(data);
  return <div>info </div>;
};

export default Info;
