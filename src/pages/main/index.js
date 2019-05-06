import React, {Component} from 'react';
import {api, key} from '../../services/api';
import "./styles.css";
import moment from '../../services/moment';

export default class Main extends Component {

    state = {
        name_city: '',
        res: [],
        current: [],
    };

    componentDidMount() {
        this.loadCurrentLocation();
    };      

    loadCurrentLocation = async () => {

        const response = await api.get(`?format=json-cors&key=${key}`);

        this.setState({
            res: response.data.results,
            current: response.data.results.forecast[0],
        });

        console.log(response);
    };

    handleSearch = async (e) => {
        e.preventDefault();

        //
        const newResponse = await api.get(`?format=json-cors&key=b2c41726&city_name=${this.state.name_city}`);

        this.setState({
            res: newResponse.data.results,
            current: newResponse.data.results.forecast[0],
        });


        console.log(newResponse);
    };

    handleQuery = (e) => {
        e.preventDefault();

        this.setState({name_city: e.target.value});
    };

    render() {
        const {res, current} = this.state;
        var img_id = `https://assets.hgbrasil.com/weather/images/${res.img_id}.png`;

        return (
            <div className="total">
                <div className="main box">
                        <div className="right">
                            <h1>{res.city_name}</h1>
                            <p>{moment().format('LL')}</p>
                            <p>{moment().format('LT')}</p>
                            <img id="image" alt="" src={img_id} />
                        </div>

                        <div className="left">
                                <span id="temp">{res.temp}°</span>
                                <p>{res.description}</p>
                                <p>Min: <span id="min">{current.min}°</span> / Max: <span id="max">{current.max}°</span></p>
                                <p>Humidity: {res.humidity}%</p>
                                <p>Wind: {res.wind_speedy}</p>
                        </div>                        
                </div>  

                <div className="search box">
                    <form onSubmit={this.handleSearch}>
                        <input id="input" onChange={this.handleQuery} placeholder="New Location..." />
                        <button type="submit">Search</button>
                    </form>                
                </div> 
                
            </div>  
        )
    }
};