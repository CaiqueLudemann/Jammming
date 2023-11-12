import { SpotifyAPI } from "../../api";
import styles from "./welcome.module.css";

export function Welcome() {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <img
          className={styles.image}
          src={SpotifyAPI.userInfo?.images[1]?.url}
          alt={SpotifyAPI.userInfo?.display_name}
        />
        <h2 className={styles.message}>
          Welcome, <br />
          {SpotifyAPI.userInfo?.display_name}!
        </h2>
      </div>
    </div>
  );
}