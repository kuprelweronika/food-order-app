import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  //state do sprawdzania czy jest dobrze wprowadzona ilosc
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    //ten value bedzie stringiem wiec zamieniamy go na number
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add</button>
      {/* tu na koncu wyswietlam  w razie gdyby input byl zly*/}
      {!amountIsValid && <p>Please enter a valid Amount (1-5)</p>}
    </form>
  );
};
export default MealItemForm;
