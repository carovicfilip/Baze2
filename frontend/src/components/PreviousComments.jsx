import { Card, Button, Row, Col } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import PropTypes from "prop-types";

const PreviousComments = ({ comments, handleLike, handleDislike }) => {
  console.log(comments);
  return (
    <div className="mt-3">
      <h5>Previous Comments:</h5>
      {comments.length === 0 ? (
        <p>No comments.</p>
      ) : (
        comments.map((comment) => (
          <Card
            key={comment.id}
            className="mx-4 mt-4 rounded p-4 mt-2 mb-2 shadow-lg"
          >
            <Row className="border">
              <Card.Header className="d-flex justify-content-between">
                <Col className="d-flex justify-content-start">
                  <div>{comment.username}</div>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button
                    variant={comment.isLiked ? "success" : "outline-success"}
                    onClick={() => handleLike(comment.id)}
                  >
                    <FaThumbsUp className="me-1" />
                    {comment.isLiked ? "Liked " : "Like "}({comment.brojLajkova}
                    )
                  </Button>
                  <Button
                    variant={comment.isDisliked ? "danger" : "outline-danger"}
                    onClick={() => handleDislike(comment.id)}
                  >
                    <FaThumbsDown className="me-1" />
                    {comment.isDisliked ? "Disliked " : "Dislike "} (
                    {comment.brojDislajkova})
                  </Button>
                </Col>
              </Card.Header>
            </Row>
            <Card.Body className="d-flex justify-content-start border shadow">
              {comment.text}
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

PreviousComments.propTypes = {
  comments: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDislike: PropTypes.func.isRequired,
};

export default PreviousComments;
