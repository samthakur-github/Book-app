import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentlyAdded = () => {
  const [ data, setData ] = useState();
  useEffect(()=>{
    const fetch = async ()=>{
        try {
          const response = await axios.get("http://localhost:3000/api/v1/recentlyAdd-books");
          console.log(response);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
        <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
    </div>
  )
}

export default RecentlyAdded;
