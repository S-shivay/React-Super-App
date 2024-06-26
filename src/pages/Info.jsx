import { useEffect, useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


export default function Info() {

    const [weather, setWeather] = useState(null);
    const [notes, saveNotes] = useState(localStorage.getItem('notes') || '');
    const [news, setNews] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const updateNotes = (e) => {
        saveNotes(e.target.value);
        localStorage.setItem('notes', JSON.stringify(e.target.value));
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    const selectedMovies = JSON.parse(localStorage.getItem('selectedMovies'));
    useEffect(() => {
        fetch('https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json')
            .then(response => response.json())
            .then(data => setNews(data.articles[Math.floor(Math.random() * data.articles.length | 1)]))
    }, [])
    news && console.log(news.content.split('['));
    useEffect(() => {
        fetch('https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=j9PaWjRYhw3AVibyU39fXkpe1pQBiZjg')
            .then(response => response.json())
            .then(data => setWeather(data.timelines['daily'][0]['values']))

    }, [])
    console.log(weather);
    const date = Date.now();
    const month = new Date(date).getMonth()+1;
    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const seconds = new Date(date).getSeconds();
    const dateNow = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
    console.log(dateNow);
    useEffect(() => {
        const interval = setInterval(() => {
            setToggle(!toggle);
        } , 1000)
        return () => {
            clearInterval(interval);
        }
    } , [])
    const handleTimer = (operation, value) => {
        if (operation === 1) {
            setTime((time) => time + value);
            } else if (operation === 0) {
                setTime((time) => {
                    if (time - value < 0) {
                        return 0;
                        } else {
                            return time - value;
                            }
                });
            }
    }
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours}:${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

    }
    
    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '50vh',
                backgroundColor: '#5746EA',
                color: 'white',
                padding: '10px',
            }}>
                {userData ? <>
                    <p>{userData.name}</p>
                    <p>{userData.email}</p>
                    <p>{userData.username}</p>
                </> : 'No User Data'}
                {selectedMovies ? <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',

                }}>
                    {selectedMovies.map((movie, index) => <p key={index}>{movie.movie}</p>)}
                </div> : 'No Selected Movies'}
            </div>
            <textarea name="" id="" value={notes} onChange={updateNotes} style={{
                maxHeight: "400px",
                minHeight: "400px",
                maxWidth: "40%",
                minWidth: "40%",
                padding: "10px",
                backgroundColor: "#F1C75B",
                borderRadius: "10px",
                marginTop: "20px",

            }}>

            </textarea>
            {news ?
                <div>
                    <img src={news.urlToImage} width={300} height={300} alt={news.title} />
                    <p>{news.title}</p>
                    <p>{news.description}</p>
                    <p>{news?.content?.split('[')[0]}</p>
                </div> : "No News"}
            {weather ? <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '50vh',
                color: 'white',
                backgroundColor: '#5746EA',
                padding: '10px'
            }}>
                <p>Date : {day}/{month}/{year}</p>
                <p>Time : {hours}/{minutes}/{seconds}</p>
                <p>Temperature : {weather.temperatureAvg}</p>
                <p>Pressure : {weather.pressureSurfaceLevelAvg}</p>
                <p>Wind Speed : {weather.windSpeedAvg}</p>
                <p>Humidity : {weather.humidityAvg}</p>
            </div> : "No Weather Update"}
            <p>Date : {day}/{month}/{year}</p>
            <p>Time : {hours}:{minutes}:{seconds}</p>
            <CountdownCircleTimer
    isPlaying={isPlaying}
    duration={time}
    colors={['#004777']}
  >
    {({ remainingTime }) => formatTime(remainingTime)}
  </CountdownCircleTimer>
  <button onClick={() => setIsPlaying(true)}>Start</button>
  <button onClick={() => handleTimer(1, 3600)}>+1 Hour</button>
  <button onClick={() => handleTimer(1, 60)}>+1 Minute</button>
  <button onClick={() => handleTimer(1, 1)}>+1 second</button>
  <button onClick={() => handleTimer(0, 3600)}>-1 Hour</button>
  <button onClick={() => handleTimer(0, 60)}>-1 Minute</button>
  <button onClick={() => handleTimer(0, 1)}>-1 Second</button>
        </div>
    )
}