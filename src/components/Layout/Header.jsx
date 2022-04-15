import mealsImage from '../../assets/meals.jpg';
import { Fragment } from 'react';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>GetFood</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="food" />
      </div>
    </Fragment>
  );
};

export default Header;