import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { NextSeo } from 'next-seo';

import globalValue from '../../contexts/Global';
import PATHS from '../../lib/paths';
import REGISTER from '../../graphql/register';
import Layout from '../../components/Layout';
import { canonical } from '../../lib/analytics';

const Register = (): JSX.Element => {
  const global = useContext(globalValue);

  useEffect((): void => global.setActivePath(PATHS.REGISTER), [ global ]);

  const [ email, setEmail ] = useState<string>('');
  const [ nickname, setNickname ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const [ registerMutation, {
    client, error,
  } ] = useMutation(REGISTER);

  if (global.user) document.location.pathname = PATHS.INDEX;

  const doRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { errors } = await registerMutation({
      variables: {
        email,
        nickname,
        password,
      },
    });
    if (errors === undefined) await client?.resetStore();
    document.location.pathname = PATHS.LOGIN;
  };

  const title = 'Dessert: register yourself';
  const description = 'Register yourself on Dessert!';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical('account/register')}
        openGraph={{
          title,
          description,
        }}
      />

      <Layout>
        <p className="h3 mt4">Register</p>
        { error && (
          <div className="p2 border-box border red mb2">
            <p>Error while registering</p>
          </div>
        ) }
        <form noValidate onSubmit={doRegister}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            value={email}
            onChange={(e): void => setEmail(e.target.value)}
          />
          <label htmlFor="nickname">Nickname</label>
          <input
            id="nickname"
            className="input"
            value={nickname}
            onChange={(e): void => setNickname(e.target.value)}
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
            <button type="submit" className="btn btn-primary right">Register</button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Register;
