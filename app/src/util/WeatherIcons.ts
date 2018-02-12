

// <i className="wi wi-day-sunny"></i>

export function getWeatherIcon(weather: string, dayNight: 'day' | 'night') {
    let icon = weather;

    // TODO: Figure out more icons. Use weather codes instead of main, there's more of them

    if(weather === "Clear") {
        icon = dayNight === 'day' ? "wi wi-day-sunny" : "wi wi-night-clear";
    }
    else if(weather === "Clouds") {
        icon = dayNight === 'day' ? "wi wi-day-cloudy" : "wi wi-night-clear";
    }
    else if(weather === "Extreme") {
        icon = dayNight === 'day' ? "wi wi-hurricane" : "wi wi-hurricane";
    }
    else if(weather === "Drizzle") {
        icon = dayNight === 'day' ? "wi wi-day-showers" : "wi wi-night-showers";
    }
    else if(weather === "Rain") {
        icon = dayNight === 'day' ? "wi wi-day-rain" : "wi wi-night-rain";
    }
    else if(weather === "Thunderstorm") {
        icon = dayNight === 'day' ? "wi wi-day-thunderstorm" : "wi wi-night-thunderstorm";
    }
    else if(weather === "Snow") {
        icon = dayNight === 'day' ? "wi wi-day-snow" : "wi wi-night-snow";
    }
    else if(weather === "Atmosphere") {
        icon = dayNight === 'day' ? "wi wi-day-fog" : "wi wi-night-fog";
    }
    else if(weather === "Additional") {
        icon = dayNight === 'day' ? "wi wi-day-cloudy-gusts" : "wi wi-night-cloudy-gusts";
    }

    console.log("ICON: " + icon);
    return icon;
}