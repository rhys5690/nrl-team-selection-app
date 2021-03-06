import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import './CurrentUser.scss';
import PositionNumber from './PositionNumber';

class CurrentUser extends React.Component {
  constructor(props) {
    super(props);
    const { teams } = this.props;
    const currentUserTeam = teams.team;
    this.state = {
      team: currentUserTeam
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    teams: PropTypes.object.isRequired,
    createNewTeam: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.teams.team !== this.state.team;
  }

  componentWillReceiveProps(nextprops) {
    const newCurrentUserTeam = nextprops.teams.team;
    this.setState({ team: newCurrentUserTeam });
  }

  screenshot() {
    console.log('take screenshot');
  }

  render() {
    const { auth, createNewTeam, signOut, teams } = this.props;
    const team = teams.team;
    const uid = auth.uid;
    const style = {
      backgroundColor: '#B80002'
    };
    return (
      <div className="CurrentUser">
        <AppBar style={style} />
        <div className="TeamSelection">
          <h5 className="TeamSelection__heading">
            {' '}{auth.displayName}&apos; s Team{' '}
          </h5>
          <div className="row">
            <div className="col-6">
              <div className="TeamSelection__panel-1 team-panel">
                {this.state.team.map((player, index) => {
                  const positionNumber = index + 1;
                  while (positionNumber <= 13) {
                    return (
                      <div key={player}>
                        <PositionNumber
                          player={player}
                          positionNumber={positionNumber}
                          createNewTeam={createNewTeam}
                          reservePlayer={false}
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
                {this.state.team.map((player, index) => {
                  const positionNumber = index + 1;
                  while (positionNumber > 13 && positionNumber < 27) {
                    return (
                      <div key={player}>
                        <PositionNumber
                          reservePlayer={positionNumber > 17 ? true : false}
                          player={player}
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
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className="TeamSelection__panel-1 team-panel">
                    {this.state.team.map((player, index) => {
                      const positionNumber = index + 1;
                      while (positionNumber >= 27 && positionNumber <= 28) {
                        return (
                          <div key={player}>
                            <PositionNumber
                              player={player}
                              positionNumber={positionNumber}
                              createNewTeam={createNewTeam}
                              reservePlayer={true}
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
                    {this.state.team.map((player, index) => {
                      const positionNumber = index + 1;
                      while (positionNumber >= 29 && positionNumber <= 30) {
                        return (
                          <div key={player}>
                            <PositionNumber
                              player={player}
                              positionNumber={positionNumber}
                              createNewTeam={createNewTeam}
                              reservePlayer={true}
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
          </div>
        </div>
        <div className="button-wrapper">
          <RaisedButton label="Screenshot" onClick={this.screenshot} />
        </div>
        <div className="button-wrapper">
          <RaisedButton label="Sign Out" onClick={signOut} />
        </div>
      </div>
    );
  }
}

export default CurrentUser;
