import React from "react";
import PropTypes from 'prop-types';

import Card from "./Card";

const AppContent = ({description}) => {
    const items = [
        {
            source: 'https://images.unsplash.com/photo-1612111394447-998fc2d16527?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'In Depth',
            alt: 'In Depth'
        },
        {
            source: 'https://images.unsplash.com/photo-1601356631371-7b248bfdab63?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
            title: 'Latest news',
            alt: 'Latest news'
        },
        {
            source: 'https://images.unsplash.com/photo-1559163479-98365644374a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
            title: 'About',
            alt: 'About'
        }
    ]

    return (
        <>
            <h2>Technology</h2>
            <p>{description}</p>
            <Card items={items} />
        </>
    );
}

AppContent.propTypes = {
    description: PropTypes.string
};

export default AppContent;
