import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import FoodItems from "./components/FoodItems/FoodItems";

function App() {

  const [items, setItems] =  useState([]);

  useEffect(() => {
    const loadData = async() => {
      const res = await fetch('https://dummyjson.com/recipes');
      const data = await res.json();
      setItems(data.recipes);
    }

    loadData()

  }, [])

  return <>

    <section className="max-w-[1440px] w-11/12 mx-auto flex flex-col-reverse md:flex-row py-10">
          <FoodItems items={items}></FoodItems>
    </section>


  
  </>;
}

export default App;
