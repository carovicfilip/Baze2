import { useState } from "react";
import NavbarArchiveSearch from "../components/navbars/NavbarArchiveSearch";
import { Container } from "react-bootstrap";
import NewsCard from "../components/NewsCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Archive = () => {
  const [allNews, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8080/api/vest/published"
        );
        setNews(result.data);
        setFilteredNews(result.data);
      } catch (error) {
        setError("Error loading news");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const handleFilterChange = (filteredNewsData) => {
    setFilteredNews(filteredNewsData);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <NavbarArchiveSearch
        news={allNews}
        setFilteredNews={handleFilterChange}
      />
      <Container
        fluid="lg"
        className="rounded p-3 mt-5 mb-2 bg-dark shadow "
        style={{ width: "70rem" }}
      >
        {filteredNews.map((vest) => (
          <div key={vest.id}>
            <Link to={`/News/${vest.id}`}>
              <NewsCard {...vest} />
            </Link>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Archive;
