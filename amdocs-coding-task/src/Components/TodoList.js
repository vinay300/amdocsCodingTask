import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function TodoList ({data, handleDeleteAllParent, handleDeleteItemParent, 
    handleOnChangeParent, handleOnAllChangeParent, handleDeleteSelectedParent, checkedState, checkedAllState}) {
    let handleDeleteItem = (id) => {
        handleDeleteItemParent(id);
    }

    let handleDeleteAll = () => {
        handleDeleteAllParent();
    }

    let handleOnChange = (index) => {
        handleOnChangeParent(index);
    }
    
    let handleOnAllChange = () => {
        handleOnAllChangeParent();
    }

    let handleDeleteSelected = () => {
        handleDeleteSelectedParent();
    }

    return (
        <div>
        <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"><input
                            type="checkbox"
                            id={`custom-checkbox`}
                            checked={checkedAllState}
                            onChange={() => handleOnAllChange()}
                            />
            </th>
            <th scope="col">Id</th>
            <th scope="col">User Id</th>
            <th scope="col">Title</th>
            <th scope="col">Completed</th>
            <th scope="col">{ checkedAllState ? <button className='btn btn-sm btn-danger' onClick={handleDeleteAll}>Delete All</button> : <button className='btn btn-sm btn-danger' onClick={handleDeleteSelected}>Delete Selected</button>}</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item,index)=> (
            <tr key={item.id}>
            <th scope="col"><input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                            />
            </th>
            <th scope="row">{item.id}</th>
            <td>{item.userId}</td>
            <td>{item.title}</td>
            <td>{item.completed ? <p style={{color: "green"}}>True</p> : <p  style={{color: "red"}}>False</p>}</td>
            <td><FontAwesomeIcon onClick={handleDeleteItem.bind(this,item.id)} icon={faTrash} /></td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>)
}

export default TodoList;

