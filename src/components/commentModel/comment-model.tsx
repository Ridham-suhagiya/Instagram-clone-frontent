import React, { useState, useEffect } from "react";
import styles from "./comment-model.module.scss";
import ProfileIcon from "../../assets/svgs/profile";
import { InstagramProfile } from "../../context/profile-context";

interface Comment {
    id: string;
    text: string;
    username?: string;
    timestamp: string;
    replies?: Comment[];
}

interface CommentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    comments: Comment[];
    postId: string;
    profile: InstagramProfile | null;
    onReply: (postId: string, commentId: string | null, text: string) => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose, comments, postId, onReply, profile }) => {
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");
    const [newCommentText, setNewCommentText] = useState("");

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleSubmitReply = () => {
        if (replyText.trim()) {
            onReply(postId, replyingTo, replyText);
            setReplyText("");
            setReplyingTo(null);
        }
    };

    const handleSubmitNewComment = () => {
        if (newCommentText.trim()) {
            onReply(postId, null, newCommentText);
            setNewCommentText("");
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay that prevents clicks on background */}
            <div className={styles.modalOverlay} onClick={onClose}></div>

            <div className={styles.modalContainer}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalHeader}>
                        <h3>Comments</h3>
                        <button className={styles.closeButton} onClick={onClose}>
                            &times;
                        </button>
                    </div>

                    <div className={styles.commentsList}>
                        {comments.length === 0 ? (
                            <p className={styles.noComments}>No comments yet</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className={styles.comment}>
                                    <div className={styles.commentHeader}>
                                        <div className={styles.commentAvatar}>
                                            {profile?.profile_picture_url ? (
                                                <img src={profile?.profile_picture_url} className={styles.userAvatar} />
                                            ) : (
                                                <ProfileIcon />
                                            )}
                                        </div>
                                        <div>
                                            <strong>{comment.username || "Anonymous"}</strong>
                                            <span className={styles.commentTimestamp}>
                                                {new Date(comment.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <p className={styles.commentText}>{comment.text}</p>
                                    <div className={styles.commentActions}>
                                        <button
                                            className={styles.replyButton}
                                            onClick={() => setReplyingTo(comment.id)}
                                        >
                                            Reply
                                        </button>
                                        <span className={styles.likeButton}>Like</span>
                                    </div>

                                    {replyingTo === comment.id && (
                                        <div className={styles.replyInput}>
                                            <input
                                                type="text"
                                                placeholder="Write your reply..."
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                onKeyPress={(e) => e.key === "Enter" && handleSubmitReply()}
                                            />
                                            <button className={styles.postButton} onClick={handleSubmitReply}>
                                                Post
                                            </button>
                                        </div>
                                    )}

                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className={styles.repliesContainer}>
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className={styles.reply}>
                                                    <div className={styles.commentHeader}>
                                                        <div className={styles.commentAvatar}>
                                                            <ProfileIcon />
                                                        </div>
                                                        <div>
                                                            <strong>{reply.username || "Anonymous"}</strong>
                                                            <span className={styles.commentTimestamp}>
                                                                {new Date(reply.timestamp).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className={styles.commentText}>{reply.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <div className={styles.newCommentContainer}>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSubmitNewComment()}
                        />
                        <button
                            className={styles.postButton}
                            onClick={handleSubmitNewComment}
                            disabled={!newCommentText.trim()}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentsModal;
