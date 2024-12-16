import React, { useState } from "react";
import Card from "./workspaceTVShows/Card.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./workspaceTVShows/CardContainer.css";
import darkSide from "./photo.jpg/dark-side.jpg";
import theDiary from "./photo.jpg/thediary1.jpg";
import autosport from "./photo.jpg/autosport.jpg";
import belowEcho from "./photo.jpg/below-echo.jpg";
import community from "./photo.jpg/community.jpg";
import puls from "./photo.jpg/puls.jpg";
import asia from "./photo.jpg/asia.jpg";
import dogs from "./photo.jpg/dogs.jpg";
import DuringTheHunt from "./photo.jpg/DuringTheHunt.jpg";
import productionline from "./photo.jpg/productionline.jpg";
import rockies from "./photo.jpg/rockies.jpg";
import TheTastyTour from "./photo.jpg/TheTastyTour.jpg";
import tour from "./photo.jpg/tour.jpg";
import undiscovered from "./photo.jpg/undiscovered.jpg";
import SearchBar from "./workspaceTVShows/SearchBar.jsx";

const initialCards = [
  { image: darkSide, title: "Dark Side of the Moon", details: "2018 • 📺TV Series • PG" },
  { image: theDiary, title: "The Diary", details: "2019 • 📺TV Series • PG" },
  { image: autosport, title: "Autosport The Series", details: "2016 • 📺TV Series • PG" },
  { image: belowEcho, title: "Below Echo", details: "2016 • 📺TV Series • PG" },
  { image: rockies, title: "The Rockies", details: "2015 • 📺TV Series • E" },
  { image: community, title: "Community of Ours", details: "2018 • 📺TV Series • 18+" },
  { image: undiscovered, title: "Undiscovered Cities", details: "2019 • 📺TV Series • E" },
  { image: puls, title: "112", details: "2013 • 📺TV Series • PG" },
  { image: productionline, title: "Production Line", details: "2018 • 📺TV Series • PG" },
  { image: dogs, title: "Dogs", details: "2016 • 📺TV Series • E" },
  { image: asia, title: "Asia in 24 Days", details: "2020 • 📺TV Series • PG" },
  { image: tour, title: "Unresolved Cases", details: "2016 • 📺TV Series • PG" },
  { image: TheTastyTour, title: "The Tasty Tour", details: "2016 • 📺TV Series • PG" },
  { image: DuringTheHunt, title: "During The Hunt", details: "2018 • 📺TV Series • 18+" },
];

const CardContainer = () => {
  const [filteredCards, setFilteredCards] = useState(initialCards);

  return (
    <div className="tv-series-container">
      <SearchBar data={initialCards} setSearchData={setFilteredCards} />
      <h1 className="tv-series-title">TV Series</h1>
      <div className="card-container">
        {filteredCards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            details={card.details}
          />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
