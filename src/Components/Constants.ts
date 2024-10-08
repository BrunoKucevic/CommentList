import { collection } from "firebase/firestore";
import { db } from "../firebase";

export const commentsCollectionRef = collection(db, "comments");
export const repliesCollectionRef = collection(db, "replies");
