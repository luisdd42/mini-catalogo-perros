import React from "react";
import DogCard from "./DogCard";

export default function DogList({ dogs }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {dogs.map((dog) => (
        <DogCard key={dog.name} name={dog.name} image={dog.image} />
      ))}
    </div>
  );
}
