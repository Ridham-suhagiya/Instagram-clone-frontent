import React, { useContext, useEffect, useState } from "react";
import styles from "./feeds.module.scss";
import { fetchUserFeeds, postNewComment, replyToAComment } from "../../helper/fetch";
import LikeIcon from "../../assets/svgs/like";
import CommentIcon from "../../assets/svgs/comment";
import ShareIcon from "../../assets/svgs/share";
import ImageCarousel from "../../components/imageCorousel/ImageCorousel";
import CommentsModal from "../../components/commentModel/comment-model";
import ProfileIcon from "../../assets/svgs/profile";
import { motion } from "framer-motion";
import { InstagramProfile, ProfileContext } from "../../context/profile-context";

interface Comment {
    id: string;
    text: string;
    username?: string;
    timestamp: string;
    replies?: Comment[];
}

interface FeedItem {
    id: string;
    media_url: string;
    caption?: string;
    timestamp: string;
    username: string;
    user_profile_picture: string;
    like_count: number;
    comments_count: number;
    comments?: Comment[];
    media_type?: string;
    children?: {
        data: {
            media_type: string;
            media_url: string;
            id: string;
        }[];
    };
}

const Feeds: React.FC = () => {
    const [feeds, setFeeds] = useState<FeedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [newComments, setNewComments] = useState<{ [key: string]: Comment[] }>({});
    const { profile } = useContext(ProfileContext) as { profile: InstagramProfile | null };
    useEffect(() => {
        const loadFeeds = async () => {
            try {
                const [data] = await fetchUserFeeds();
                setFeeds(data.data);
            } catch (err) {
                setError("Failed to load feeds. Please try again later.");
                console.error("Error fetching feeds:", err);
            } finally {
                setLoading(false);
            }
        };

        loadFeeds();
    }, []);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <motion.div
                    className={styles.loadingSpinner}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

    const handleAddComment = async (postId: string, commentId: string | null, text: string) => {
        const newComment: Comment = {
            id: `comment-${Date.now()}`,
            text,
            username: profile?.username,
            timestamp: new Date().toISOString(),
        };

        if (commentId) {
            // This is a reply to a comment
            const updatedFeeds = feeds.map((feed) => {
                if (feed.id === postId) {
                    const updatedComments = feed.comments?.map((comment) => {
                        if (comment.id === commentId) {
                            return {
                                ...comment,
                                replies: [...(comment.replies || []), newComment],
                            };
                        }
                        return comment;
                    });
                    return { ...feed, comments: updatedComments };
                }
                return feed;
            });
            setFeeds(updatedFeeds);
            replyToAComment(commentId, text);
        } else {
            const [data] = await postNewComment(postId, text);
            newComment["id"] = data.comment_id;
            setNewComments((prev) => ({
                ...prev,
                [postId]: [...(prev[postId] || []), newComment],
            }));
        }
    };

    const getCombinedComments = (postId: string) => {
        const post = feeds.find((f) => f.id === postId);
        return [...(post?.comments || []), ...(newComments[postId] || [])].sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        );
    };

    const renderMedia = (feed: FeedItem) => {
        if (feed.media_type === "CAROUSEL_ALBUM" && feed.children?.data) {
            const images = feed.children.data.map((child) => child.media_url);
            return (
                <ImageCarousel
                    mediaUrls={images}
                    containerClassName={styles.carouselContainer}
                    mediaClassName={styles.carouselImage}
                    interval={3000}
                />
            );
        }
        return <img src={feed.media_url} alt={feed.caption || "Post"} className={styles.media} />;
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
            </div>
        );
    }

    if (error) {
        return <div className={styles.errorContainer}>{error}</div>;
    }

    return (
        <div className={styles.feedsContainer}>
            <h1 className={styles.feedTitle}>Your Feed</h1>

            <div className={styles.feedGrid}>
                {feeds.map((feed) => (
                    <div key={feed.id} className={styles.feedCard}>
                        <div className={styles.feedHeader}>
                            {profile?.profile_picture_url ? (
                                <img src={profile?.profile_picture_url} className={styles.userAvatar} />
                            ) : (
                                <ProfileIcon />
                            )}

                            <span className={styles.username}>{feed.username}</span>
                            <span className={styles.timestamp}>{new Date(feed.timestamp).toLocaleDateString()}</span>
                        </div>

                        <div className={styles.mediaContainer}>{renderMedia(feed)}</div>

                        <div className={styles.feedActions}>
                            <button className={styles.actionButton}>
                                <LikeIcon className={styles.icon} />
                                <span>{feed.like_count}</span>
                            </button>
                            <button className={styles.actionButton} onClick={() => setSelectedPostId(feed.id)}>
                                <CommentIcon className={styles.icon} />
                                <span>{feed.comments_count + (newComments[feed.id]?.length || 0)}</span>
                            </button>
                            <button className={styles.actionButton}>
                                <ShareIcon className={styles.icon} />
                            </button>
                        </div>

                        {feed.caption && (
                            <div className={styles.feedCaption}>
                                <strong>{feed.username}</strong> {feed.caption}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <CommentsModal
                isOpen={!!selectedPostId}
                profile={profile}
                onClose={() => setSelectedPostId(null)}
                comments={selectedPostId ? getCombinedComments(selectedPostId) : []}
                postId={selectedPostId || ""}
                onReply={handleAddComment}
            />
        </div>
    );
};

export default Feeds;
