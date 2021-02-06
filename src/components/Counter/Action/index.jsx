import React from "react";
import PropTypes from "prop-types";

const Action = ({handleMinusCount, handlePlusCount}) => (
    <div className="flex-group counter-actions">
        <button onClick={handleMinusCount}>-</button>
        <button onClick={handlePlusCount}>+</button>
    </div>
)

Action.propTypes = {
    handlePlusCount: PropTypes.func.isRequired,
    handleMinusCount: PropTypes.func.isRequired
};

export default Action;
