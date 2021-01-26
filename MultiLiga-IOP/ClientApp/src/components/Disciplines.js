import { extend } from 'jquery';
import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";


export class Disciplines extends Component {
    static displayName = Disciplines.name;

    constructor(props) {
        super(props);
        this.state = { disciplines: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderDisciplinesTable(disciplines) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Discipline Name</th>
                    </tr>
                </thead>
                <tbody>
                    {disciplines.map(discipline =>
                        <tr key={discipline.id}>
                            <td>{discipline.id}</td>
                            <Link to={`/league/get?disciplineId=${discipline.id}`}> {discipline.name} </Link>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Disciplines.renderDisciplinesTable(this.state.disciplines);

        return (
            <div>
                <h1 id="tabelLabel" >List of disciplines</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const token = await authService.getAccessToken();
        const response = await fetch('discipline/get', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ disciplines: data, loading: false });
    }
}
