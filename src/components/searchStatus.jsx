import React from "react";

// Статусный текст основанный на колличестве участников
export default function SearchStatus(param) {
  const numberOfUsers = Object.keys(param).length;
  return(
  numberOfUsers === 0 ? (
    
    <span className="badge bg-danger m-3">Nobody will party with you</span>
    ) : (
      <span className="badge bg-primary m-3">
        {numberOfUsers} people will party with you
      </span>
    ));
}