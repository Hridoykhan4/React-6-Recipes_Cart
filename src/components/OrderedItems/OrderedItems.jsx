import PropTypes from "prop-types";

function OrderedItems({ orderItems, handleRemove }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-2 underline text-purple-700">
        Cart Items: {orderItems.length}
      </h3>
      <div className="overflow-x-auto rounded-box border border-base-content/20 bg-base-200">
        <table className="table">
          <caption className="text-lg underline underline-offset-2">
            Cart Details
          </caption>
          {/* head */}
          <thead>
            <tr>
              <th>title</th>
              <th>cuisine</th>
              <th>image</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, id) => (
              <tr key={id} className="">
                <td>{item?.name}</td>
                <td>{item?.cuisine}</td>
                <td>
                  <img className="w-16 rounded-lg" src={item?.image} alt="" />
                </td>

                <td
                  onClick={() => handleRemove(item)}
                  className="btn-error text-white btn"
                >
                  Remove
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

OrderedItems.propTypes = {
  orderItems: PropTypes.array,
  handleRemove: PropTypes.func,
};

export default OrderedItems;
