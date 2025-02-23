import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
const FoodItems = ({ items, handleAddToOrderItems }) => {
  return (
    <div className="md:w-9/12">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
        {items.map((item, i) => (
          <div key={i} className="card shadow-xl pb-4">
            <figure className="">
              <img src={item?.image} alt={item?.name} className="rounded-xl" />
            </figure>
            <div className="mt-5 space-y-3">
              <h2 className="font-bold text-xl">{item?.name}</h2>
              <p className="md:h-52 overflow-y-auto">
                Instructions :
                <span className="font-semibold">{item?.instructions}</span>
              </p>
            </div>

            <div className="grid mt-4 grid-cols-2 gap-4">
              <div>
                <h3 className="">
                  <span className="font-bold text-lg">Prep</span>:{" "}
                  {item?.prepTimeMinutes} min
                </h3>
              </div>
              <div>
                <p className="">
                  <span className="font-bold text-lg">Cook</span>:{" "}
                  {item?.cookTimeMinutes} min
                </p>
              </div>
              <div>
                <h3 className="">
                  <span className="font-bold text-lg">Cuisine</span>:{" "}
                  {item?.cuisine}
                </h3>
              </div>
              <div>
                <p className="">
                  <span className="font-bold text-lg">Difficulty</span>:{" "}
                  {item?.difficulty}
                </p>
              </div>
            </div>
            <ul className="list-decimal list-inside mt-3">
              {item?.ingredients.map((ingridient, i) => (
                <li key={i}>{ingridient}</li>
              ))}
            </ul>
            <p className="mt-3">
              <span className="font-bold text-lg">Meal Type</span> :{" "}
              <span>{item?.mealType}</span>
            </p>
            <p className="mt-3 flex items-center">
              <span className="font-bold text-lg">Rating</span> :{" "}
              <span className="">
                {item?.rating}{" "}
                {item?.rating > 4.8 && (
                  <span>
                    <FaStar className="inline-block" />{" "}
                    <FaStar className="inline-block" />{" "}
                    <FaStar className="inline-block" />
                    <FaStar className="inline-block" />
                    <FaStar className="inline-block" />
                  </span>
                )}
              </span>
            </p>
            <div className="flex mt-3">
              <button
                onClick={() => handleAddToOrderItems(item)}
                className="btn btn-primary "
              >
                Place Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FoodItems.propTypes = {
  items: PropTypes.array,
  handleAddToOrderItems: PropTypes.func,
};
export default FoodItems;
