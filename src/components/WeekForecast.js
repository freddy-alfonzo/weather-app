import React from 'react';

export default function WeekForecast({forecast, tempType}){
    return(
        <section className='week-forecast flex justify-around'>
            {forecast.map((weekday, key)=>{
                return(
                    <div className='day my-2 mx-1' key={key}>
                        <p>{weekday.date}</p>
                        <img alt='' style={{width: '100%', maxWidth: '75px', height:'auto'}} src={require("../images/"+weekday.condition+".png")} />
                        { tempType==='C' ?
                            <div className='temps'>
                                <p>{parseInt(weekday.maxTemp)}&deg;C</p>
                                <p className='min'>{parseInt(weekday.minTemp)}&deg;C </p>
                            </div>
                            : 
                            <div className='temps'>
                                <p>{parseInt(weekday.maxTemp*1.8)+32}&deg;F</p>
                                <p className='min'>{parseInt(weekday.minTemp*1.8)+32}&deg;F</p>
                            </div>
                        }
                        
                    </div>
                )
            })}
            
        </section>
    )
}