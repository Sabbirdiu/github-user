import React, { useContext } from "react";
import { GithubContext } from "../context/context";
const Info = () => {
  const data = useContext(GithubContext);
  return <div>info :{data}</div>;
};

export default Info;
