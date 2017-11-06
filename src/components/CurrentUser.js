import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import initialState from '../initial-state';
import map from 'lodash/map';
import './CurrentUser.scss';

const CurrentUser = ({ auth, signOut }) => {
  const currentUserTeam = initialState.teams.players;
  return (
    <div className="CurrentUser">
      <img
        className="CurrentUser--photo"
        src={ auth.photoURL }
        alt={ auth.displayName }
        height="50px"
        width="50px"
      />
      <div>
      <h5> Choose Your Team </h5>
        {map(currentUserTeam, (player, key) => (
          <ul key={key}>
            <li> {key}: {player} </li>
          </ul>
        ))}
      </div>
      <div className="CurrentUser--identification">
        <h3 className="CurrentUser--displayName">{ auth.displayName }</h3>
        <p className="CurrentUser--email">{ auth.email }</p>
          <RaisedButton label="Sign Out" onClick={signOut} />
      </div>
    </div>
  );
};

export default CurrentUser;
