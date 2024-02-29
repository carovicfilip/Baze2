import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import PreviousComments from "./PreviousComments";

const Comments = (props) => {
  const [newComment, setNewComment] = useState({ username: "", comment: "" });
  const [comments, setComments] = useState(props.komentari ?? []);

  const handlePostComment = async () => {
    if (newComment.username && newComment.comment) {
      const newCommentData = {
        vestId: props.id,
        username: newComment.username,
        text: newComment.comment,
        brojLajkova: 0,
        brojDislajkova: 0,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/api/komentar/new",
          newCommentData
        );

        console.log("Comment posted successfully:", response.data);

        setComments((prevComments) => [...prevComments, newCommentData]);
        console.log("NEWC DATA " + newCommentData);

        setNewComment({ username: "", comment: "" });
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  const handleLike = async (commentId) => {
    try {
      await axios.get(
        `http://localhost:8080/api/komentar/like?id=${commentId}`
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                brojLajkova: comment.brojLajkova + (comment.isLiked ? -1 : 1),
                brojDislajkova: comment.isDisliked
                  ? comment.brojDislajkova - 1
                  : comment.brojDislajkova,
                isDisliked: false,
              }
            : comment
        )
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleDislike = async (commentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/komentar/dislike?id=${commentId}`
      );

      if (response.data === "Success") {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  isDisliked: !comment.isDisliked,
                  brojDislajkova:
                    comment.brojDislajkova + (comment.isDisliked ? -1 : 1),
                  brojLajkova: comment.isLiked
                    ? comment.brojLajkova - 1
                    : comment.brojLajkova,
                  isLiked: false,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error("Error disliking comment:", error);
    }
  };

  return (
    <div>
      <Form>
        <h4 className="mt-5 mb-5" style={{ color: "white" }}>
          Komentari
        </h4>
        <Form.Group className="mb-2" controlId="formUsername">
          <Form.Control
            type="text"
            placeholder="Korisnicko ime"
            value={newComment.username}
            onChange={(e) =>
              setNewComment({ ...newComment, username: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formComment">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Vas komentar..."
            value={newComment.comment}
            onChange={(e) =>
              setNewComment({ ...newComment, comment: e.target.value })
            }
          />
        </Form.Group>
        <Button variant="warning" onClick={handlePostComment}>
          Postavi komentar
        </Button>
      </Form>
      <PreviousComments
        comments={comments}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />
    </div>
  );
};

Comments.propTypes = {
  komentari: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
};

export default Comments;
