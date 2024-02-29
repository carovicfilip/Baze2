import { Container } from "react-bootstrap";
import NewsCard from "../components/NewsCard";
import NavbarHome from "../components/navbars/NavbarHome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const result = await axios.get("http://localhost:8080/api/vest/todays");
    setNews(result.data);
  };
  console.log(news);

  return (
    <div>
      {news.length != 0 ? (
        <>
          <NavbarHome />
          <Container
            fluid="lg"
            className="rounded p-3 mt-5 mb-2 bg-dark shadow "
            style={{ width: "70rem" }}
          >
            {Array.isArray(news) &&
              news.map((vest) => (
                <div key={vest.id}>
                  <Link to={`/News/${vest.id}`}>
                    <NewsCard {...vest} />
                  </Link>
                </div>
              ))}
          </Container>
        </>
      ) : (
        <>
          <NavbarHome />
          <p>Nema novih vesti</p>
        </>
      )}
    </div>
  );
};

export default Home;
