import { Card, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const ReadNewsCard = (props) => {
  const [likeCount, setLikeCount] = useState(props.brojLajkova);
  const [isLiked, setIsLiked] = useState(false);

  const [dislikeCount, setDislikeCount] = useState(props.brojDisajkova);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLikeClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/vest/like?id=${props.id}`
      );
      if (response.data === "Success") {
        setLikeCount((likeCount) => (isLiked ? likeCount - 1 : likeCount + 1));
        setIsLiked(!isLiked);
        if (isDisliked) {
          setDislikeCount(dislikeCount - 1);
          setIsDisliked(false);
        }
      }
    } catch (error) {
      console.error("Error liking news:", error);
    }
  };

  const handleDislikeClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/vest/dislike?id=${props.id}`
      );
      if (response.data === "Success") {
        setDislikeCount((dislikeCount) =>
          isDisliked ? dislikeCount - 1 : dislikeCount + 1
        );
        setIsDisliked(!isDisliked);
        if (isLiked) {
          setLikeCount(likeCount - 1);
          setIsLiked(false);
        }
      }
    } catch (error) {
      console.error("Error disliking news:", error);
    }
  };

  return (
    <Container>
      <Card className="mx-auto mt-5">
        <Row className="shadow rounded p-2">
          <Col className="d-flex justify-content-start ">#{props.tag}</Col>
          <Col>
            <Card.Title className="text-center">
              <h3>{props.naslov}</h3>
            </Card.Title>
          </Col>
          <Col className="d-flex justify-content-end ">
            Rubrika: {props.rubrika}
          </Col>
        </Row>

        <Card.Body className="mt-2">
          <Card.Text
            dangerouslySetInnerHTML={{ __html: props.text }}
          ></Card.Text>

          <Button
            variant={isLiked ? "success" : "outline-success"}
            onClick={handleLikeClick}
          >
            <FaThumbsUp /> ({likeCount})
          </Button>

          <Button
            variant={isDisliked ? "danger" : "outline-danger"}
            onClick={handleDislikeClick}
          >
            <FaThumbsDown /> ({dislikeCount})
          </Button>
        </Card.Body>
        <Row>
          <Col>Autor: {props.novinar}</Col>
          <Col>{props.date}</Col>
        </Row>
      </Card>
    </Container>
  );
};

ReadNewsCard.propTypes = {
  id: PropTypes.number.isRequired,
  brojLajkova: PropTypes.number.isRequired,
  brojDisajkova: PropTypes.number.isRequired,
  naslov: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  rubrika: PropTypes.string.isRequired,
  novinar: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ReadNewsCard;
