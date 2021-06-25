import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import Rating from "../components/Rating";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };

    getProduct();
  }, [id]);
  return (
    <>
      {product && (
        <>
          <Link className="btn btn-light my-2" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image fluid src={product.image} alt={product.image} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      disabled={product.countInStock === 0}
                      className="btn-block btn-dark"
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetails;
