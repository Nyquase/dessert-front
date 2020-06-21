import { useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import PATHS from '../../lib/paths';
import useOutsideClick from '../../lib/useOutsideClick';
import HeaderElementBurger from '../HeaderElementBurger';
import globalValue from '../../contexts/Global';
import HeaderElement from '../HeaderElement';

const BarDiv = styled.div`
  width: 20px;
  height: 2.5px;
  background-color: white;
`;

const BarDivMargin = styled(BarDiv)`
  margin: 3px 0;
`;

const BurgerIconButton = styled.div`
  cursor: pointer;
`;

interface PropsIcon {
  handler: () => void;
}

const BurgerIcon = ({ handler }: PropsIcon): JSX.Element => (
  <BurgerIconButton
    onClick={handler}
    onKeyPress={handler}
    role="button"
    tabIndex={0}
  >
    <BarDivMargin />
    <BarDivMargin />
    <BarDiv />
  </BurgerIconButton>
);

const BURGER_PADDING = 15;

const MenuBox = styled.div`
  position: absolute;
  top: 60px;
  right: 7px;
  padding: ${BURGER_PADDING}px;
  box-shadow: 0 1px #FFFFFF inset,0 1px 3px rgba(34,25,25,0.4);
  background: white;
  text-align: center;
`;

const BurgerSeparator = styled.hr`
  margin-right: -${BURGER_PADDING}px;
  margin-left: -${BURGER_PADDING}px;
  border: 0;
  height: 1px;
  background: #ccc;
`;

const BurgerContent = (): JSX.Element => {
  const global = useContext(globalValue);
  const { user } = global;

  return (
    <MenuBox>
      <ul className="list-reset">
        <HeaderElementBurger to={PATHS.MODULES} name="Modules" />
        <HeaderElementBurger to={PATHS.DOCUMENTATION} name="Documentation" />
        <HeaderElementBurger to={PATHS.BLOG} name="Blog" />
        <BurgerSeparator />
        { user && (
          <HeaderElementBurger to={PATHS.PROFILE} name={`@${user.nickname}`} />
        ) }
        { !user && (
          <>
            <HeaderElementBurger to={PATHS.LOGIN} name="Login" />
            <HeaderElementBurger to={PATHS.REGISTER} name="Register" />
          </>
        ) }
      </ul>
    </MenuBox>
  );
};

// TODO: It may exist some code duplication with HeaderElement
// These two pieces of code could use some rework
const MenuBurger = (): JSX.Element => {
  const [ visible, setVisible ] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, (): void => {
    setVisible(false);
  });

  return (
    <div ref={ref}>
      <li className="inline-block">
        <BurgerIcon handler={(): void => setVisible(!visible)} />
        { visible && <BurgerContent /> }
      </li>
    </div>
  );
};

export default MenuBurger;
