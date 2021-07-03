import React, { useState, useEffect } from "react";
import User from "./Data/User";
import Followers from "./Data/Followers";
import Repos from "./Data/Repos";
import axios from "axios";

const rootUrl = "https://api.github.com";
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(User);
  const [repos, setRepos] = useState(Repos);
  const [followers, setFollowers] = useState(Followers);

  // request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: "" });
  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }
  // Search User
  // const searchGithubUser = async (user) => {
  //   toggleError();
  //   setIsLoading(true);
  //   const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
  //     console.log(err)
  //   );
  //   if (response) {
  //     setGithubUser(response.data);
  //   } else {
  //     toggleError(true, "there is no user with that username");
  //   }
  //   checkRequests();
  //   setIsLoading(false);
  // };
  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "there is no user with that username");
    }
    checkRequests();
    setIsLoading(false);
  };
  //  check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          // toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => console.log(err));
  };
  // error
  useEffect(checkRequests, []);
  // get initial user
  useEffect(() => {
    searchGithubUser("Sabbirdiu");
  }, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export { GithubContext, GithubProvider };
