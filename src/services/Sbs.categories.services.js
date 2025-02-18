import Categories from "../models/Sbs.categories.model";

// service to create a category
export const createCat = async (catData) => {
  const { catName, catDescription } = catData;
  return await Categories.create({
    catName,
    catDescription,
  });
};

// service to retrieve all categories
export const getCat = async () => {
  return await Categories.find()
};

// service to retrieve a single category by id
export const getOneCat = async (id) => {
  return await Categories.findById(id)
};

// service to updated category info by id
export const updateCategory = async (id, catData) => {
  const { catName, catDescription } = catData;
  return await Categories.findByIdAndUpdate(id, {
    catName,
    catDescription,
  });
};

// service delete a category
export const deleteCategory = async (id) => {
  await Categories.findByIdAndDelete(id);
};
