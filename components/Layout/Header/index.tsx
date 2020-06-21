import useMedia from 'use-media';

import PATHS from '../../../lib/paths';
import HeaderElement from '../../HeaderElement';
import MenuBurger from '../../MenuBurger';
import MenuLarge from '../../MenuLarge';

const Header = (): JSX.Element => {
  const isWide = useMedia({ minWidth: 800 });

  return (
    <div className="p2 bg-black stylish-box">
      <div className="max-width-3 mx-auto">
        <div className="left">
          <HeaderElement to={PATHS.INDEX} name="Dessert" neverActive />
        </div>

        <ul className="list-reset m0 right-align">
          {
            isWide
              ? <MenuLarge />
              : <MenuBurger />
          }
        </ul>
      </div>
    </div>
  );
};

export default Header;
