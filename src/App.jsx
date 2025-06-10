import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import DogList from "./components/DogList";

export default function App() {
  const [allBreeds, setAllBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar todas las razas al iniciar
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        const breedNames = Object.keys(data.message);
        setAllBreeds(breedNames);
        setFilteredBreeds(breedNames.slice(0, 10)); // primeras 10 razas como lista inicial
      });
  }, []);

  // Cada vez que cambian las razas filtradas, pedimos sus imágenes
  useEffect(() => {
    const fetchDogs = async () => {
      const dogData = await Promise.all(
        filteredBreeds.map(async (breed) => {
          const res = await fetch(
            `https://dog.ceo/api/breed/${breed}/images/random`
          );
          const data = await res.json();
          return { name: breed, image: data.message };
        })
      );
      setDogs(dogData);
    };

    if (filteredBreeds.length > 0) {
      fetchDogs();
    } else {
      setDogs([]);
    }
  }, [filteredBreeds]);

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term === "") {
      setFilteredBreeds(allBreeds.slice(0, 10)); // mostrar las primeras si no se escribe nada
    } else {
      const result = allBreeds.filter((breed) =>
        breed.toLowerCase().startsWith(term.toLowerCase())
      );
      setFilteredBreeds(result);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mini Catálogo de Perros</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      {dogs.length === 0 ? (
        <p>No se encontraron razas</p>
      ) : (
        <DogList dogs={dogs} />
      )}
    </div>
  );
}
