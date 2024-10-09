import React, { useEffect, useState } from "react";
import avatarImage from "../Images/avatar.jpg";
import deleteImage from "../Images/delete_02.jpg";
import "../CSS/image.css";
import { CommentType } from "../Interfaces/Interface";
import {
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { commentsCollectionRef, repliesCollectionRef } from "../Constants";

interface CommentProps {
  comment: CommentType;
  refetch?: () => void;
  depth: number;
}

function Comment({ comment, depth, refetch }: CommentProps) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showCancel, setShowCancel] = useState<boolean>(false);
  const [replyInputValue, setReplyInputValue] = useState<string>("");
  const [replies, setReplies] = useState<CommentType[]>([]);

  const getReplies = async () => {
    try {
      const q = query(
        repliesCollectionRef,
        where("parentId", "==", comment.id)
      );

      const querySnapshot = await getDocs(q);
      const filtered = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as CommentType[];
      setReplies(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReplies();
  }, []);

  const handleAddReply = async (commentId: string, replyText: string) => {
    try {
      const replyObj = {
        id: uuidv4(),
        author: "User",
        commentText: replyText,
        parentId: commentId,
      };

      await addDoc(repliesCollectionRef, replyObj);

      getReplies();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReply = () => {
    if (replyInputValue && comment.id) {
      handleAddReply(comment.id, replyInputValue);
      setReplyInputValue("");
      setShowInput(false);
      setShowCancel(false);
      return;
    }
    setShowCancel(true);
    setShowInput(true);
  };
  const handleCancel = () => {
    setReplyInputValue("");
    setShowInput(false);
    setShowCancel(false);
  };

  const handleDelete = async () => {
    try {
      let docRef;
      if (comment?.parentId) {
        docRef = doc(repliesCollectionRef, comment.id);
      } else {
        docRef = doc(commentsCollectionRef, comment.id);
      }

      await deleteDoc(docRef);
      if (refetch) {
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comment-main-container">
      <div className="comment">
        <div className="comment-item" style={{ marginLeft: `${depth * 30}px` }}>
          <img src={avatarImage}></img>
        </div>
        <div className="comment-item">
          <div className="comment-section">
            <label className="bold">{comment?.author}</label>
            {comment.commentText}
            <div className="add-reply-section">
              {showInput && (
                <input
                  value={replyInputValue}
                  onChange={(e) => setReplyInputValue(e.target.value)}
                  type="text"
                ></input>
              )}
              <div>
                <button onClick={handleReply} className="reply-button">
                  {showInput ? "Pošalji" : "Odgovori"}
                </button>
                {showCancel && (
                  <button onClick={handleCancel} className="reply-button">
                    Otkaži
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="comment-item">
          <button className="delete-button" onClick={handleDelete}>
            <img className="delete" src={deleteImage}></img>
          </button>
        </div>
      </div>
      {replies?.length > 0 && (
        <div>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              refetch={getReplies}
              depth={depth + 1}
            ></Comment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
