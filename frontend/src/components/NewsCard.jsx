import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { CardFooter, CardHeader } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

const NewsCard = (props) => {
  return (
    <Card className="p-1 m-3">
      <Card.Body>
        <CardHeader>
          <Row>
            <Col>
              <small className="d-flex justify-content-start font-italic">
                Lajkovi: {props.brojLajkova}
              </small>
            </Col>
            <Col>
              <small className="d-flex justify-content-end font-italic">
                Dislajkovi: {props.brojDislajkova}
              </small>
            </Col>
          </Row>
        </CardHeader>
        <Card.Title className="p-5">{props.naslov}</Card.Title>
        <CardFooter>
          <Row>
            <Col>
              <small className="d-flex justify-content-start font-italic">
                #{props.tag}
              </small>
            </Col>
            <Col>
              <small className="d-flex justify-content-end font-italic">
                {props.datum}
              </small>
            </Col>
          </Row>
        </CardFooter>
      </Card.Body>
    </Card>
  );
};
NewsCard.propTypes = {
  naslov: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  datum: PropTypes.string.isRequired,
  brojLajkova: PropTypes.number.isRequired,
  brojDislajkova: PropTypes.number.isRequired,
};

export default NewsCard;
