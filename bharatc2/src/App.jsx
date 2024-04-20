import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  let d=new Date();
  let tm=useRef(d.getTime());
//  let [tm,tmfun]=useState();
 useEffect(()=>{
   // setInterval(()=>{
     setInterval(()=>{
  let d=new Date();
  tm.current=(`${d.getMinutes ()}`+`${d.getSeconds()}`);
  // console.log(tm.current)
  },1000)

// },1000);
return ()=>{
  console.log("print...")
  clearInterval();
}

 },[])


  return (
    <>
      <h1>The Bharat clock time is </h1>
      <div> the time is {tm.current}{console.log(tm.current)}</div>
    </>
  )
}

export default App
