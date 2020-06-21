import { useApolloClient } from '@apollo/react-hooks';
import { useContext } from 'react';
import TokenTable from './TokenTable';
import CREATE_TOKEN from '../../graphql/createToken';
import ModalDisplayContext from '../../contexts/ModalDisplayer';
import Token from '../../types/Token';

interface Props {
  tokens: Token[];
}

const TokenEditor = (props: Props): JSX.Element => {
  const apolloClient = useApolloClient();
  const modalDisplayer = useContext(ModalDisplayContext);
  const { tokens } = props;

  const createToken = async () => {
    const res = await apolloClient.mutate({
      mutation: CREATE_TOKEN,
      refetchQueries: [ 'getUser' ], // refresh the user haha
      variables: {
        description: 'A little token :)',
      },
    });
    modalDisplayer.showConfirm({
      title: 'New token',
      content: (
        <div>
          <p>{ res.data.createToken }</p>
          <p>This is your token, it will only be displayed once.</p>
        </div>
      ),
    });
  };

  return (
    <>
      <p className="h3 mt4">API Keys</p>
      <p>
        API keys could be generated from the command line or the website.
        Please, make sure you keep them secret. You can also revoke them.
      </p>
      { tokens.length === 0 && (
        <h4>You do not have any token yet.</h4>
      ) }
      { tokens.length > 0 && (
        <TokenTable tokens={tokens} />
      ) }
      <button
        type="button"
        onClick={createToken}
        className="btn btn-primary"
      >
        Create Token
      </button>
    </>
  );
};

export default TokenEditor;
