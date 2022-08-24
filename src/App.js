import React from "react";
import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  //tworzę state dla pokazywania lub ukrywania koszyka
  const [cartIsShown, setCartIsShown] = useState(false);

  //funkcja pokazująca
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  //funkcja ukrywająca
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  //Cart daję w IF
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
