import React, { Component, useEffect, useState } from "react";
import '../styles/App.css';

const App = () => {
  const[workDuration,setWorkDuration] = useState(25)
  const[breakDuration,setBreakDuration] = useState(5)
  const[workSecond,setWorkSecond]=useState(1500)
  const[breakSecond,setBreakSecond]=useState(300)
  const[type, setType]=useState("work")
  const[resetFlag,setResetFlag]=useState(true)
  const[timerOn, setTimerOn]=useState(false)

  const displayTime=(sec)=>{
    let m = parseInt(sec/60).toString()
    let s = parseInt(sec%60).toString()
    if(m.length === 1){
      m = '0' + m
    }
    if(s.length === 1){
      s = '0' + s
    }
    return m+":"+s;
  }
  const setDuration=(e)=>{
    if(workDuration>0 && breakDuration>0){
    e.preventDefault();
    setResetFlag(false)
    setType('work')
    setWorkSecond(workDuration*60)
    setBreakSecond(breakDuration*60)
    }else{
      alert("time should be greater than zero.")
    }

  }
  const handleStart=(e)=>{
    setTimerOn(!timerOn)
  }
  const handleReset=()=>{
    setTimerOn(false)
    setResetFlag(true)
    setType('work')
    setWorkDuration(25)
    setBreakDuration(5)
    setBreakSecond(5*60)
    setWorkSecond(25*60)

  }
  const handleStop=(e)=>{
    setTimerOn(false)
    // setResetFlag(!resetFlag)
  }
  useEffect(()=>{
    if(timerOn && type==='work'){
      if(workSecond>0){
        const timerId=setTimeout(() => {
          setWorkSecond(workSecond-1)
        }, 1000);
        return ()=>clearTimeout(timerId)
      }
      if(workSecond===0){
        alert("Work duration is over.")
        setType('break')
        setWorkSecond(workDuration*60)
      }
    }
    if(timerOn && type==='break'){
      if(breakSecond>0){
        const timerId=setTimeout(() => {
          setBreakSecond(breakSecond-1)
        }, 1000);
        return ()=>clearTimeout(timerId)
      }
      if(breakSecond===0){
        alert("break duration is over.")
        setType('work')
        setBreakSecond(breakDuration*60)
      }
    }
  },[timerOn,type,workSecond, breakSecond])
  return (
    <div className="App">
      <div className="clock">
        <h1 className="timer">{type==='work'?displayTime(workSecond):displayTime(breakSecond)}</h1>
        <h3 className="">{type==='work'?"Work-Time":"Break-Time"}</h3>
      </div>
      <div className="control">
        <button data-testid='start-btn' disabled={timerOn} onClick={handleStart}>Start</button>
        <button data-testid='stop-btn' disabled={!timerOn} onClick={handleStop}>Stop</button>
        <button data-testid='reset-btn' disabled={resetFlag} onClick={handleReset}>Reset</button>   
      </div>
      <div className="parameters">
        <form onSubmit={setDuration}>
          <input 
          type={"number"} 
          data-testid='work-duration' 
          placeholder="Work duration" 
          required
          value={workDuration}
          disabled={timerOn}
          onChange={(e)=>setWorkDuration(e.target.value)}
          />
          <input 
          type={"number"} 
          data-testid='break-duration' 
          placeholder="Break duration" 
          required 
          value={breakDuration}
          disabled={timerOn}
          onChange={(e)=>setBreakDuration(e.target.value)}
          />
          <button  data-testid='set-btn' type="submit" disabled={timerOn}>Set</button>
        </form>
      </div>
    </div>
  )
}


export default App;
