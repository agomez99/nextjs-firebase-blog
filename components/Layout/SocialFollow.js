import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../../styles/Layout.module.scss';

import {
    faLinkedin,
    faTwitter,
    faGithub
  } from "@fortawesome/free-brands-svg-icons";
  const SocialFollow = () => {
    return (
<div className={styles.Layout}>
      <a href="https://www.linkedin.com/in/austine-gomez/"
        className="linkedin social">
        <FontAwesomeIcon icon={faLinkedin} size="3x" />
      </a>
      <a href="https://twitter.com/austine_gomez"
        className="twitter social" >
        <FontAwesomeIcon icon={faTwitter} size="3x" />
      </a>
      <a href="https://github.com/agomez99"
        className="github social" id="git">
        <FontAwesomeIcon icon={faGithub} size="3x" />
      </a>
</div>
  );
}

export default SocialFollow;