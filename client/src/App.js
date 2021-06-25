import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Home from "./screens/Home";
import ProductDetails from "./screens/ProductDetails";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={ProductDetails} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
