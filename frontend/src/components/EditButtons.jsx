import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserHooks";
import { useState } from "react";

const EditButtons = (news) => {
  console.log("EDIT param " + news.id);
  const [state, setState] = useState(news.state === "approving" ? true : false);
  const { userData } = useUser();
  const navigate = useNavigate();

  console.log(state);

  console.log("NEWS STATE " + news.state);

  const handleDelete = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/vest/delete/${news.id}`
      );

      if (response.data === "Success") {
        console.log("News deleted successfully");
        navigate(`/Novinar/${userData.userId}`);
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const handleForApprove = async () => {
    if (state) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/vest/toDraft?vestId=${news.id}`
        );

        if (response.data === "Success") {
          setState(false);
          console.log("News sent for approve successfully");
        }
      } catch (error) {
        console.error("Error deleting news:", error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/vest/toApproving?vestId=${news.id}`
        );

        if (response.data === "Success") {
          setState(true);
          console.log("News sent for approve successfully");
        }
      } catch (error) {
        console.error("Error deleting news:", error);
      }
    }
  };

  return (
    <div className="my-3">
      <Row>
        <Col>
          <Button
            disabled={state}
            onClick={() => navigate(`/NewsNovinar/Edit/${news.id}`)}
            className="me-2"
            variant="primary"
          >
            Edit
          </Button>
          <Button className="me-2" variant="success" onClick={handleForApprove}>
            {state ? "Request edit" : "Send for approve"}
          </Button>
          <Button disabled={state} variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

EditButtons.propTypes = {
  news: PropTypes.array.isRequired,
};

export default EditButtons;
