import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import UserHeader from "../../Components/User/Userheader";
import img from "../../assets/images/Userpfp.jpg";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserAbout() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const UserInfoCollection = collection(db, "Applicant");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);


// Get / post User Education

const [UserEducation, setUserEducation] = useState([]);
const [Degree, setDegree] = useState("");
const [Institute, setInstitute] = useState("");
const [Status, setStaatus] = useState("");
const [Duration, setDuration] = useState("");

//Database variable
const EduCollection = collection(db, "UserEducation");


//Get User Education From Firestore database
useEffect(() => {
  const getEducation = async () => {
    const data = await getDocs(EduCollection);
    setUserEducation(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(UserEducation)
  };

  getEducation();
},[])

//Post User Education into Firestore database
const postDegree = async () => {
  await addDoc(EduCollection, {Degree_Name : Degree,
  Institute_Name : Institute,
  Status : Status,
  Duration : Duration});
};



//Get / Post User Experience

const [UserExperience, setUserExperience] = useState([]);
const [Company, setCompany] = useState("");
const [Position, setPosition] = useState("");
const [ Certified, setCertified] = useState("");
const [Duration2, setDuration2] = useState("");

//Database variable
const ExpCollection = collection(db, "UserExperience");


//Get User Eperience From Firestore database
useEffect(() => {
  const getExperience = async () => {
    const data = await getDocs(ExpCollection);
    setUserExperience(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(UserEdxperience)
  };

  getExperience();
},[])

//Post User Experience into Firestore database
const postExp = async () => {
  await addDoc(EduCollection, {Company_Name : Company,
  Position : Position,
  Certified : Certified,
  Duration2 : Duration2});
};


//Get / Post User Skills

const [UserSkills, setUserSkills] = useState([]);
const [Skills, setSkills] = useState([]);


const SkillCollection = collection(db, "UserSkills");

//Get User skills From Firestore database
useEffect(() => {
  const getSkills = async () => {
    const data = await getDocs(SkillCollection);
    setUserSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(UserSkills)
  };

  getSkills();
},[])

//Post User skills into Firestore database
const postSkills = async () => {
  await addDoc(SkillCollection, {Skills : Skills});
};



//Upload CV
const [uploadFile, setUploadFile] = useState(true);


const HandleUpload = () => {}




  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    if (user) {
      // get forums
      const getUserInfo = async () => {
        const data = await getDocs(UserInfoCollection);
        setUserInfo(data.docs.map((doc) => ({ ...doc.data() })));
      };

      // Function Calls
      getUserInfo();
    } else {
      navigate("/SignIn");
    }
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ backgroundColor: "#f3f2ef" }}>
        <UserHeader />
        {userInfo.map((userinfo) => {
          return (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: "25px",
                  backgroundColor: "#fff",
                  width: "1200px",
                  padding: "15px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <div style={{ paddingTop: "10px",paddingLeft : '10px',paddingRight : '10px', marginLeft: "10px",marginRight: "10px" ,}}>
                    <img
                      style={{ borderRadius: "110px" }}
                      width="150px"
                      height="150px"
                      src={img}
                    />
                  </div>
                  <h3>{userinfo.Name}</h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    JustifyContent: "center",
                    alignItems: "baseline",
                    width: "900px",
                    padding: "20px",
                    marginLeft: "20px",
                    
                  }}
                >
                  <h3>{userinfo.email}</h3>
                  <h3>{userinfo.Location}</h3>
                  <h3>{userinfo.About}</h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    marginRight: "20px",
                    
                  }}
                >
                  <Button >
                    <EditIcon/>
                  </Button>
                  {/* Upload CV */}
                  {uploadFile ? (
                    <Button size="small" variant="outlined" onClick={() => {
                      setUploadFile(false);
                    }}>
                    CV
                  </Button>
                  ) : (
                    <input type="file" onChange={HandleUpload} />
                  )}
                  
                </div>
              </div>


              
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >

{/* Education Block */}
{UserEducation.map((item, key) => {
  return(
                <div
                  style={{
                    // minHeight: "300px",
                    width: "1200px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    margin: "10px",
                    padding: "15px",
                    backgroundColor : 'white'
                  }}
                  key = {key}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      backgroundColor : 'white',
                      
                    }}
                  >
                    <h2 style={{ margin: "10px", padding: "10px" }}>
                      Education
                    </h2>
                    <div style={{ padding: "10px", margin: "10px" }}>
                      <Button
                        style={{ margin: "10px",}}
                      >
                        <AddCircleOutlineIcon/>
                      </Button>
                      
                    </div>
                  </div>
                    
                    <div style ={{display : 'flex', flexDirection : 'row', border : '2px solid #548CCB',borderRadius : '15px'}}>
                    <div 
                    style = {{
                    display : 'flex', 
                    flex : '1.90',
                    flexDirection : 'column', 
                    justifyContent : 'space-evenly', 
                    alignItems : 'start', 
                    margin : '25px',
                    paddingLeft : '25px',
                    
                    backgroundColor: 'white'
                    }}>
                      <h3>Degree Name : {item.Degree_Name}</h3>
                      <h3>Institution Name : {item.Institute_Name}</h3>
                      <h3>Status : {item.Status}</h3>
                      <h3>Duration : {item.Duration}</h3>
                      </div>

                      <div 
                    style = {{
                    display : 'flex', 
                    flex : '0.10',
                    flexDirection : 'column', 
                    // justifyContent : ''
                    // // alignItems : 'start', 
                    margin : '25px',
                    paddingLeft : '25px',
                    
                    backgroundColor: 'white'}}>
                     <Button><EditIcon/></Button>
                     <Button><DeleteIcon/></Button>
                    </div>
                    
                    </div>                 
                </div>
  );
                })}
                
{/*User Eperience Block*/}
{UserExperience.map((item, key) => {
  return(

  
                <div
                  style={{
                    // height: "300px",
                    width: "1200px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    margin: "10px",
                    padding: "15px",
                    backgroundColor : 'white'
                  }}
                  key = {key}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      backgroundColor : 'white'
                    }}
                  >
                    <h2 style={{ margin: "10px", padding: "10px" }}>
                      Experience
                    </h2>
                    <div style={{ padding: "10px", margin: "10px" }}>
                      <Button
                        style={{ margin: "10px" }}
                      >
                        <AddCircleOutlineIcon/>
                      </Button>
                    </div>
                  </div>


                  <div style ={{display : 'flex', flexDirection : 'row', border : '2px solid #548CCB',borderRadius : '15px'}}>
                  <div 
                    style = {{
                    display : 'flex', 
                    flex : '1.90',
                    flexDirection : 'column', 
                    justifyContent : 'space-evenly', 
                    alignItems : 'start', 
                    margin : '25px',
                    paddingLeft : '25px',
                   
                    backgroundColor: 'white'
                    }}>
                      <h3>Company Name : {item.Compny_Name}</h3>
                      <h3>Position Name : {item.Position}</h3>
                      <h3>Duration : {item.Duration}</h3>
                      <h3>Certified : {item.Certified}</h3>
                    </div>
                    <div 
                    style = {{
                    display : 'flex', 
                    flex : '0.10',
                    flexDirection : 'column', 
                    // justifyContent : ''
                    // // alignItems : 'start', 
                    margin : '25px',
                    paddingLeft : '25px',
                    
                    backgroundColor: 'white'}}>
                     <Button><EditIcon/></Button>
                     <Button><DeleteIcon/></Button>
                    </div>
                    </div>
                </div>
                 );
                })}



{/*User Skills Block*/} 
{UserSkills.map((item, key) => {
  return(

 

                <div
                  style={{
                    // height: "300px",
                    width: "1200px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    margin: "10px",
                    padding: "15px",
                    backgroundColor: "white",
                  }}
                  key = {key}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      backgroundColor : 'white'
                    }}
                  >
                    <h2 style={{ margin: "10px", padding: "10px" }}>Skills</h2>
                    <div style={{ padding: "10px", margin: "10px" }}>
                      <Button
                        style={{ margin: "10px" }}
                        
                      >
                        <AddCircleOutlineIcon/>
                      </Button>
                     
                    </div>
                  </div>


                  <div style ={{display : 'flex', flexDirection : 'row', border : '2px solid #548CCB',borderRadius : '15px'}}>
                  <div 
                    style = {{
                    display : 'flex', 
                    flex : '1.90',
                    flexDirection : 'column', 
                    justifyContent : 'space-evenly', 
                    alignItems : 'start', 
                    margin : '25px',
                    paddingLeft : '25px',
                   
                    backgroundColor: 'white'
                    }}>
                      <h3>{item.Skills}</h3>
                      
                    </div>
                    <div 
                    style = {{
                    display : 'flex', 
                    flex : '0.10',
                    flexDirection : 'column', 
                    // justifyContent : ''
                    // // alignItems : 'start', 
                    margin : '25px',
                    paddingLeft : '25px',
                    
                    backgroundColor: 'white'}}>
                     <Button><EditIcon/></Button>
                     <Button><DeleteIcon/></Button>
                    </div>
                
                   </div>
                  </div>
                   );
                  })}


                </div>
              // </div>
            // </div>
          );
        })}
      </div>
      
    );
  }
}
