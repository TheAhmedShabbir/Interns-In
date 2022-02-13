import * as React from "react";
import Typography from "@mui/material/Typography";
import CompanyHeader from "../../Components/Company/CompanyHeader";
import img from "../../assets/images/Userpfp.jpg";


export default function CompanyProfile() {
  return (
    <div>
      <CompanyHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "20px",
          marginLeft : "40px",
          marginRight : "40px",
        }}
      >
        
          <img
            style={{
              height: "200px",
              width: "200px",
              marginTop : "30px",
              // marginLeft : "30px",
              border : '3px solid #548CCB'
            }}
            src={img}
            alt = "img"
            
          />
  
        
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            JustifyContent: "center",
            alignItems: "baseline",
            width: "900px",
            padding: "20px",
          }}
        >
          <h3>User Name</h3>
          <h3>E-mail</h3>
          <h3>Company Location</h3>
          <h3>Compny Affiliated Position</h3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <button>Edit</button>
          <button>CV</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "1200px",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            margin: "10px",
            padding: "10px",
            alignContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            border : '3px solid #548CCB'
          }}
        >
          <h2>Company details</h2>
          <button>Add</button>
          <button>Edit</button>
        </div>
        
      </div>    </div>
  );
}
