import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  //przechwytywanie z bazy danych
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://meals-30d67-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals();
  }, []);
  // mapujemy elementy z naszego obiektu, i wkładamy je w element li
  //const mealsList = DUMMY_MEALS.map((meal) => <li>{meal.name}</li>);
  //teraz zamiast listować to to dajemy to do nowego komponentu
  //i podajemy odpowiednie wartosci do tego komponentu
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (!isLoading) {
    return (
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      <Card>
        <section className={classes.MealsLoading}>
          <p>Loading..</p>
        </section>
      </Card>
    </section>
  );
};

export default AvailableMeals;
