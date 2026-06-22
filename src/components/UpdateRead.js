import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, get, ref, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

const UpdateRead = () => {
    const [fruitsData, setFruitsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);

        try {
            const db = getDatabase(app);
            const dbRef = ref(db, "nature/fruits");
            const snapData = await get(dbRef);

            if (snapData.exists()) {

                const myData = snapData.val();
                const tempArray = Object.keys(myData).map((firedId) => {
                    return {
                        ...myData[firedId],
                        fruitId: firedId

                    }
                })

                setFruitsData(tempArray);
            } else {
                alert("No data found");
            }
        } catch (error) {
            console.error(error);
            alert("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async (fruitId) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }

        try {
            const db = getDatabase(app);
            const dbRef = ref(db, "nature/fruits/" + fruitId);
            await remove(dbRef);
            alert("Data deleted successfully!");
            setFruitsData(fruitsData.filter((item) => item.fruitId !== fruitId));
        } catch (error) {
            console.error(error);
            alert("Error deleting data");
        }
    };

    return (
        <div>
            <button onClick={fetchData} disabled={loading}>
                {loading ? "Fetching..." : "Show Data"}
            </button>

            {loading && <h3>Loading Data...</h3>}

            <ul>
                {fruitsData.map((item, index) => (
                    <li key={index}>
                        {item.fruitName} : {item.fruitDes} : {item.fruitId}
                        <button
                            className="button1"
                            onClick={() => {
                                navigate(`/updatewrite/${item.fruitId}`);
                            }}
                        >
                            Update
                        </button>
                        <button
                            className="button1"
                            onClick={() => deleteData(item.fruitId)}
                        >
                            Delete
                        </button>
                        <br />
                    </li>
                ))}
            </ul>

            <br />
            <br />
            <br />
            <br />
            <button className="button1" onClick={() => { navigate('/') }}>Go To Home</button>
            <button className="button1" onClick={() => { navigate('/read') }}>Go To Read</button>

        </div>
    );
};

export default UpdateRead;