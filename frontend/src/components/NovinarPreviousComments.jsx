import { Card, Row, Col, CardFooter } from "react-bootstrap";
import PropTypes from "prop-types";

const NovinarPreviousComments = ({ komentari }) => {
  console.log("NOVINAR PREVIOUS " + JSON.stringify(komentari));
  return (
    <div className="mt-3">
      <h5>Previous Comments:</h5>
      {komentari.length === 0 ? (
        <p>No comments.</p>
      ) : (
        komentari.map((comment) => (
          <Card
            key={comment.id}
            className="mx-4 mt-4 rounded p-4 mt-2 mb-2 shadow-lg"
          >
            <Row className="border">
              <Card.Header className="d-flex justify-content-between">
                <Col className="d-flex justify-content-start">
                  <div>{comment.username}</div>
                </Col>
                <Col className="d-flex justify-content-end"></Col>
              </Card.Header>
            </Row>
            <Card.Body className="d-flex justify-content-start border shadow">
              {comment.text}
            </Card.Body>
            <CardFooter>
              Likes: {comment.brojLajkova}
              Dislikes: {comment.brojDislajkova}
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

NovinarPreviousComments.propTypes = {
  komentari: PropTypes.array.isRequired,
};

export default NovinarPreviousComments;
