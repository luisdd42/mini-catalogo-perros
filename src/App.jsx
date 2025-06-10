import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import DogList from "./components/DogList";

export default function App() {
  const [allBreeds, setAllBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        const breedNames = Object.keys(data.message).slice(0, 10); // tomamos 10
        setAllBreeds(breedNames);
        fetchDogs(breedNames);
      });
  }, []);

  const fetchDogs = async (breeds) => {
    const dogData = await Promise.all(
      breeds.map(async (breed) => {
        const res = await fetch(
          `https://dog.ceo/api/breed/${breed}/images/random`
        );
        const data = await res.json();
        return { name: breed, image: data.message };
      })
    );
    setDogs(dogData);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === "") {
      fetchDogs(allBreeds);
    } else {
      fetch(`https://dog.ceo/api/breed/${term}/images/random`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setDogs([{ name: term, image: data.message }]);
          } else {
            setDogs([]);
          }
        });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mini Catálogo de Perros</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <DogList dogs={dogs} />
    </div>
  );
}
