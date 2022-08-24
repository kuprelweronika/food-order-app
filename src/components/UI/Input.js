import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      {/*tutaj robie mocno konfigurowalny z rodzica input, i dla labela
    przypisuję id inputa, trik  w inpucie pobiera wszystkie dane z propsa
    niepotrzebne jest przypisywanie mu id bo one jest w ...*/}
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input}></input>
    </div>
  );
};

export default Input;
