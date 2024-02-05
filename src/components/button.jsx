import React from 'react';
import styles from "../styles/button.module.css";

const Button = ({ onClick }) => {
    return (
        <div className={styles[""]}>
            <button className={styles["Button"]} onClick={onClick}>
                Load more
            </button>
        </div>
    );
};

export default Button;