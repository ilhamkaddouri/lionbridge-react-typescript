import React from 'react';
import './App.css';
//import { TextField } from './components/TextField';
import {TextField,Button} from '@material-ui/core'
import {Formik} from 'formik'
import Editor from './components/Editor/Editor'
import ListComponent from './components/List/ListComponent'
const App : React.FC = ()=> {
  return (
    <div className="App">
     {/* <Editor/> */}

     <ListComponent/>
    </div>
  );
}
export default App

