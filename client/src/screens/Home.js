import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProduct = async () => {
      const { data } = await axios.get("api/products");
      setProducts(data);
    };

    getAllProduct();
  }, []);
  return (
    <>
      {products && (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={6} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
