import React from 'react';
import './App.css';
import DishesForm from './DishesForm';

class App extends React.Component {
  
  submit = values => {
    // print the form values to the console
    console.log(values)
  }

  render(){
    return (
      <div className="App">
        <DishesForm onSubmit={this.submit}/>
      </div>
    );
  }
}

export default App;
