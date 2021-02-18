import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import styles from '@styles/signin.module.scss';
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Grid, Header,Message, Segment } from 'semantic-ui-react'
import Image from 'next/image'

const SignInPage = () => {
  const router = useRouter();
  const [user, userLoading] = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });

  if (userLoading) {
    return <h1>Loading...</h1>;
  }

  if (user && typeof window !== 'undefined') {
    router.push('/');
    return null;
  }

  const handleChange = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;

    setValues({ ...values, [id]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let missingValues = [];
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key);
      }
    });

    if (missingValues.length > 1) {
      alert(`You're missing these fields: ${missingValues.join(', ')}`);
      return;
    }

    signIn(values.email, values.password).catch((err) => {
      alert(err);
    });
  };

  return (



    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png'        
        alt="Picture of the author"
        width={400}
        height={400}
        /> Log-in to your account
      </Header>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' 
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            id="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          />

          <Button color='teal' fluid size='large' type="submit">
            Login
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>

  );
};

export default SignInPage;
