import React from "react";
// Random component
const Completionist = () => <span>Pool closed</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span style={{ color: "red" }}>
        {hours}:{minutes}:{seconds} left
      </span>
    );
  }
};
export default renderer;
