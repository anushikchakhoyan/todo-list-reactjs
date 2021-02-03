import React from "react";
import PropTypes from 'prop-types';

import styles from "../index.module.css";
import CardItem from "./Item";

const Card = ({items}) => (
    <div className={styles.card}>
        {items.map((item, index) => (
            <CardItem {...item} key={index}/>
        ))}
    </div>
)

Card.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        alt: PropTypes.string,
        title: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired
    }))
};

export default Card;
