import React from "react";
import PropTypes from "prop-types";

const Result = ({count}) => <h4>{count}</h4>

Result.propTypes = {
    count: PropTypes.number.isRequired
};

export default Result;
