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
  const item = getStoredItems();
  const index = item.findIndex((i) => i === id);
  if (index !== -1) {
    const updated = [...item];
    updated.splice(index, 1);
    saveToLS(updated);
  }
};

export { getStoredItems, addToLS, removeFromLS };
