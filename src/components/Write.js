import React from "react";
import { useState } from "react";
import app from "../firebaseConfig"
import { getDatabase, ref, push, set } from "firebase/database";
import { divide } from "firebase/firestore/pipelines";
import { Navigate, useNavigate } from "react-router-dom";
function Write() {
  const navigate = useNavigate();

  let [input1, setInput1] = useState('')
  let [input2, setInput2] = useState('')

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, 'nature/fruits'))
    set(newDocRef, {
      fruitName: input1,
      fruitDes: input2
    }).then(() => {
      alert("data save successfully!")
    }).catch((error) => {
      alert('error: ', error.message)
    })
  }


  return (
    <div style={{ padding: '10px' }}>
      <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
      <br />
      <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
      <br />
      <button onClick={saveData}>Save Button</button>
      <br />
      <br />
      <br />
      <br />
      <button className="button1" onClick={() => { navigate('/update-read') }}>Go To Up Date</button>
      <button className="button1" onClick={() => { navigate('/read') }}>Go To Read</button>
    </div>


  )
}

export default Write;