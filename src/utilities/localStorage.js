const getStoredItems = () => {
  const storedItem = localStorage.getItem("item");
  return storedItem ? JSON.parse(storedItem) : [];
};

const saveToLS = (items) => {
  localStorage.setItem("item", JSON.stringify(items));
};

const addToLS = (id) => {
  const item = getStoredItems();
  item.push(id);
  saveToLS(item);
};

const removeFromLS = (id) => {
  console.log(id);
  const item = getStoredItems();
  const remaining = item.filter((i) => i !== id);
  saveToLS(remaining);
};

export { getStoredItems, addToLS, removeFromLS };
