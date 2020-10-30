import React from "react";
import PropTypes from "prop-types";

function Progress({ percentage }) {
  return (
    <div className="progress">
      <div
        className="progress-bar bg-info"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;
