


const input_screen = document.querySelector('.weather-input')
const weather_screen = document.querySelector('.weather-showcase')
const back_arrow = document.querySelector('.fa-arrow-left')
const img_weather = document.querySelector('.img-weather')


const text_field = document.querySelector('.search_field')

const error_message_show = document.querySelector('.status-message')
const error_message = document.querySelector('.message')


document.querySelector('.submit-button').addEventListener('click', () => {
    text_field.value && get_weather_data()
})

text_field.addEventListener('keypress', (event) =>{
    (event.keyCode === 13 && text_field.value) && get_weather_data()
})

back_arrow.addEventListener('click', () => {
    weather_screen.style.display = 'none'
    input_screen.style.display = 'flex'
    back_arrow.style.display = 'none'

})

async function success_input(text) {

    error_message.setAttribute('class', 'success')
    error_message_show.style.display = 'initial'
    error_message.textContent = text

    await new Promise(r => setTimeout(r, 600));

    weather_screen.style.display = 'block'
    input_screen.style.display = 'none'
    back_arrow.style.display = 'initial'

    error_message_show.style.display = 'none'
}

function error(text){
    error_message.setAttribute('class', 'message')
    error_message_show.style.display = 'initial'
    error_message.textContent = `${text} "${text_field.value}"`
}


function get_weather_data(){
    let api_key = '9664eaa67153b698bb3ef8f0027a078f'
    let user_location = text_field.value

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${user_location}&APPID=${api_key}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            data['cod'] === 200 ? apply_data(data) : error('Invalid Location')
        })
        .catch(console.error)
}


function apply_data(datas){

    success_input('Getting weather data..')

    document.querySelector('.temperature').innerHTML = `${parseInt((datas['main']['temp'] - 273.15) * 9/5 + 32)}<span class="degree">°</span>F`;
    document.querySelector('.description').textContent = datas['weather'][0]['description']
    document.querySelector('.location').textContent = `${datas['name']}${datas['sys']['country'] ? ', ' + datas['sys']['country'] : ''}`;
    img_change(datas['weather'][0]['description'])

    //below labels
    document.querySelector('.Humidity').innerHTML = `${datas['main']['humidity']}%<br><span class="more-info">Humidity</span>`;
    document.querySelector('.wind').innerHTML = `${parseInt(datas['wind']['speed'] * 2.237)} mph<br><span class="more-info">Wind</span>`

}

function img_change(temp){
    if (temp.includes('clear')) img_weather.src = 'WeatherIcons/clear.svg'
    if (temp.includes('cloud')) img_weather.src = 'WeatherIcons/cloud.svg'
    if (temp.includes('rain')) img_weather.src = 'WeatherIcons/rain.svg'
    if (temp.includes('snow')) img_weather.src = 'WeatherIcons/snow.svg'
    if (temp.includes('haze')) img_weather.src = 'WeatherIcons/haze.svg'
    if (temp.includes('storm')) img_weather.src = 'WeatherIcons/storm.svg'

}
