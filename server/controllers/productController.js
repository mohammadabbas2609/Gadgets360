// import products from "../_data/products.js";
import ProductModel from "../models/productModel.js";

const getProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const getProductDetail = async (req, res, next) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  res.json(product);
};

export { getProducts, getProductDetail };
