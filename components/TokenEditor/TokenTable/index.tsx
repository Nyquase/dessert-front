import { useContext } from 'react';
import ModalDisplayContext from '../../../contexts/ModalDisplayer';
import { useApolloClient } from '@apollo/react-hooks';
import CREATE_TOKEN from '../../../graphql/createToken';
import Token from '../../../types/Token';

interface Props {
  tokens: Token[];
}

const TokenTable = (props: Props): JSX.Element => {
  const modalDisplayer = useContext(ModalDisplayContext);
  const apolloClient = useApolloClient();

  const deleteToken = async (tokenId: string) => {
    modalDisplayer.showConfirm({
      title: 'Delete token',
      content: (
        <div>
          <p>Do you really want to delete the token ?</p>
        </div>
      ),
      ok: {
        callback: async () => {
          alert('not implemented :/');
        },
      },
    });
  };

  return (
    <table className="mb2 table-flush table-light">
    <thead>
      <tr>
        <th>Description</th>
        <th>Token</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { props.tokens.map((token: any) => (
        <tr>
          <td>{ token.description }</td>
          <td>{ token.token }</td>
          <td>
            <button
              type="button"
              onClick={() => deleteToken(token.id)}
              className="btn btn-primary bg-red"
            >
              Delete
            </button>
          </td>
        </tr>
      )) }
    </tbody>
  </table>
  );
};

export default TokenTable;
