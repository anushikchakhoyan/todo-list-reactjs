import React from "react";
import PropTypes from 'prop-types';

import styles from "../../index.module.css";

const CardItem = ({source, title, alt}) => (
    <div className={styles.cardItem}>
        <img src={source} alt={alt}/>
        <h3>{title}</h3>
    </div>
);

CardItem.propTypes = {
    alt: PropTypes.string,
    source: PropTypes.string,
    title: PropTypes.string.isRequired
};

export default CardItem;
