import React, { useState, useEffect } from "react";
import Adminheader from "../../Components/Admin/Adminheader";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  doc,
  orderBy,
} from "firebase/firestore";
import Loader from "../../Components/Common/Loader";
import { db, auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function ManageReports() {
  const RepCollection = collection(db, "Reports");
  const PostCollection = collection(db, "UserPosts");
  const [Rep, setRep] = useState([]);
  const [Post, setPost] = useState([]);
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
        // console.log(Rep)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPosts = async () => {
    const posts = await getDocs(PostCollection);
    const PostData = posts.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(PostData);
    setPost(PostData);
  };

  const DeleteReport = async (id) => {
    const RepCollection = doc(db, "Reports", Rep[id].id);
    await deleteDoc(RepCollection);
    getReports();
  };
  const DeletePost = async (Rid, id) => {
    const RepCollection = doc(db, "Reports", Rep[Rid].id);
    await deleteDoc(RepCollection);
    const PostCollection = doc(db, "UserPosts", Post[id].id);
    await deleteDoc(PostCollection);
    getReports();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email == "ahmed.shabbir1308@gmail.com") {
        getReports();
        getPosts();
      } else {
        navigate("/signin");
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f3f2ef",
            // paddingtop : '50px'
          }}
        >
          {Rep.map((item, key) => {
            return (
              <div key={key}>
                {Post.map((p, k) => {
                  return (
                    <div key={k}>
                      {item.ID == p.id ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "white",
                            marginTop: "20px",
                            // marginBottom: "15px",
                            padding: "10px",
                            borderRadius: "20px",
                            justifyContent: "space-between",
                            boxShadow: "0px 0px 20px black",
                            width: "800px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              margin: "15px",
                              justifyContent: "inherit",
                            }}
                          >
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <h4 style={{ color: "red" }}>{item.Reason}</h4>
                              <h5 style={{ marginLeft: "10px" }}>
                                reported at : {item.Time}
                              </h5>
                            </div>
                            <div>
                              <Button
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                  marginRight: "5px",
                                }}
                                onClick={() => {
                                  DeletePost(key, k);
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                  marginLeft: "5px",
                                }}
                                onClick={() => {
                                  DeleteReport(key);
                                }}
                              >
                                Ignore
                              </Button>
                            </div>
                          </div>
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
                              src={p.User_Pfp}
                              alt=""
                            />
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <h4
                                style={{
                                  marginLeft: "5px",
                                  marginRight: "10px",
                                }}
                              >
                                {p.User_Email}
                              </h4>
                              {p.Reply_ID ? (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <h5
                                    style={{
                                      marginLeft: "5px",
                                      color: "gray",
                                      marginRight: "10px",
                                    }}
                                  >
                                    replying to : {p.Reply_ID}
                                  </h5>
                                  <h5 style={{ color: "gray" }}>{p.Time}</h5>
                                </div>
                              ) : (
                                <h5 style={{ color: "gray" }}>{p.Time}</h5>
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
                            <p
                              style={{
                                marginLeft: "5px",
                                textAlign: "justify",
                              }}
                            >
                              {p.post}
                            </p>
                            {/* <Button style={{ marginLeft: "5px" }}>reply</Button> */}
                          </div>
                          {p.PostImg ? (
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
                                src={p.PostImg}
                                alt=""
                              />
                            </div>
                          ) : (
                            <></>
                          )}
                          <div>
                            {/* <h3>reason : {item.Reason}</h3>
                                      <h3>Reported at: {item.Time}</h3> */}
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
