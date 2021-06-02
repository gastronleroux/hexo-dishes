import React from 'react';
import './App.css';
import DishesForm from './DishesForm';


class App extends React.Component {

  render(){
    return (
      <div className="App">
        <DishesForm onSubmit={this.submit}/>
      </div>
    );
  }
}

export default App;
