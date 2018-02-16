export function getRandomKey() {
  return Math.ceil(Date.now() * Math.random());
}

export function getAccentColor(accent : any, data: any) {
  if (data.currentHour >= data.sunSetTime || data.currentHour <= data.sunRiseTime) {
    // return { color: '#A332D6' };
    return { color: '#c851ff' };
  }
  return { color: accent };
}

export function getIcon(weatherIcons: any, minData: any, data: any) {
  if (minData.hour >= data.sunSetTime || minData.hour <= data.sunRiseTime) {
    return `./weathrly/assets/weather-icons/white/${weatherIcons[`nt_${minData.icon}`]}.svg`;
  }
  return `./weathrly/assets/weather-icons/white/${weatherIcons[minData.icon]}.svg`;
}
