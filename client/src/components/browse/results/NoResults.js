import React from "react";

import { Link } from "react-router-dom";

const NoResults = props => {
  return (
    <div
      style={{
        color: "#313131",
        textAlign: "center",
        height: "10rem",
        display: "grid",
        placeItems: "center",
        marginTop: "1.5rem"
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

      <Link
        to={`/profile/create-recipe`}
        style={{
          fontSize: "1.3rem",
          color: "white",
          borderRadius: ".5rem",
          padding: ".7rem 1rem",
          backgroundColor: "#0172C4"
        }}
      >
        Create Delicious Recipes
      </Link>
    </div>
  );
};

export default NoResults;
