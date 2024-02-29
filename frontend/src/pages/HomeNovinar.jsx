import { Link } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import NavbarNovinar from "../components/navbars/NavbarNovinar";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../components/UserHooks";

const HomeNovinar = () => {
  const { userData } = useUser();
  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/vest/my?userId=${userData.userId}`
    );
    setNews(result.data);
  };
  console.log(news);
  return (
    <div>
      {news.length != 0 ? (
        <>
          <NavbarNovinar />
          <Container
            fluid="lg"
            className="rounded p-3 mt-5 mb-2 bg-dark shadow "
            style={{ width: "70rem" }}
          >
            {news.map((vest) => (
              <div key={vest.id}>
                <Link to={`/${userData.userId}/NewsNovinar/${vest.id}`}>
                  <NewsCard {...vest} />
                </Link>
              </div>
            ))}
          </Container>
        </>
      ) : (
        <>
          <NavbarNovinar />
          <p>Trenutno nemate aktivnih vesti!</p>
        </>
      )}
    </div>
  );
};

export default HomeNovinar;
