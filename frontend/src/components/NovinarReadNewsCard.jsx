import { Card } from "react-bootstrap";

import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

const NovinarReadNewsCard = (props) => {
  return (
    <div>
      <Card className="mx-auto mt-5">
        <Row className="shadow rounded p-2">
          <Col className="d-flex justify-content-start ">{props.tag}</Col>
          <Col className="d-flex justify-content-end ">{props.rubrika}</Col>
        </Row>

        <Card.Body className="mt-2">
          <Card.Title className="text-center">{props.naslov}</Card.Title>

          <Card.Text
            dangerouslySetInnerHTML={{ __html: props.text }}
          ></Card.Text>
        </Card.Body>
        <Row>
          <Col>Author: {props.novinar}</Col>
          <Col>{props.date}</Col>
        </Row>
      </Card>
    </div>
  );
};

NovinarReadNewsCard.propTypes = {
  id: PropTypes.number.isRequired,
  naslov: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  rubrika: PropTypes.string.isRequired,
  novinar: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default NovinarReadNewsCard;
