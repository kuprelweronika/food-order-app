import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
//domyslny stan koszyka
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    //concat- dodajemy nowy item do array i pozostawiamy pozostałe
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  //tworzymy useReducer
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    //dodajemy funkcję rozpoznawania zmiany stanu, podajemy item do reducera
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", item: item });
  };

  const cartContext = {
    item: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
