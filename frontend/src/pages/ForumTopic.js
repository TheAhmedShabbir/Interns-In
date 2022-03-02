import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserHeader from "../Components/User/Userheader";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import img from "../assets/images/Userpfp.jpg";
// import { Comment, Form, } from 'semantic-ui-react'


export default function ForumTopic() {
  const [forumTopic, setForumTopic] = useState([]);
  const forumTopicCollection = collection(db, "Forum Topic");

  useEffect(() => {
    // get forums topic
    const getForumTopic = async () => {
      const data = await getDocs(forumTopicCollection);
      setForumTopic(data.docs.map((doc) => ({ ...doc.data() })));
    };

    // Function Calls
    getForumTopic();
  }, []);

  return (
    <div>
      <UserHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "#f3f2ef",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop : '50px',
          minHeight: "600px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "blue",
            flexWrap: "wrap",
            padding: "15px",
          }}
        >
          {forumTopic.map((forumtopic) => {
            return (
              <div>
                <h2>{forumtopic.Description}</h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    // alignItems: "center",
                    backgroundColor: "purple",
                    minHeight: "600px",
                    borderRadius: "10px",
                    margin: "8px",
                    minWidth: "900px",
                  }}
                > 
                <div style = {{alignContent : 'baseline'}}>
                  <Button>Ask a Question</Button>
                  {/* <TextField/> */}
                </div>
                <div  style = {{display : 'flex', flexDirection : 'row' , backgroundColor : 'white', margin : '15px',borderRadius : '20px'}}>
                  <div style = {{marginright : '5px'}}>
                    <img style = {{height : '100px', width : '100px', borderRadius : '50px'}}
                    src = {img}
                    alt = ""
                    />
                  </div>
                  <div style = {{display : 'flex', flexDirection : 'column', margin : '5px', justifyContent : 'space-evenly', alignItems : 'flex-start',}}>
                    <h4 style = {{marginLeft : '5px'}}>
                      My Name
                    </h4>
                    <p style = {{marginLeft : '5px',textAlign : 'justify'}}>
                      My Question
                    </p>
                    <Button style = {{marginLeft : '5px'}}>reply</Button>
                  </div>
                </div> 
                <div  style = {{display : 'flex', flexDirection : 'row' , backgroundColor : 'white', margin : '15px',borderRadius : '20px'}}>
                  <div style = {{marginright : '5px'}}>
                    <img style = {{height : '100px', width : '100px', borderRadius : '50px'}}
                    src = {img}
                    alt = ""
                    />
                  </div>
                  <div style = {{display : 'flex', flexDirection : 'column', margin : '5px', justifyContent : 'space-evenly', alignItems : 'flex-start',}}>
                    <h4 style = {{marginLeft : '5px'}}>
                      My Name
                    </h4>
                    <p style = {{marginLeft : '5px',textAlign : 'justify'}}>
                      My Question
                    </p>
                    <Button style = {{marginLeft : '5px'}}>reply</Button>


                  </div>
                </div> 
                 <div  style = {{display : 'flex', flexDirection : 'row' , backgroundColor : 'white', margin : '15px',borderRadius : '20px'}}>
                  <div style = {{marginright : '5px'}}>
                    <img style = {{height : '100px', width : '100px', borderRadius : '50px'}}
                    src = {img}
                    alt = ""
                    />
                  </div>
                  <div style = {{display : 'flex', flexDirection : 'column', margin : '5px', justifyContent : 'space-evenly', alignItems : 'flex-start',}}>
                    <h4 style = {{marginLeft : '5px'}}>
                      My Name
                    </h4>
                    <p style = {{marginLeft : '5px',textAlign : 'justify'}}>
                      My Question
                    </p>
                    <Button style = {{marginLeft : '5px'}}>reply</Button>


                  </div>
                </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// import React from 'react'
// import { Button, Comment, Form, Header } from 'semantic-ui-react'

// const ForumTopic = () => (
//   <Comment.Group>
//     <Header as='h3' dividing>
//       Comments
//     </Header>

//     <Comment>
//       <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
//       <Comment.Content>
//         <Comment.Author as='a'>Matt</Comment.Author>
//         <Comment.Metadata>
//           <div>Today at 5:42PM</div>
//         </Comment.Metadata>
//         <Comment.Text>How artistic!</Comment.Text>
//         <Comment.Actions>
//           <Comment.Action>Reply</Comment.Action>
//         </Comment.Actions>
//       </Comment.Content>
//     </Comment>

//     <Comment>
//       <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
//       <Comment.Content>
//         <Comment.Author as='a'>Elliot Fu</Comment.Author>
//         <Comment.Metadata>
//           <div>Yesterday at 12:30AM</div>
//         </Comment.Metadata>
//         <Comment.Text>
//           <p>This has been very useful for my research. Thanks as well!</p>
//         </Comment.Text>
//         <Comment.Actions>
//           <Comment.Action>Reply</Comment.Action>
//         </Comment.Actions>
//       </Comment.Content>
//       <Comment.Group>
//         <Comment>
//           <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
//           <Comment.Content>
//             <Comment.Author as='a'>Jenny Hess</Comment.Author>
//             <Comment.Metadata>
//               <div>Just now</div>
//             </Comment.Metadata>
//             <Comment.Text>Elliot you are always so right :)</Comment.Text>
//             <Comment.Actions>
//               <Comment.Action>Reply</Comment.Action>
//             </Comment.Actions>
//           </Comment.Content>
//         </Comment>
//       </Comment.Group>
//     </Comment>

//     <Comment>
//       <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
//       <Comment.Content>
//         <Comment.Author as='a'>Joe Henderson</Comment.Author>
//         <Comment.Metadata>
//           <div>5 days ago</div>
//         </Comment.Metadata>
//         <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
//         <Comment.Actions>
//           <Comment.Action>Reply</Comment.Action>
//         </Comment.Actions>
//       </Comment.Content>
//     </Comment>

//     <Form reply>
//       <Form.TextArea />
//       <Button content='Add Reply' labelPosition='left' icon='edit' primary />
//     </Form>
//   </Comment.Group>
// )

// export default ForumTopic