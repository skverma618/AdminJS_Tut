import React, { useState, useEffect } from "react";
import { Loader } from "@adminjs/design-system";
import { ApiClient } from "adminjs";

const api = new ApiClient();

function Calendar(props) {
    const [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(()=>{

    const fetchData = async () => {
        try{
            setLoading(true);
            let result = await api.getPage({
                pageName: 'Calendar',
            })

            setData(result.data);
            setLoading(false);
        }catch(e){
            setLoading(false);
            console.log(e);
        }
    }

    fetchData();

}, [])

console.log(data, "data in calendar");
  let content = (
    <>
      <div
        style={{
          width: "93%",
          margin: "auto",
          backgroundColor: "white",
          padding: "20px",
          marginTop: "20px",
          marginBottom: "20px",
          border: "1px solid #dad6d6",
          borderRadius: "12px",
        }}
      >
       
      </div>
    </>
  );

  if (loading) {
    content = <Loader />;
  }

  return content;
}

export default Calendar;
