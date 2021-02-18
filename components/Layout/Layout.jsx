import styles from '../../styles/Layout.module.scss';

import { signOut } from '@lib/firebase';

import { useAuth } from '@contexts/auth';
import { useRouter } from 'next/router'


const Layout = ({ children }) => {
const [user] = useAuth();
const router = useRouter()

  return (
    <div className={styles.Layout}>
      <nav>
        <span>
          <a href="/">My Next.js Blog</a>
        </span>
        {user && (
          <span>
            <button onClick={() => signOut()}>Sign Out</button>
          </span>
        )}
        {!user && (
            <span>
            <button onClick={() => router.push('/signin')}>Sign In</button>
          </span>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
