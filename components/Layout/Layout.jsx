import styles from '../../styles/Layout.module.scss';
import Dark from './Layout'
import { signOut } from '@lib/firebase';
import Social from './SocialFollow';
import { useAuth } from '@contexts/auth';
import { useRouter } from 'next/router'
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
    Button,
} from 'semantic-ui-react'

const Layout = ({ children }) => {
    const [user] = useAuth();
    const router = useRouter()

    return (
        <div className={styles.Layout}>

            <Menu fixed='top' inverted style={{ fontSize: "1.2rem" }}>
                <Container>
                    <Menu.Item as='a' header>
                        <Image size='mini' src='/logo.png' style={{ marginRight: '1.3em' }} />
                        <span>
                            <a href="/">My Blog</a>
                        </span>
                    </Menu.Item>
                    <Dropdown item simple text='Dropdown'>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Header Item</Dropdown.Header>
                            <Dropdown.Item>
                                <i className='dropdown icon' />
                                <span className='text'>Submenu</span>
                                <Dropdown.Menu>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <span onClick={() => router.push('/blogindex')}>Blog Index</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
                <Menu.Item>
                <Social />
                </Menu.Item>
                <Menu.Item >
                    {user && (
                        <span>
                            <Button onClick={() => signOut()}>Sign Out</Button>
                            <Button onClick={() => router.push('/create')}>Create</Button>

                        </span>
                    )}
                    {!user && (
                        <span>
                            <Button onClick={() => router.push('/signin')}>Sign in</Button>
                        </span>
                    )}
                </Menu.Item>
            </Menu>
            <nav>

            </nav>
            <main>
                <Dark/>
                {children}
            </main>
        </div>
    );
};

export default Layout;
