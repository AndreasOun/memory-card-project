import React from "react";
import githubLogo from '../images/github-logo.png';


function Footer() {
    return (
        <div id="footer">
          <img src={githubLogo} alt="Github logo" className="github-logo" />
          <p>Created by <a href="https://github.com/AndreasOun" target="_blank" rel="noreferrer">AndreasOun</a></p>
        </div>
      );
    }
    
export default Footer;
