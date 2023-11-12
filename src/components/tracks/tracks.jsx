import PropTypes from "prop-types";

import styles from "./tracks.module.css";

export function Tracks(props) {
  return (
    <ul className={styles.tracks}>
      {props.tracks.map(track => (
        <li key={track.id} className={styles.track}>
          {props.customIcon && (
            <button
              className={styles.customIcon}
              onClick={() => props.onTrackClick(track)}
            >
              {props.customIcon}
            </button>
          )}
          <img
            src={track.image}
            alt={track.title}
            className={styles.image}
          />
          <div className={styles.data}>
            <h1>{track.name}</h1>
            <p>{track.album}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

Tracks.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
    })
  ).isRequired,
  customIcon: PropTypes.string, // Path to custom icon image
  onTrackClick: PropTypes.func, // Function to handle track click
};
