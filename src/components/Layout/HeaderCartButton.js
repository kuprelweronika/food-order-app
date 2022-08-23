import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  return (
    <button className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      {/* icon in component*/}
      <span>Your Cart</span> {/* text*/}
      <span className={classes.badge}>3</span>
      {/* badge with number of meals in cart*/}
    </button>
  );
};

export default HeaderCartButton;
