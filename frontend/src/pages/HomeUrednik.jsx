import NewsCard from "../components/NewsCard";
import NavbarUrednik from "../components/navbars/NavbarUrednik";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useUser } from "../components/UserHooks";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomeUrednik = () => {
  const { userData } = useUser();

  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/vest/forApprove?userId=${userData.userId}`
    );
    setNews(result.data);
  };
  return (
    <div>
      {news.length != 0 ? (
        <>
          <NavbarUrednik />
          <Container
            fluid="lg"
            className="rounded p-3 mt-5 mb-2 bg-dark shadow "
            style={{ width: "70rem" }}
          >
            {news.map((vest) => (
              <div key={vest.id}>
                <Link to={`/${userData.userId}/NewsUrednik/${vest.id}`}>
                  <NewsCard {...vest} />
                </Link>
              </div>
            ))}
          </Container>
        </>
      ) : (
        <>
          <NavbarUrednik />
          <p>No new news to approve</p>
        </>
      )}
    </div>
  );
};

export default HomeUrednik;
