import React, { useState, useEffect } from "react";
import Adminheader from "../../Components/Admin/Adminheader";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Loader from "../../Components/Common/Loader";
import { db, auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";



export default function ManageReports() {
  


  const RepCollection = collection(db, "Reports");
  const [Rep, setRep] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  const getReports = async () => {
    const data = query(RepCollection, orderBy("Time", "desc"));
    await getDocs(data)
      .then((doc) => {
        const Fdata = doc.docs.map((forums) => ({
          ...forums.data(),
          id: forums.id,
        }));
        setRep(Fdata);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPosts = async () => {
    const data = query(RepCollection, where("ID", "==", ) ,orderBy("Time", "desc"));
    await getDocs(data)
      .then((doc) => {
        const Fdata = doc.docs.map((forums) => ({
          ...forums.data(),
          id: forums.id,
        }));
        setRep(Fdata);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email == "ahmed.shabbir1308@gmail.com") {
        getReports();
      } else {
        navigate("/" + localStorage.getItem("page"));
      }
    });
  }, [user]);


  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <div>
          <Adminheader />
          <div style = {{display : 'flex', flexDirection : 'column', justifyContent : 'center'}}>
            {Rep.map((item, key)=> {
              return (
                <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  margin: "15px",
                  // borderRadius: "20px",
                  justifyContent: "space-between",
                  boxShadow: "0px 0px 20px black",
                  // maxWidth: "200px",
                  // backgroundColor: 'red'
                }}
                key={key}
              >
                <div
                  style={{
                    margin: "5px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    // backgroundColor: 'blue',
                    borderRadius: "20px",
                  }}
                >
                  {/* <div style = {{display : 'flex', flexDirection : 'row', justifyContent: 'initial'}}> */}
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50px",
                      marginRight: "15px",
                    }}
                    src={item.User_Pfp}
                    alt=""
                  />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h4 style={{ marginLeft: "5px", marginRight: "10px" }}>
                      {item.User_Email}
                    </h4>
                    {item.Reply_ID ? (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h5
                          style={{
                            marginLeft: "5px",
                            color: "gray",
                            marginRight: "10px",
                          }}
                        >
                          replying to : {item.Reply_ID}
                        </h5>
                        <h5 style={{ color: "gray" }}>{item.Time}</h5>
                      </div>
                    ) : (
                      <h5 style={{ color: "gray" }}>{item.Time}</h5>
                    )}
                  </div>
                  {/* </div> */}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "initial",
                    marginLeft: "10px",
                    // alignItems: "flex-start",
                    // backgroundColor: 'green'
                  }}
                >
                  <p style={{ marginLeft: "5px", textAlign: "justify" }}>
                    {item.post}
                  </p>
                  {/* <Button style={{ marginLeft: "5px" }}>reply</Button> */}
                </div>
                {item.PostImg ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignContent: "left",
                      marginLeft: "15px",
                    }}
                  >
                    <img
                      style={{
                        height: "250px",
                        width: "250px",
                      }}
                      src={item.PostImg}
                      alt=""
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              )
            })}
            
          </div>
      </div>
    
  )
}
}