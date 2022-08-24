import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import { number } from "prop-types";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  //wyciagamy ilość rzeczy wkoszyku
  //reduce pozwala zmienić array na single value
  //pierwsza wartosc to funckja, druga to wartosc strtowa czyli 0
  //funkcja wywołuje sie na kadym elemnecie
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      {/* icon in component*/}
      <span>Your Cart</span> {/* text*/}
      <span className={classes.badge}>{numberOfCartItems}</span>
      {/* badge with number of meals in cart*/}
    </button>
  );
};

export default HeaderCartButton;
