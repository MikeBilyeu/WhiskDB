import React from 'react';

const Profile = (props) => {
  return (
    <div>
      <h1>Profile<h1>
      <h2>{props.userName}</h2>
      <button>Create Recipe</button>
    </div>
  );
}

export default Profile;
