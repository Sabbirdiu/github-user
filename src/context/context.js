import React, { useState, useEffect } from "react";
import User from "./Data/User";
import Followers from "./Data/Followers";
import Repos from "./Data/Repos";
const rootUrl = "https://api.github.com";
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(User);
  const [repos, setRepos] = useState(Repos);
  const [followers, setFollowers] = useState(Followers);
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers }}>
      {children}
    </GithubContext.Provider>
  );
};
export { GithubContext, GithubProvider };
