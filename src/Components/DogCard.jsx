import React from "react";

export default function DogCard({ name, image }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        width: "200px",
      }}
    >
      <h3>{name}</h3>
      <img src={image} alt={name} width="150" />
      <p>Raza popular</p>
    </div>
  );
}
