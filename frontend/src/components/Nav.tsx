import React from "react";
import favicon from "../assets/favicon.png";

export const Nav = () => (
  <nav>
    <ul>
      <li>
        <img className="logo" src="/favicon.png" alt="ds news logo" />
        <h1>ds news</h1>
      </li>
      <li>
        <a href="." className="selected">
          feed
        </a>
      </li>
      <li>
        <a href=".">about</a>
      </li>
      <li>
        <a href="https://github.com/login/oauth/authorize?client_id=3f43f5bebd8452ebf262&redirect_uri=http://localhost:3000/login&scope=repo&state=my+state">
          Login with Github
        </a>
      </li>
    </ul>
  </nav>
);
