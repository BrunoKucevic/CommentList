export interface CommentType {
  id: string;
  author: string;
  commentText: string;
  parentId?: string;
}
