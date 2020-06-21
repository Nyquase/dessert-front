import Link from 'next/link';
import { useContext } from 'react';
import styled from 'styled-components';

import globalContext from '../../contexts/Global';

interface MayBeActiveLinkProps {
  active: boolean;
}

const MayBeActiveLink = styled.a`
  border-bottom: ${(props: MayBeActiveLinkProps): string => (props.active ? '2px dashed' : 'none')};
  padding-bottom: ${(props: MayBeActiveLinkProps): string => (props.active ? '2px' : '0')};
  color: white !important;
`;

interface ElementProps {
  name: string;
  to: string;
  neverActive?: boolean;
  last?: boolean;
}

const HeaderElement = ({
  last, name, to, neverActive,
}: ElementProps): JSX.Element => {
  const global = useContext(globalContext);
  const { activePath } = global;

  return (
    <li className={`link inline-block ${!last && 'mr2'}`}>
      <Link href={to} passHref>
        <MayBeActiveLink active={activePath === to && !neverActive}>{ name }</MayBeActiveLink>
      </Link>
    </li>
  );
};

export default HeaderElement;
