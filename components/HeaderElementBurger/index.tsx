import Link from 'next/link';
import { useContext } from 'react';
import styled from 'styled-components';

import globalContext from '../../contexts/Global';

interface MayBeActiveLinkProps {
  active: boolean;
}

const MayBeActiveLink = styled.a`
  border-bottom: ${(props: MayBeActiveLinkProps): string => (props.active ? '2px dashed black' : 'none')} !important;
  padding-bottom: ${(props: MayBeActiveLinkProps): string => (props.active ? '2px' : '0')} !important;
  color: black !important;
`;

interface ElementProps {
  name: string;
  to: string;
  neverActive?: boolean;
}

const HeaderElementBurger = ({ name, to, neverActive }: ElementProps): JSX.Element => {
  const global = useContext(globalContext);
  const { activePath } = global;

  return (
    <div style={{ margin: '15px 0px' }}>
      <li className="link">
        <Link href={to} passHref>
          <MayBeActiveLink active={activePath === to && !neverActive}>{ name }</MayBeActiveLink>
        </Link>
      </li>
    </div>
  );
};

export default HeaderElementBurger;
