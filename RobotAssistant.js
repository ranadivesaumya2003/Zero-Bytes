import React from 'react';
import './dark.css';

// simple animated robot using CSS
export default function RobotAssistant() {
  return (
    <div className="robot-container" style={{textAlign:'center', marginBottom:'20px'}}>
      <div className="robot" style={{display:'inline-block', width:'100px', height:'100px', position:'relative'}}>
        <div className="head" style={{width:'100px', height:'60px', background:'#0e639c', borderRadius:'10px 10px 5px 5px', position:'relative', animation:'float 3s ease-in-out infinite'}}>
          <div className="eye left" style={{width:'15px', height:'15px', background:'#fff', borderRadius:'50%', position:'absolute', top:'20px', left:'20px', animation:'blink 5s infinite'}}></div>
          <div className="eye right" style={{width:'15px', height:'15px', background:'#fff', borderRadius:'50%', position:'absolute', top:'20px', right:'20px', animation:'blink 5s infinite'}}></div>
        </div>
        <div className="body" style={{width:'60px', height:'40px', background:'#0e639c', margin:'0 auto', borderRadius:'5px'}}></div>
      </div>
    </div>
  );
}

// add CSS via global dark.css
