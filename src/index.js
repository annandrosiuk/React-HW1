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

    <ul>
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
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
