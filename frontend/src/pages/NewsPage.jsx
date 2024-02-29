import NavbarHome from "../components/navbars/NavbarHome";
import Comments from "../components/Comments";
import ReadNewsCard from "../components/ReadNewsCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

const NewsPage = () => {
  const { id } = useParams();
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

  console.log("NEWS u NEWSPAGE " + JSON.stringify(news));

  return (
    <div>
      <NavbarHome className="mb-4" />
      {news ? (
        <Container
          fluid="lg"
          className="rounded p-3 mt-5 mb-2 bg-dark shadow "
          style={{ width: "70rem" }}
        >
          <ReadNewsCard {...news} />
          <Container className="shadow-lg rounded p-3">
            <Comments {...news} />
          </Container>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsPage;
