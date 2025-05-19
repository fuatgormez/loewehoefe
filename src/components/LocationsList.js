import React, { useState } from "react";
import LocationCard from "./LocationCard";
import { locationsData } from "../data/locationsData";

const LocationsList = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = locationsData.filter((location) => {
    // İlk olarak arama terimine göre filtrele
    const matchesSearch =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.features.some((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Sonra kategori filtresine göre filtrele
    const matchesFilter =
      selectedFilter === "all" || location.features.includes(selectedFilter);

    return matchesSearch && matchesFilter;
  });

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const uniqueFeatures = [
    ...new Set(locationsData.flatMap((loc) => loc.features)),
  ].sort();

  return (
    <section className="locations" id="locations">
      <div className="container">
        <h2 className="section-title">LOEWE HOEFE LOCATIONS</h2>

        <div className="filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Location suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-button ${
                selectedFilter === "all" ? "active" : ""
              }`}
              onClick={() => handleFilterChange("all")}
            >
              Alle
            </button>

            {uniqueFeatures.map((feature, index) => (
              <button
                key={index}
                className={`filter-button ${
                  selectedFilter === feature ? "active" : ""
                }`}
                onClick={() => handleFilterChange(feature)}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        <div className="location-grid">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))
          ) : (
            <div className="no-results">
              <p>Es wurden keine passenden Ergebnisse gefunden.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationsList;
