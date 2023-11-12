import { useState } from "react";
import PropTypes from "prop-types";

import styles from "./search.module.css";

export function Search(props) {
  const [query, setQuery] = useState("");

  function onChange(e) {
    setQuery(e.target.value);
    props.onSearch(e.target.value);
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={query}
        onChange={onChange}
        className={styles.search}
        placeholder="Search for a artist..."
      />
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};