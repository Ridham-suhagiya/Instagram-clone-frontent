import styles from "./login.module.scss";
import Usemobile from "../../hook/use-mobile";
import childrensImage from "../../assets/scene.jpg";
import happyImage from "../../assets/happy-face.jpg";
import likeGirl from "../../assets/likegirl.jpg";
import sports from "../../assets/sports.jpg";
import instaImage from "../../assets/instaposts.jpg";
import ImageCarousel from "../../components/imageCorousel/ImageCorousel";
import { URI } from "../../constants/variable";

export default function InstagramLogin() {
    const { isMobile } = Usemobile();

    const handleLogin = () => {
        window.location.href = `${URI}/auth/instagram`;
    };

    const imageArray = [childrensImage, happyImage, likeGirl, instaImage, sports];

    return (
        <div className={isMobile ? styles.hero : styles.heroGrid}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Welcome to <span>InstaView</span>
                </h1>
                <h2 className={styles.subtitle}>
                    by <span className={styles.name}>Ridham Suhagiya</span>
                </h2>

                <button className={styles.loginBtn} onClick={handleLogin}>
                    Login with Instagram
                </button>
                <p className={styles.typingInvite}>🎉 Join the fun – log in with Instagram to get started!</p>
            </div>

            {!isMobile && (
                <div className={styles.carouselContainer}>
                    <ImageCarousel
                        mediaUrls={imageArray}
                        interval={3000}
                        showControls={false}
                        autoScroll={true}
                        mediaClassName={styles.carouselImage}
                        containerClassName={styles.carouselContainer}
                    />
                </div>
            )}
        </div>
    );
}
