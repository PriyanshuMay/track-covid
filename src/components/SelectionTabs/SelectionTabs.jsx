import React, { useState, useEffect } from 'react';
import { Paper, Tabs, Tab} from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';
import GitHubIcon from '@material-ui/icons/GitHub';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './SelectionTabs.css';
import DataTable from '../DataTable/DataTable.jsx';
import Chart from '../Chart/Chart.jsx';
import PieChart from '../PieChart/PieChart.jsx'
import CountryPicker from '../CountryPicker/CountryPicker.jsx';
import Cards from '../Cards/Cards.jsx';
import {  fetchIndiaData, fetchIndiaGraphData,
            fetchCntryData, fetchDailyData } from '../../api';

const SelectionTabs = () => {
    const [value, setValue] = useState(1);
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [country, setCountry] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setData(await fetchIndiaData());
        }
        fetchData();
        const fetchGraphData = async () => {
            setGraphData(await fetchIndiaGraphData());
        }
        fetchGraphData();
        
    }, []);

    const handleChange = (event, newVal) => {
        setValue(newVal);
        setCountry('');
         if (newVal === 1) {
            const fetchData = async () => {
                setData(await fetchIndiaData());
            }
            fetchData();
            const fetchGraphData = async () => {
                setGraphData(await fetchIndiaGraphData());
            }
            fetchGraphData();
        } else if (newVal === 2) {
            const fetchData = async () => {
                setData(await fetchCntryData());
            }
            fetchData();
            const fetchGraphData = async () => {
                setGraphData(await fetchDailyData());
            }
            fetchGraphData();
        }
    };

    const handleCountryChange = async (country) => {
        const retrievedData = await fetchCntryData(country);
        setData(retrievedData);
        setGraphData(retrievedData);
        setCountry(country);
    }

    return (
        <div className="tab-container">
            <Paper square className="tab-style">
                <Tabs className="tabs"
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    centered
                >
                    <Tab icon={<GitHubIcon />} label="About" />
                    <Tab icon={<FavoriteIcon />} label="Home" />
                    <Tab icon={<PublicIcon />} label="World" />
                </Tabs>
            
  
        
  
            <Cards data={data} value={value} index={1} />
            <PieChart data={data} value={value} index={1} />
            <DataTable value={value} index={1} data={data} />
            <Chart value={value} index={1} graphData={graphData} />
            <CountryPicker handleCountryChange={handleCountryChange} value={value} index={2} />
            <Cards data={data} value={value} index={2} />
            <PieChart data={data} value={value} index={2} />
            <Chart value={value} index={2} graphData={graphData} country={country} />
            </Paper>
        </div>
    );
}

export default SelectionTabs;