import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangePet(type) {
    setFilters({ type: type });
  }

  function handleFindPetsClick() {
    let baseURL = "http://localhost:3001/pets";

    if (filters.type !== "all") {
      baseURL += `?type=${filters.type}`;
    }

    fetch(baseURL)
      .then((res) => res.json())
      .then((petsArray) => {
        //console.log(petsArray)
        setPets(petsArray);
      });
  }
  const onAdoptPet = (id) => {
    const newPetArray = pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    setPets(newPetArray);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangePet={handleChangePet}
              onFindPetsClick={handleFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
