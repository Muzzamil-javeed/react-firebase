import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, get, ref } from "firebase/database";

const Read = () => {
    const [fruitsData, setFruitsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);

        try {
            const db = getDatabase(app);
            const dbRef = ref(db, "nature/fruits");
            const snapData = await get(dbRef);

            if (snapData.exists()) {
                setFruitsData(Object.values(snapData.val()));
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

    return (
        <div>
            <button onClick={fetchData} disabled={loading}>
                {loading ? "Fetching..." : "Show Data"}
            </button>

            {loading && <h3>Loading Data...</h3>}

            <ul>
                {fruitsData.map((item, index) => (
                    <li key={index}>
                        {item.fruitName} : {item.fruitDes}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Read;