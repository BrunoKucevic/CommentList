import { useEffect, useState } from "react";
import "../CSS/inputs.css";
import "../CSS/buttons.css";
import "../CSS/container.css";
import "../CSS/label.css";
import "../CSS/comment.css";
import Comment from "./Comment";
import { CommentType } from "../Interfaces/Interface";
import { getDocs, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { commentsCollectionRef } from "../Constants";

const CommentsList = () => {
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<CommentType[]>([]);

  const getComments = async () => {
    try {
      const data = await getDocs(commentsCollectionRef);
      const filtered = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as CommentType[];
      setComments(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleAddComment = async () => {
    if (newComment) {
      try {
        await addDoc(commentsCollectionRef, {
          id: uuidv4(),
          author: "User",
          commentText: newComment,
        } as CommentType);
      } catch (error) {
        console.error(error);
      }
      getComments();
      setNewComment("");
    }
  };

  return (
    <>
      <div className="container">
        <div className="container-item"></div>
        <div className="container-item">
          <div className="comment-textarea-container">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button className="add-comment-button" onClick={handleAddComment}>
              Komentiraj
            </button>
          </div>
          <div className="comments-container">
            <label>Komentari ({comments?.length})</label>
            {comments?.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  refetch={getComments}
                  comment={comment}
                  depth={0}
                ></Comment>
              );
            })}
          </div>
        </div>
        <div className="container-item"></div>
      </div>
    </>
  );
};

export default CommentsList;
