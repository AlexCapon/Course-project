import React from "react";

// Статусный текст основанный на колличестве участников
export default function SearchStatus(numberObj) {
  return(
    numberObj.number === 0 ? (
    
    <h2><span className="badge bg-danger m-3">Nobody will party with you</span></h2>
    ) : (
      <h2><span className="badge bg-primary m-3">
        {numberObj.number} people will party with you
      </span></h2>
    ));
}