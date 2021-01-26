import { extend } from 'jquery';
import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

class MyButton extends Component {
    render() {
        let link = `/league?disciplineId=${this.props.id}`;
        <Link to={link}>
            <button type="button">
               Click Me!
            </button>
        </Link>
    }
}

export class Leagues extends Component {
    static displayName = Leagues.name;

    constructor(props) {
        super(props);
        this.state = { leagues: [], loading: true };
    }

    componentDidMount() {
        this.populateLeagueData();
    }

    static renderLeaguesTable(leagues) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Leagues Name</th>
                    </tr>
                </thead>
                <tbody>
                    {leagues.map(league =>
                        <tr key={league.id}>
                            <td>{league.id}</td>
                            <td>{league.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Leagues.renderLeaguesTable(this.state.leagues);

        return (
            <div>
                <h1 id="tabelLabel" >List of disciplines</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateLeagueData() {
        const token = await authService.getAccessToken();
        const response = await fetch('league/get', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ leagues: data, loading: false });
    }
}
