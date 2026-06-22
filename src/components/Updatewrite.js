import React, { useEffect } from "react";
import { useState } from "react";
import app from "../firebaseConfig"
import { getDatabase, ref, get, set } from "firebase/database";
import { divide } from "firebase/firestore/pipelines";
import { Navigate, useNavigate, useParams } from "react-router-dom";
function Updatewrite() {
    const navigate = useNavigate();
    const { firebaseId } = useParams();
    const [loading, setLoading] = useState(false);
    let [input1, setInput1] = useState('')
    let [input2, setInput2] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const db = getDatabase(app);
            const dbRef = ref(db, "nature/fruits/" + firebaseId);

            await get(dbRef)
                .then((snapData) => {
                    if (snapData.exists()) {
                        const targetObject = snapData.val();

                        setInput1(targetObject.fruitName);
                        setInput2(targetObject.fruitDes);
                    } else {
                        alert("No data found");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert("Error fetching data");
                });

            setLoading(false);
        };

        fetchData();
    }, [firebaseId]);

    const oveWriteData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, 'nature/fruits/' + firebaseId)
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
            <button onClick={oveWriteData}>Update</button>
            <br />
            <br />
            <br />
            <br />
            <button className="button1" onClick={() => { navigate('/update-read') }}>Go To Up Date</button>
            <button className="button1" onClick={() => { navigate('/read') }}>Go To Read</button>
        </div>


    )
}

export default Updatewrite;