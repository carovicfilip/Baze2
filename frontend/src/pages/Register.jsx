import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Dropdown, FormCheck } from "react-bootstrap";
import NavbarGlavniUrednik from "../components/navbars/NavbarGlavniUrednik";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: false,
    rubrike: [],
  });
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "role") {
      setFormData((prevData) => ({
        ...prevData,
        role: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = formData.role ? "ROLE_UREDNIK" : "ROLE_NOVINAR";

    const userData = {
      ...formData,
      role,
      rubrike: selectedCategories,
    };
    console.log(JSON.stringify(userData));

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/new",
        userData
      );
      setFormData({
        username: "",
        password: "",
        role: false,
        rubrike: [],
      });

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleCategoryToggle = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(
          (selectedCategory) => selectedCategory !== category
        )
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };
  const categoryOptions = ["Politics", "Technology", "Sport", "Entertainment"];

  return (
    <div>
      <NavbarGlavniUrednik />
      <Container
        className="rounded p-4 bg-dark shadow "
        style={{ width: "600px" }}
      >
        <h2 className="mb-4" style={{ color: "white" }}>
          Register
        </h2>
        <Container className="p-4 bg-light rounded shadow">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mx-auto m-3" controlId="isUrednik">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Da li je urednik?"
                style={{ fontSize: "1.5rem", color: "red" }}
                onChange={(e) =>
                  handleInputChange({
                    target: { name: "role", checked: e.target.checked },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mx-auto m-3">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="categoriesDropdown">
                  Select Categories
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categoryOptions.map((category) => (
                    <FormCheck
                      key={category}
                      type="checkbox"
                      label={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Button className="mx-auto mt-3" variant="warning" type="submit">
              Register
            </Button>
          </Form>
        </Container>
      </Container>
    </div>
  );
};

export default Register;
