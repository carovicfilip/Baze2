import { useUser } from "../components/UserHooks";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import FormCheck from "react-bootstrap/FormCheck";
import NavbarNovinar from "../components/navbars/NavBarNovinar";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userData } = useUser();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        console.log("ID " + id);
        const result = await axios.get(
          `http://localhost:8080/api/vest/one/${id}`
        );
        setNews(result.data);
      } catch (error) {
        console.error("Error loading news:", error);
      }
    };

    loadNews();
  }, [id]);

  const [newsData, setNewsData] = useState({
    naslov: "",
    tag: "",
    text: "",
    rubrikaName: "",
    username: userData.username,
  });

  useEffect(() => {
    if (news) {
      setNewsData({
        naslov: news.naslov,
        tag: news.tag,
        text: news.text,
        rubrikaName: news.rubrikaName,
        username: userData.username,
      });
    }
  }, [news, userData.username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    setNewsData((prevData) => ({
      ...prevData,
      text: value,
    }));
  };

  const handleCategorySelect = (category) => {
    setNewsData((prevData) => ({
      ...prevData,
      rubrikaName: category,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newsData.rubrikaName === "") {
      alert("Nisu sva polja popunjena");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/vest/update?id=${id}`,
        newsData
      );

      console.log(response);

      if (response.status === 200) {
        navigate(`/${userData.userId}/NewsNovinar/${news.id}`);

        console.log("News updated successfully");

        setNews(response.data);
      }
    } catch (error) {
      console.error("Error during news update:", error);
    }
  };

  const categoryOptions = userData.rubrike || [];

  return (
    <div>
      <NavbarNovinar />
      <Container className="border shadow rounded mt-5 p-3">
        <Row>
          <Col sm={{ span: 8, offset: 7 }}>
            <Button
              as={Link}
              to={`/${userData.userId}/NewsNovinar/${id}`}
              variant="outline-danger"
            >
              Go back
            </Button>
          </Col>
        </Row>
        <div className="mt-5" style={{ width: "600px" }}>
          <h1 className="mb-5">Edit news</h1>
          <Form onSubmit={handleSubmit}>
            <Dropdown className="mb-2">
              <Dropdown.Toggle variant="secondary" id="categoriesDropdown">
                Select Category
              </Dropdown.Toggle>
              <Dropdown.Menu className="p-3">
                {categoryOptions.map((category) => (
                  <FormCheck
                    required
                    style={{ fontSize: "17px" }}
                    key={category}
                    type="radio"
                    label={category}
                    checked={newsData.rubrikaName === category}
                    onChange={() => handleCategorySelect(category)}
                    name="category"
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter title"
                name="naslov"
                value={newsData.naslov}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter tag"
                name="tag"
                value={newsData.tag}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formText">
              <Form.Label>Text</Form.Label>
              <ReactQuill
                required
                className="mb-2"
                value={newsData.text}
                onChange={handleQuillChange}
                style={{ height: "300px" }}
              />
            </Form.Group>
            <Button className="mx-auto mt-5" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default EditNews;
