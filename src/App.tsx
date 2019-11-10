import React from 'react';
import './App.css';
import QuickSort from './components/QuickSort'
import BinarySearchTree from "./components/BinarySearchTree";


const App: React.FC = () => {
  return (
    <div className="App">
      <QuickSort/>
      <BinarySearchTree/>
    </div>
  );
}


export default App;
