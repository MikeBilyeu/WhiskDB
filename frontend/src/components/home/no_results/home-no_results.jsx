import React from "react";
import { Link } from "react-router-dom";

const NoResults = props => {
  return (
    <div
      style={{
        color: "#313131",
        textAlign: "center",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#fff",
        height: "50vh",
        width: "100%"
      }}
    >
      <div style={{ fontSize: "1.2rem" }}>
        Sorry we couldn't find any matches
      </div>
      <div
        style={{
          fontSize: "1rem",
          color: "#707070",
          alignSelf: "start"
        }}
      >
        please try searching for another recipe
      </div>
      <div style={{ fontSize: "1.5rem", color: "#707070", alignSelf: "start" }}>
        or
      </div>

      <Link
        to={`/profile/create-recipe`}
        style={{
          fontSize: "1.2rem",
          color: "white",
          borderRadius: ".3rem",
          padding: ".5rem 1rem",
          backgroundColor: "#0172C4"
        }}
      >
        Create Delicious Recipes
      </Link>
    </div>
  );
};

export default NoResults;
