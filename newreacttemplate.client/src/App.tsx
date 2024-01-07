import { useEffect, useState } from 'react';
import './App.css';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

interface UserInfo {
    isAuthenticated: boolean;
    name: string;
}    


function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const [userInfo, setUserInfo] = useState<UserInfo>();
    
    useEffect(() => {
        populateUserData();
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <><table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>
            <p>
                {userInfo === undefined ?
                    <span>UserInfo is loading...</span>
                    :
                    <>
                        {userInfo.isAuthenticated ?
                            <><span>Hello {userInfo.name}</span> <a href="/auth/logout">Logout</a></> :
                            <a href="/auth/login">Login</a>
                        }
                    </>

                }
            </p>
        </>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('/weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }

    async function populateUserData() {
        const response = await fetch('/userInfo');
        const data = await response.json();
        setUserInfo(data);
    }

}

export default App;