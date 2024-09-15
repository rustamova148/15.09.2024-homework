import { useState } from 'react';
import './App.css'

function App() {
const [worker, setWorker] = useState({name:'', age:'', salary:''});
const [workers, setWorkers] = useState([]);
const [searchWord, setSearchWord] = useState('');

  function handleAdd(){
      document.querySelector('#worker-adding').style.display = 'block';
      document.querySelector('#worker-editing').style.display = 'none';
  }

  function handleCancel(){
      document.querySelector('#worker-adding').style.display = 'none';
  }

  function handleCancelEdit(){
    document.querySelector('#worker-editing').style.display = 'none';
  }

  function handleConfirm(){
    setWorkers([...workers, {...worker, fired: false}]);
    console.log(workers);
    document.querySelector('#nameInp').value = "";
    document.querySelector('#ageInp').value = "";
    document.querySelector('#salaryInp').value = "";
    document.querySelector('#worker-adding').style.display = 'none';
  }
   
  function handleFire(id){
    console.log(id);
    let updatedAfterFire = workers.map((one,i) => {
    if((i+1) == id){
      return {...one, fired: true}
    }else{
      return one;
    }
    });
    setWorkers(updatedAfterFire);
  }

  function handleDelete(id){
   console.log(id);
   let updatedAfterDelete = workers.filter((one,i) => (i+1)!== id)
   setWorkers(updatedAfterDelete);
  }

  function handleEdit(){
    document.querySelector('#worker-editing').style.display = 'block';
    document.querySelector('#worker-adding').style.display = 'none';
  }

  // function handleSearch(e){
  //   setSearchWord(e.target.value);
  //   if(workers.includes(searchWord)){
  //      worker
  //   }
  // }

  return (
    <>
      <input onChange={(e)=>handleSearch(e)} type="search" placeholder='search'/>
      <button>filter Fired Employees</button>
      <button>sort by salary</button>
      <button>sort by age</button>
      <button>calculate average salary</button> <br />
      <button onClick={handleAdd}>Add</button>
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>age</th>
          <th>salary</th>
          <th>created date</th>
          <th>fire</th>
          <th>edit</th>
          <th>delete</th>
        </tr>
        </thead>
        <tbody>
          {workers.map((one,i)=>{
            return(
              <tr key={i} style={{color: one.fired ? 'red' : 'black'}}>
                <td>{i+1}</td>
                <td>{one.name}</td>
                <td>{one.age}</td>
                <td>{one.salary}</td>
                <td>{new Date().getDate() + ' ' + new Date().toLocaleString('default', {month: 'short'}) + ' ' + new Date().getFullYear()}</td>
                <td><button onClick={()=>handleFire(i+1)}>fire</button></td>
                <td><button onClick={()=>handleEdit()}>edit</button></td>
                <td><button onClick={()=>handleDelete(i+1)}>delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table> <br />
      <div id='worker-adding' style={{display:'none'}}>
        <input id='nameInp' onChange={(e)=>setWorker({...worker, name:e.target.value})} type="text" placeholder='name' />
        <input id='ageInp' onChange={(e)=>setWorker({...worker, age:e.target.value})} type="number" placeholder='age' />
        <input id='salaryInp' onChange={(e)=>setWorker({...worker, salary:e.target.value})} type="number" placeholder='salary' />
        <button onClick={handleConfirm}>confirm</button>
        <button onClick={handleCancel}>cancel</button>
      </div>
      <div id='worker-editing' style={{display:'none'}}>
        <input id='nameInp2' type="text" placeholder='name' />
        <input id='ageInp2' type="number" placeholder='age' />
        <input id='salaryInp2' type="number" placeholder='salary' />
        <button>confirm edit</button>
        <button onClick={handleCancelEdit}>cancel</button>
      </div>
      <p>Average Salary: <span>0</span></p>
    </>
  )
}

export default App

//edit qaldi aglim qarisdi burada