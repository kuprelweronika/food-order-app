import React from "react";
import classes from "./Input.module.css";

//zmieniam bo chcę uzywac refa
//const Input = (props) => {

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      {/*tutaj robie mocno konfigurowalny z rodzica input, i dla labela
    przypisuję id inputa, trik  w inpucie pobiera wszystkie dane z propsa
    niepotrzebne jest przypisywanie mu id bo one jest w ...*/}
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input}></input>
    </div>
  );
});

export default Input;
