import axios from 'axios'
import React, { useEffect } from 'react'

const Servey = () => {


  useEffect (
    async()=>{
      const response = await axios.get("http://127.0.0.1:8000/api/get/")
      console.log(response)
    }
  )
  return (
    <div>
      <h1>Survey page</h1>
    </div>
  )
}

export default Servey
