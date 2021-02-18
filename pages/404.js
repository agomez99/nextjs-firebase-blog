import Link from 'next/link'
import { Ghost } from 'react-kawaii';
import styles from '@styles/index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FourOhFour() {
  return <>
    <div className={styles.HomePage}>
      <h1 style={{ fontSize: "3rem", textAlign: "center" }}>404 - Page Not Found</h1>
      <Ghost size={"23rem"} mood="sad" color="#E0E4E8" />
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Link href="/"  >
          <a style={{ fontSize: "3rem", display: "inlineBlock" }}>
            Home
            <FontAwesomeIcon icon="home" size="1x"/>
        </a>
        </Link>
      </div>
    </div>
  </>
}