import React from 'react';

export default function Features({today}){
    const getDirection = (angle) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(angle / 45) % 8];
    }
    return(
        <section className='features-page'>
            <h2>Today's Highlights</h2>
            <div className='features'>
                <div className='featured-item'>
                    <p>Wind Status</p>
                    <p className='main'><span>{today.windSpeed}</span> mph </p>
                    <p><span className="material-icons direction" style={{transform: `rotate(${parseInt(today.windDirection)}deg)`}}>navigation</span>{getDirection(parseInt(today.windDirection))}</p>
                </div>
                <div className='featured-item'>
                    <p>Humidity</p>
                    <p className='main'><span>{today.humidity}</span>%</p>
                    <div className='percentages'><p>0</p><p>50</p><p>100</p></div>
                    <div className='container'>
                        <span className='humidity' style={{width: `${parseInt(today.humidity)}%`}}></span>
                    </div>
                </div>
                <div className='featured-item'>
                    <p>Cloud Cover</p>
                    <p className='main'><span>{today.cloudCover}</span>%</p>
                </div>
                <div className='featured-item'>
                    <p>Air Pressure</p>
                    <p className='main'><span>{parseInt(today.pressure)}</span>mb</p>
                </div>
            </div>
        </section>
    )
}