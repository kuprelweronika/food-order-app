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

    //elementy nie kumuluja się w koszyku, tylko wszystko wyswietla sie osobno
    //wiec chcemy zrobic zeby sie kumulowaly
    //tworzymy stała index, która znajduje index itemu w arrayu
    //findIndex bierze funkcje, ktora dla danego itemu zwroci true
    //jesli znajdzie index i false otherwise
    //zwroci true jestli item.id==action.item.id
    //to finalnie zwróci index elementu ktory juz istnieje
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //wyciagam ten element po indexie
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        //kopiujemy poprzednie dane z koszyka
        ...existingCartItem,
        //zmieniamy amount
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    //else kiedy nie ma tego w koszyku
    else {
      updatedItems = state.items.concat(action.item);
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    //UPDATE CART, decrease amount by 1
    //szukamy elementu po indexie
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    //jestli to jest ostatniw koszyku to musimy go usunac z koszyka
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
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
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
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
