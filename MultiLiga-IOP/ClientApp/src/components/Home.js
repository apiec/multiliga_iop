import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome on Spirit of Sport!</h1>
        <p>We organize major sport events in your city.</p>
        <p>Join as individual to race in many locations or form a team and play in our leagues.</p>
        <p>Check the <a href='https://localhost:44356/discipline'>Result</a> page to see scores in chosen discipline, league, and season.</p>
        <p>If you are logged user check <a href='https://localhost:44356/race_signups'>Your journey</a> to see upcoming events you may be interested to participate in and sign up for them.</p>
      </div>
    );
  }
}
