import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  //wyciagamy ilość rzeczy wkoszyku
  //reduce pozwala zmienić array na single value
  //pierwsza wartosc to funckja, druga to wartosc strtowa czyli 0
  //funkcja wywołuje sie na kadym elemnecie
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const { items } = cartCtx;

  //lacze dwie klasy w jedna, wiec domyslnie teraz caly czas
  //przycisk robi bump
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  //zeby robil bump za kazdym dodaniem elementu do koszyka uzywam
  //useEffect

  useEffect(() => {
    //chcemy zmieniac button class - dodawac i usuwac
    //tu bedzie timer ktory bedzie usuwal
    //musimy zaimportowac takze useState

    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]); //ma sie wywolac zawsze jaksie zmieni cartCtx -> items
  //to powoduje ze sie wywola tylko raz, wiec dodajemy seTimeout
  //trzeba cleanup ten Timer iec dodaje funkcje czyszczaca

  return (
    <button className={btnClasses} onClick={props.onClick}>
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
