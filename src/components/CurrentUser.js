import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import keyIndex from 'react-key-index';
import './CurrentUser.scss';
import PositionNumber from './PositionNumber';

class CurrentUser extends React.Component {
  constructor(props) {
    super(props);

    const {
      team
    } = this.props;
    const currentUserTeam = keyIndex(team, 1);
    this.state = {team: currentUserTeam};
  }

  componentDidMount() {

  }

  render() {
    const {
      auth,
      createNewTeam,
      signOut,
      team
    } = this.props;
    const currentUserTeam = keyIndex(team, 1);
    const uid = auth.uid;
    const style = {
      backgroundColor: "#B80002"
    }
    return (
      <div className="CurrentUser">
      <AppBar style={style}/>
        <div className="TeamSelection">
          <h5 className="TeamSelection__heading"> {auth.displayName}&apos; s Team </h5>

            <div className="row">
              <div className="col-6">
                <div className="TeamSelection__panel-1 team-panel">
                  {currentUserTeam.map((player, index) => {
                    const positionNumber = index + 1;
                    while (positionNumber <= 13) {
                      return (
                        <div key={player.id}>
                          <PositionNumber
                            player={player.value}
                            positionNumber={positionNumber}
                            createNewTeam={createNewTeam}
                            team={team}
                            uid={uid}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="col-6">
                <div className="TeamSelection__panel-1 team-panel">
                  {currentUserTeam.map((player, index) => {
                    const positionNumber = index + 1;
                    while (positionNumber > 13) {
                      return (
                        <div key={player.id}>
                          <PositionNumber
                            player={player.value}
                            positionNumber={positionNumber}
                            createNewTeam={createNewTeam}
                            team={team}
                            uid={uid}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>

        </div>
        <div className="sign-out-button">
          <RaisedButton label="Sign Out" onClick={signOut} />
        </div>
      </div>
    );
  }
}

export default CurrentUser;
