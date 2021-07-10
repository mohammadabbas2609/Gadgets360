import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
  const [keywords, setKeywords] = useState("");
  const history = useHistory();
  const submitHandler = e => {
    e.preventDefault();
    if (keywords.trim()) {
      history.push(`/search/${keywords}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onClick={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={e => {
          setKeywords(e.target.value);
        }}
        placeholder="Search Products"
        className="ml-sm-2 ml-sm-5 w-50"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
