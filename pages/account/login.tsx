import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { NextSeo } from 'next-seo';

import styled from 'styled-components';
import globalValue from '../../contexts/Global';
import PATHS from '../../lib/paths';
import LOGIN from '../../graphql/login';
import Layout from '../../components/Layout';
import { canonical } from '../../lib/analytics';

const ErrorBox = styled.div`
  width: 100%;
  padding: 30px 30px;
  color: red;
  border: 1px solid red;
`;

const Login = (): JSX.Element => {
  const global = useContext(globalValue);

  useEffect((): void => global.setActivePath(PATHS.LOGIN), [ global ]);

  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const [ loginMutation, {
    client, error,
  } ] = useMutation(LOGIN);

  if (global.user) document.location.pathname = PATHS.INDEX;

  const doLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { errors } = await loginMutation({
      variables: {
        email,
        password,
        remember: true,
      },
    });
    if (errors === undefined) await client?.resetStore();
  };

  const title = 'Dessert: log yourself in';
  const description = 'Log yourself in on Dessert!';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical('account/login')}
        openGraph={{
          title,
          description,
        }}
      />

      <Layout>
        <p className="h3 mt4">Login</p>
        { error && (
          <div className="mb2">
            <ErrorBox>Incorrect password or email</ErrorBox>
          </div>
        ) }
        <form noValidate onSubmit={doLogin}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            value={email}
            onChange={(e): void => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(e): void => setPassword(e.target.value)}
          />
          <div className="clearfix">
            <button type="submit" className="btn btn-primary right">Login</button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Login;
