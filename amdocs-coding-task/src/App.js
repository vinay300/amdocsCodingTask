import logo from './logo.svg';
import './App.css';
import Loading from './Components/Loading';
import { useEffect, useState } from 'react';
import axios from '../node_modules/axios/dist/axios';
import TodoList from './Components/TodoList';
import _ from 'lodash';

function App() {
  const [todos, setTodos] = useState(null);
  const [checkedState, setCheckedState] = useState([]);
  const [checkedAllState, setCheckedAllState] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);

  useEffect(()=> {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((result) => {
      setTodos(result.data);
      setCheckedState(new Array(todos.length).fill(false));
     
    }).catch((error) =>{
      console.log(error);
    })
  },[])

  let handleDeleteAll = () => {
    setTodos([]);
  }

  let handleDeleteItem = (id) => {
    let updatedList = todos.filter((item) => {
      return item.id != id
    })  
    setTodos(updatedList);
  }

  let handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item : item
  );
  setCheckedState(updatedCheckedState);
  }

  let handleOnAllChange = () => {
   setCheckedAllState((prevState) => !prevState);
   if(!checkedAllState){
    setCheckedState(new Array(todos.length).fill(true));
   }else{
    setCheckedState(new Array(todos.length).fill(false));
   }
   
  }

  let handleDeleteSelected = () => {
    let tempArray = [];
    _.forEach(checkedState, function(item,index){
      if(item){
        tempArray.push(index);
     }
    })
    setSelectedValue([...selectedValue,tempArray]);
    _.forEach(todos, function(item,index){
      if(tempArray.includes(index)){
        todos.splice(index,1);
      }
    })
    setTodos([...todos])
  }

  return (
    <div className="App">
      {todos ? <TodoList data={todos} handleDeleteAllParent={handleDeleteAll}
      handleDeleteItemParent={handleDeleteItem} handleOnChangeParent={handleOnChange} 
      handleOnAllChangeParent={handleOnAllChange} handleDeleteSelectedParent={handleDeleteSelected} checkedState={checkedState} checkedAllState={checkedAllState}/> : <Loading />}
       
    </div>
  );
}

export default App;
