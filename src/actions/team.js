import { database } from '../firebase';

const teamsRef = database.ref('teams');

//update redux state (called after saving to database)
export const updateReduxTeam = (key, { team, uid }) => {
  return {
    type: 'UPDATE_TEAM',
    key,
    team,
    uid
  };
};

//saves new team ot the database
export const updateTeam = (newTeam, uid) => {
  return dispatch => {
    const latestTeam = {
      team: newTeam,
      uid
    };
    let userAlreadyExists = false;
    //Go through the teams node of the database
    teamsRef.once('value').then(snapshot => {
      for (var prop in snapshot.val()) {
        const uidInDatabase = snapshot.child(prop + '/uid').val();
        //check if the user already has a team
        if (uid === uidInDatabase) {
          userAlreadyExists = true;
        }
      }
      //if the user doesn't have a team, create a team for them
      if (!userAlreadyExists) {
        teamsRef.push(latestTeam);
      } else {
      //if the user has a team, find their team key and update their team
        teamsRef.once('value').then(snapshot => {
          for (var prop in snapshot.val()) {
            if (snapshot.val()[prop].uid === uid) {
              const currentTeamKey = prop;
              const currentTeamRef = database.ref('teams/' + currentTeamKey);
              currentTeamRef.set({
                ...latestTeam
              });
            }
          }
        });
      }
    });
  };
};

//receive players moved from drag and drop input and creates new team
export const createNewTeam = (initialTeam, playerMoved, playerDropped, uid) => {
  //algorithm which returns a new array with the new position of each player
  const playerMovedIndex = initialTeam.indexOf(playerMoved);
  const playerDroppedIndex = initialTeam.indexOf(playerDropped);

  const newTeam = [...initialTeam];

  newTeam.splice(playerMovedIndex, 1, playerDropped);
  newTeam.splice(playerDroppedIndex, 1, playerMoved);

  return updateTeam(newTeam, uid);
};

//event listener called when a new team is saved to the database
export const startListeningForTeams = () => {
  return dispatch => {
    teamsRef.on('child_changed', snapshot => {
      dispatch(updateReduxTeam(snapshot.key, snapshot.val()));
    });
  };
};
