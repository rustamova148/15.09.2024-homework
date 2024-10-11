import { useState } from 'react';
import './App.css'

function App() {
const [worker, setWorker] = useState({name:'', age:'', salary:''});
const [workers, setWorkers] = useState([]);
const [searchWord, setSearchWord] = useState('');
const [filteredData, setFilteredData] = useState([]);

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
    const newWorker = {...worker, fired: false};
    const updatedWorkers = [...workers, newWorker];
    setWorkers(updatedWorkers);
    setFilteredData(updatedWorkers);
    
    document.querySelector('#nameInp').value = "";
    document.querySelector('#ageInp').value = "";
    document.querySelector('#salaryInp').value = "";
    document.querySelector('#worker-adding').style.display = 'none';
  }
   
  function handleFire(id){
    console.log(id);
    let updatedAfterFire = filteredData.map((one,i) => {
    if((i+1) == id){
      return {...one, fired: true}
    }else{
      return one;
    }
    });
    setWorkers(updatedAfterFire);
    setFilteredData(updatedAfterFire);
  }

  function handleDelete(id){
   console.log(id);
   let updatedAfterDelete = filteredData.filter((one,i) => (i+1)!== id)
   setFilteredData(updatedAfterDelete);
  }

  function handleEdit(id){
    console.log(id);
    workers.filter(worker=>worker.id!==id);
    document.querySelector('#worker-editing').style.display = 'block';
    document.querySelector('#worker-adding').style.display = 'none';
  }

  function handleSearch(e){
    const keyword = e.toLocaleLowerCase().trim();
    setSearchWord(keyword);
    if(searchWord === ' '){
      setFilteredData(workers);
    }else{
    let filteredSearchData = [...workers].filter(worker=>worker.name.toLocaleLowerCase().includes(keyword));
      setFilteredData(filteredSearchData);
    }
  }

  function handleSortSalary(){
    let sortedSalary = [...filteredData].sort(function(a,b){return a.salary-b.salary})
    setFilteredData(sortedSalary);
    console.log(sortedSalary);
  }
  
  function handleSortAge(){
    let sortedAge = [...filteredData].sort(function(a,b){return a.age-b.age})
    setFilteredData(sortedAge);
    console.log(sortedAge);
  }

  function handleAverage(){
    const salaryArr = [];
    filteredData.map(filt=>{
      salaryArr.push(Number(filt.salary));
      let av = salaryArr.reduce(getSum, 0) / salaryArr.length;
      console.log(av);
      function getSum(total, num) {
        return total + Math.round(num);
      }
      document.querySelector('#average').innerHTML = Math.round(av);
    });
  }

  function handleFilterFired(){
    const firedWorkers = [...workers].filter(worker=> worker.fired === true);
    setFilteredData(firedWorkers);
    console.log(firedWorkers);
  }
  return (
    <>
      <input onChange={(e)=>handleSearch(e.target.value)} value={searchWord} type="search" placeholder='search'/>
      <button onClick={handleFilterFired}>filter Fired Employees</button>
      <button onClick={handleSortSalary}>sort by salary</button>
      <button onClick={handleSortAge}>sort by age</button>
      <button onClick={handleAverage}>calculate average salary</button> <br />
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
          {filteredData && filteredData.map((one,i)=>{
            return(
              <tr key={i} style={{color: one.fired ? 'red' : 'black'}}>
                <td>{i+1}</td>
                <td>{one.name}</td>
                <td>{one.age}</td>
                <td>{one.salary}</td>
                <td>{new Date().getDate() + ' ' + new Date().toLocaleString('default', {month: 'short'}) + ' ' + new Date().getFullYear()}</td>
                <td><button onClick={()=>handleFire(i+1)}>fire</button></td>
                <td><button onClick={()=>handleEdit(i+1)}>edit</button></td>
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
        <input id='nameInp2' type="text" placeholder='name' onChange={e =>setWorker({...worker, name:e.target.value})} />
        <input id='ageInp2' type="number" placeholder='age' onChange={e =>setWorker({...worker, age:e.target.value})} />
        <input id='salaryInp2' type="number" placeholder='salary' onChange={e =>setWorker({...worker, salary:e.target.value})} />
        <button>confirm edit</button>
        <button onClick={handleCancelEdit}>cancel</button>
      </div>
      <p>Average Salary: <span id='average'>0</span></p>
    </>
  )
}

export default App

//edit qaldi aglim qarisdi burada