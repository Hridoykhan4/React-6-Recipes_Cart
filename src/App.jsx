import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import FoodItems from "./components/FoodItems/FoodItems";
import toast from "react-hot-toast";
import OrderedItems from "./components/OrderedItems/OrderedItems";
import {
  addToLS,
  getStoredItems,
  removeFromLS,
} from "./utilities/localStorage";

function App() {
  const [items, setItems] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [tempItem, setTempItems] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("https://dummyjson.com/recipes");
      const data = await res.json();
      setItems(data.recipes);
      setCartLoad(data.recipes);
      setSpinner(false);
      setTempItems(data.recipes);
    };
    setSpinner(true);
    loadData();
  }, []);

  const setCartLoad = (data) => {
    const storedItems = getStoredItems();
    const dataAddArray = [];
    for (const id of storedItems) {
      const item = data.find((i) => i.id === id);
      dataAddArray.push(item);
    }
    setOrderItems(dataAddArray);
  };

  const handleRemove = (itemForRemove) => {
    const remaining = orderItems.filter((item) => item.id !== itemForRemove.id);
    setOrderItems(remaining);
    removeFromLS(itemForRemove.id);
    toast.success("Successfully Removed", {
      position: "top right",
      className: "p-5 text-lg font-semibold",
    });
  };

  const handleAddToOrderItems = (selectedItem) => {
    const count = orderItems.filter(
      (item) => item.id === selectedItem.id
    ).length;

    if (count >= 2) {
      toast.error(`Sorry, Out, We are out of ${selectedItem.name}`, {
        className: "p-6 font-semibold",
        position: "top right",
      });
    } else {
      addToLS(selectedItem.id);
      setOrderItems([...orderItems, selectedItem]);
      toast.success("Thanks for the order!!!", {
        position: "top right",
        className: "p-7 font-semibold text-xl tracking-wider",
      });
    }
  };

  const handleInputSearch = (e) => {
    const target = e.target.value;
    if (target) {
      const gatherMatched = [];
      for (const e of tempItem) {
        if (e.name.toLowerCase().includes(target.toLowerCase())) {
          gatherMatched.push(e);
        }
      }
      if (gatherMatched) {
        setItems(gatherMatched);
      }
    } else {
      setItems(tempItem);
    }
  };

  return (
    <>
      <div className="navbar flex justify-between bg-primary text-primary-content">
        <button className="btn btn-ghost sm:text-xl text-lg">
          Bistro Restaurant
        </button>
        <div className="text-black">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => handleInputSearch(e)}
              type="search"
              className="text-lg"
              required
              placeholder="Search"
            />
          </label>
        </div>
      </div>

      <div className="w-11/12 mx-auto my-3">
        <h3 className="text-lg font-semibold">
          Our Available Food Items: {items.length}
        </h3>
      </div>

      {spinner && (
        <div className="flex justify-center my-4">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      )}
      <section className="max-w-[1440px] w-11/12 mx-auto flex gap-5 flex-col-reverse md:flex-row pb-10">
        <FoodItems
          handleAddToOrderItems={handleAddToOrderItems}
          items={items}
        ></FoodItems>
        <OrderedItems
          handleRemove={handleRemove}
          orderItems={orderItems}
        ></OrderedItems>
      </section>
    </>
  );
}

export default App;
