import { useContext } from 'react';
import PATHS from '../../lib/paths';
import HeaderElement from '../HeaderElement';
import globalValue from '../../contexts/Global';

const MenuLarge = (): JSX.Element => {
  const global = useContext(globalValue);
  const { user } = global;

  return (
    <>
      <HeaderElement to={PATHS.MODULES} name="Modules" />
      <HeaderElement to={PATHS.DOCUMENTATION} name="Documentation" />
      <HeaderElement to={PATHS.BLOG} name="Blog" />
      <span className="ml2">
        { user && (
          <HeaderElement to={PATHS.PROFILE} name={`@${user.nickname}`} last />
        ) }
        { !user && (
          <>
            <HeaderElement to={PATHS.LOGIN} name="Login" />
            <HeaderElement to={PATHS.REGISTER} name="Register" last />
          </>
        ) }
      </span>
    </>
  );
};

export default MenuLarge;
