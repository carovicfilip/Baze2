import { useState } from "react";
import { Container, Form, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const NavbarArchiveSearch = ({ news, setFilteredNews }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateFilterChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setSelectedDate(formattedDate);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const filteredNews = news.filter((vest) => {
      const isTitleMatch = vest.naslov
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isTagMatch = vest.tag
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isDateMatch = !selectedDate || vest.datum === selectedDate;

      if (isDateMatch && (isTitleMatch || isTagMatch) && searchQuery != "") {
        return true;
      } else {
        return false;
      }
    });

    setFilteredNews(filteredNews);
  };

  const handleAllButtonClick = () => {
    setFilteredNews(news);

    setSearchQuery("");
    setSelectedDate(null);
    navigate("/Archive");
  };

  return (
    <Navbar
      fixed="top"
      expand="lg"
      variant="light"
      className="bg-secondary shadow"
    >
      <Container fluid>
        <Navbar.Brand style={{ color: "yellow" }} as={Link} to={"/"} href="#">
        Vesti sve o svemu

        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>

          <Button
            className="ms-auto d-flex me-3"
            variant="outline-success"
            onClick={handleAllButtonClick}
          >
            Sve vesti
          </Button>

          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="text"
              placeholder="Pretraga"
              className="mr-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <DatePicker
              className="mx-2 p-2 bg-dark rounded"
              dateFormat="yyyy-MM-dd"
              selected={selectedDate}
              onChange={(date) => handleDateFilterChange(date)}
              placeholderText="Izaberite datum"
            />

            <Button className="p-2" variant="warning" type="submit">
              Pretrazi
            </Button>
          </Form>

          <Link
            to={`/Login`}
            className="btn btn-warning p-2 mx-2
          
          "
          >
            Prijava
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavbarArchiveSearch.propTypes = {
  news: PropTypes.array.isRequired,
  setFilteredNews: PropTypes.func.isRequired,
};

export default NavbarArchiveSearch;
