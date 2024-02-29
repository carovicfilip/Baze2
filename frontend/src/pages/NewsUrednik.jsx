import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NovinarReadNewsCard from "../components/NovinarReadNewsCard";

import axios from "axios";
import NavbarUrednik from "../components/navbars/NavbarUrednik";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NewsUrednik = () => {
  const navigate = useNavigate();
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

  const handleApprove = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/vest/toPublished?vestId=${news.id}`
      );

      if (response.data === "Success") {
        navigate(`/Urednik/${id}`);
        console.log("News sent for approve successfully");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  console.log("VEST U NEWSNOVINAR " + JSON.stringify(news));
  return (
    <div>
      <NavbarUrednik />

      {news ? (
        <>
          <NovinarReadNewsCard {...news} />
          <Button className="mt-2" onClick={handleApprove}>
            Approve
          </Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsUrednik;
