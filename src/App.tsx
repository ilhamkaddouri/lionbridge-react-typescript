import React from 'react';
import './App.css';
import ListComponent from './components/List/ListComponent'
const App : React.FC = ()=> {
  return (
    <div className="App">
     <ListComponent data-testid="list-id"/>
    </div>
  );
}
export default App

