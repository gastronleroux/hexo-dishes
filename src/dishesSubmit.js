import { SubmissionError } from 'redux-form'
import './App.css';
import fetchData from './fetchData';
import dishesFields from './dishesFields';

const dishesSubmit = values => {
  const fetch_data = fetchData(dishesFields(values.type, values), 'POST').dishes;
  return new Promise((resolve, reject) => {
      fetch(fetch_data.url, fetch_data.init)
      .then(response => {
        let promise = Promise.resolve(response.json());
        if(response.ok){
          promise.then(function(value){
              alert("Dish submitted successfully. Response:\n"+Object.keys(value).map(i => ("\n"+i+": "+value[i])));
              resolve();
          })
        }else{
          promise.then(function(value){
              reject(new SubmissionError(value));
          })
        }
      });
  })
}
export default dishesSubmit;