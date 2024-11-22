import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const Reports = () => {

    const [result, setresult] = useState()
    async function fun(){
        console.log("here")
        const data=await axios.get("http://localhost:5005/api/results",{headers:{Authorization:`Bearer ${localStorage.getItem('authToken')}`}})
        setresult(data.data.data.reverse())
        console.log(data.data.data)
    } 
    function convertISOToIndianTime(isoString) {
        const date = new Date(isoString);
    
        // Format time
        const time = date.toLocaleTimeString('en-IN', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });
    
        // Format day and date
        const dayDate = date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Kolkata'
        });
    
        // Add timezone information
        const timeZone = "India Standard Time IST UTC+5:30";
    
        return `${time}\n${dayDate},\n${timeZone}`;
    }
    
    // Example usage
    
    
    useEffect(() => {
        fun()
    },[])
    
  return (
    <div style={{display:'flex',justifyContent:"flex-start",flexDirection:'column',margin:'30px' ,color:'black'}}>
        {
            result&&result?.map((item,index)=>{
                return(
                    <div key={index} style={{border:'2px solid black ',width:'600px',padding:'10px', margin:'10px' ,color:'black'}}>
                        <NavLink to={`/reports/${item._id}`} onClick={()=>{localStorage.setItem("reportId",item._id)}}>{`${item.className} ${convertISOToIndianTime(item.timeStamp)}`}</NavLink>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Reports