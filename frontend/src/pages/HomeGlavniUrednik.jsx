import NewsCard from "../components/NewsCard";
import NavbarGlavniUrednik from "../components/navbars/NavbarGlavniUrednik";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const HomeGlavniUrednik = () => {
  const [allNews, setNews] = useState([]);
  useEffect(() => {
    const loadNews = async () => {
      const result = await axios.get("http://localhost:8080/api/vest/all");
      setNews(result.data);
    };

    loadNews();
  }, []);

  return (
    <>
      {allNews.length != 0 ? (
        <>
          <NavbarGlavniUrednik />
          <Container
            fluid="lg"
            className="rounded p-3 mt-5 mb-2 bg-dark shadow "
            style={{ width: "70rem" }}
          >
            {allNews.map((vest) => (
              <div key={vest.id}>
                <NewsCard {...vest} />
              </div>
            ))}
          </Container>
        </>
      ) : (
        <>
                  <NavbarGlavniUrednik />

          <p>Trenutno nema vesti za prikaz!</p>
        </>
      )}
    </>
  );
};

export default HomeGlavniUrednik;
