import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import Slider from "../components/Slider";
import Title from "../components/Title";
import Filter from "../components/Filter";

const Home = () => {
  const dispatch = useDispatch();

  const { keywords, pageNumber } = useParams();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keywords, pageNumber));
  }, [dispatch, keywords, pageNumber]);

  return (
    <>
      <Title title="Gadgets 360 | Home" />
      {products && (
        <>
          {!keywords && <Slider />}
          <h1>Latest Products</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Filter products={products} />
              <Row>
                {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={6} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                page={page}
                pages={pages}
                keywords={keywords ? keywords : ""}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
