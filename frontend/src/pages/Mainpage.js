import { Button } from '@mui/material';
import React from 'react';
import Generalheader from '../Components/Common/header';
import TextField from '@mui/material/TextField';

export default function Homepage() {
  return <div>
    <Generalheader/>
    <div style = {{display : "flex",
                  flexDirection : 'row',
                  justifyContent : 'space-evenly',
                  padding : '50px',
                  }}>
      <div style = {{display : "flex",
                  flexDirection : 'column',
                  justifyContent : 'flex-start',
                  paddingTop : '50px',
                  paddingBottom : '50px',
                  }}>
        <p style={{ fontSize : '35px'}}><b>Looking For A <br></br> Job/Internship?</b></p>
        <div style = {{display : "flex",
                  flexDirection : 'column',
                  justifyContent : 'flex-start',
                   
                  }}>
        <TextField
                  required
                  fullWidth
                  label="Search for jobs"
                />
         <div style = {{display : "flex",
                  flexDirection : 'row',
                  justifyContent : 'flex-start',
                  }}>
        <TextField
                  required
                  width = "10px"
                  label="Province"
                />
        <TextField
                  required
                  width = "10px"
                  label="City"
                />     
                </div>
                </div>
                <Button>Search</Button>

      </div>
      <div>
      <img src={"../assets/images/mainpage_img.jpg"} alt="img"/>
      </div>
    </div>
    <div style = {{display : "flex",
                  flexDirection : 'row',
                  justifyContent : 'space-evenly',
                  paddingTop : '150px',
                  paddingBottom : '150px',
                  }}>
      <p style={{ fontSize : '35px'}}><b>
        Find the Right job/internship for you.
        </b>
      </p>
      <Button>Choose field</Button>
    </div>
    <div style = {{display : "flex",
                  flexDirection : 'column',
                  justifyContent : 'space-evenly',
                  padding : '150px',
                  backgroundColor : '#548CCB',
                  color : 'white'
                  }}>
      <h1>
        Who Is Interns-In For?
      </h1>
      <p>Anyone looking to start a professional carrer</p>
    </div>
    <div style = {{display : "flex",
                  flexDirection : 'row',
                  justifyContent : 'space-evenly',
                  paddingTop : '150px',
                  paddingBottom : '150px',
                  }}>
      <p style={{ fontSize : '35px'}}><b>
        Post Your Jobs For Millions of People to See
        </b>
      </p>
      <Button>
        Post Now
      </Button>
    </div>
    <div style={{
      display : 'flex',
      flexDirection : 'column',
      justifyContent : 'space-evenly',
      paddingtop : '150px',
      paddingbottom : '0px',
      backgroundColor : '#323233',
      color : 'white'
    }}>
      <h1>Footer</h1>

    </div>
    
  
  </div>;
}
