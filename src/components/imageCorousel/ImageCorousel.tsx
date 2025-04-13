import React, { useEffect, useState, useRef } from "react";
import styles from "./carousel.module.scss";
import LeftIcon from "../../assets/svgs/left";
import RightIcon from "../../assets/svgs/right";

type Props = {
    mediaUrls: string[];
    interval?: number;
    autoScroll?: boolean;
    containerClassName?: string;
    mediaClassName?: string;
    showControls?: boolean;
    displayIndicators?: boolean;
};

const ImageCarousel: React.FC<Props> = ({
    mediaUrls,
    interval = 3000,
    autoScroll = false,
    containerClassName = "",
    mediaClassName = "",
    showControls = true,
    displayIndicators = false,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!autoScroll) return;

        const scrollToNext = () => {
            timeoutRef.current = setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % mediaUrls.length);
            }, interval);
        };

        scrollToNext();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, mediaUrls.length, interval, autoScroll]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + mediaUrls.length) % mediaUrls.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % mediaUrls.length);
    };

    return (
        <div className={`${styles.carouselContainer} ${containerClassName}`}>
            {showControls && (
                <>
                    <button
                        className={`${styles.navButton} ${styles.leftButton}`}
                        onClick={handlePrev}
                        aria-label="Previous media"
                    >
                        <LeftIcon className={styles.navIcon} />
                    </button>
                    <button
                        className={`${styles.navButton} ${styles.rightButton}`}
                        onClick={handleNext}
                        aria-label="Next media"
                    >
                        <RightIcon className={styles.navIcon} />
                    </button>
                </>
            )}
            {displayIndicators && (
                <div className={styles.indicators}>
                    {mediaUrls.map((_, idx) => (
                        <button
                            key={idx}
                            className={`${styles.indicator} ${currentIndex === idx ? styles.active : ""}`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to media ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
            <div
                className={styles.slider}
                style={{
                    transform: `translateX(-${currentIndex * (100 / mediaUrls.length)}%)`,
                    width: `${mediaUrls.length * 100}%`,
                }}
            >
                {mediaUrls.map((url, idx) => (
                    <object
                        key={idx}
                        data={url}
                        type={url.includes(".mp4") ? "video/mp4" : "image/jpeg"}
                        className={`${styles.carouselObject} ${mediaClassName}`}
                        style={{ width: `${100 / mediaUrls.length}%` }}
                        aria-label={`Media ${idx + 1}`}
                    >
                        {/* Fallback content */}
                        <div className={styles.fallbackContent}>
                            <p>Media cannot be displayed</p>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                View media directly
                            </a>
                        </div>
                    </object>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
