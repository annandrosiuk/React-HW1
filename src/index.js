import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const presidentsStr = [
  'Andrew Jackson',
  'Martin Van Buren',
  'William Henry Harrison'
];

const presidentsObj = [
  { firstName: 'John', lastName: 'Tyler', presidentIndex: 10 },
  { firstName: 'James K.', lastName: 'Polk', presidentIndex: 11 },
  { firstName: 'Zachary', lastName: 'Taylor', presidentIndex: 12 },
  { firstName: 'Millard', lastName: 'Fillmore', presidentIndex: 13 }
];

const serverResponse = [
  {
    'id': '666958530825467',
    'title': 'Friday open-air party w/ Lucarelli, Mihas and Yarik JR | Hide',
    'place': 'Hide',
    'date': '2020-06-12T20:00:00.000Z'
  },
  {
    'id': '786185895252176',
    'title': 'Захист скверу імені Чкалова',
    'place': 'Сквер Им. Чкалова',
    'date': '2020-06-10T09:00:00.000Z'
  },
  {
    'id': '623921328209118',
    'title': 'Живая музыка на летней террасе',
    'place': 'От Заката до Рассвета',
    'date': '2020-06-14T17:00:00.000Z'
  },
  {
    'id': '909559356190295',
    'title': 'Amer (2009)',
    'place': 'Кіноклуб Кіноха',
    'date': '2020-06-13T15:00:00.000Z'
  },
  {
    'id': '589272605321022',
    'title': 'В парк Межигорье на теплоходе',
    'place': 'Причал №6, Почтовая пл.',
    'date': '2020-06-13T07:45:00.000Z'
  }
];

function getTimesOfDay(date) {
  const hour = new Date(date).getHours();

  if (hour >= 5 && hour < 11) {
    return 'Утро';
  }

  if (hour >= 11 && hour < 17) {
    return 'День';
  }

  if (hour >= 17 && hour < 21) {
    return 'Вечер';
  }

  return 'Ночь';
}

ReactDOM.render(
  <React.StrictMode>
    <ul>
      <li>George Washington</li>
      <li>John Adams</li>
      <li>Thomas Jefferson</li>
    </ul>

    <ol start="4">
      <li>James Madison</li>
      <li>James Monroe</li>
      <li>John Quincy Adams</li>
    </ol>

    <ul
      style={{
        backgroundColor: '#ddd',
        paddingTop: '1em',
        paddingBottom: '1em',
        fontWeight: 'bold'
      }}
    >
      {presidentsStr.map(president => (
        <li key={president}>{president}</li>
      ))}
    </ul>

    <ul>
      {presidentsObj.map(president => {
        return president.presidentIndex % 2 ? (
          <li key={president.presidentIndex}>
            {`${president.lastName}, ${president.firstName}, ${president.presidentIndex}-th`}
          </li>
        ) : null;
      })}
    </ul>

    <ul className="events">
      {serverResponse
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(event => {
          const date = new Date(event.date);
          return (
            <li key={event.id} style={date < Date.now() ? { opacity: '0.5' } : null}>
              <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/events/${event.id}/`}>
                {event.title}
              </a>
              <span>
                {getTimesOfDay(event.date)}, {date.toLocaleString()}
              </span>
              <span>{event.place}</span>
            </li>
          );
        })}
    </ul>

    <form className='form'
      onSubmit={(event) => {
        event.preventDefault();
        const payload = {
          name: event.target.name.value,
          password: event.target.password.value,
          plan: event.target.plan.value,
          newsletter: event.target.newsletter.checked,
        };

        fetch('https://postman-echo.com/post',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Headers': '*'
            },
            mode: 'no-cors',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(payload)
          })
          .then(console.log)
      }}
    >
      <div className="form__wrapper">
        <label htmlFor="name"> Name: </label>
        <input
          type="text"
          id="name"
          placeholder='Ann'
          required
        />

        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          minLength='4'
          id="password"
          placeholder='Enter password'
          required
        />
      </div>

      <div className="form__wrapper">
        <div>
          <label htmlFor="basic">Basic plan</label>
          <input
            type="radio"
            value='basic'
            id="basic"
            name="plan"
            defaultChecked
            onChange={(event) => event.target.defaultChecked = !event.target.defaultChecked}
          />
        </div>
        <div>
          <label htmlFor="premium">Premium plan</label>
          <input
            type="radio"
            value='premium'
            id="premium"
            name='plan'
            onChange={(event) => event.target.defaultChecked = !event.target.defaultChecked}
          />
        </div>
      </div>

      <div>
        <input
          type="checkbox"
          id="newsletter"
          defaultChecked
          onChange={(event) => event.target.defaultChecked = !event.target.defaultChecked}
        />
        <label htmlFor="newsletter">Subscribe at newsletter</label>
      </div>
      <button type='submit'>Buy</button>
    </form>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
