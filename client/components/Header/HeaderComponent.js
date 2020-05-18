import React from "react";
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const Header = (props) => {
  return (
    <div>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link
        href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Header;
