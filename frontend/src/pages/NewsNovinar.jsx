import EditButtons from "../components/EditButtons";
import NavbarNovinar from "../components/navbars/NavbarNovinar";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NovinarReadNewsCard from "../components/NovinarReadNewsCard";
import NovinarPreviousComments from "../components/NovinarPreviousComments";
import axios from "axios";

const NewsNovinar = () => {
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

  console.log("KOMENTARI u NEWSPAGE " + JSON.stringify(news));
  return (
    <div>
      <NavbarNovinar />

      {news ? (
        <Container
          fluid="lg"
          className="rounded p-3 mt-5 mb-2 bg-dark shadow "
          style={{ width: "70rem" }}
        >
          <NovinarReadNewsCard {...news} />
          <EditButtons {...news} />
          <NovinarPreviousComments komentari={news.komentari} />
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsNovinar;
