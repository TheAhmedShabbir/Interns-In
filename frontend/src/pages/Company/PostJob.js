import React , {useState}from 'react';
import CompanyHeader from '../../Components/Company/CompanyHeader';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@mui/material';
import Userpfp from "../../assets/images/Userpfp.jpg";



export default function 
() {
    const [startDate, setStartDate] = useState(null);
  return (
    <div>
        <CompanyHeader/>
        <div style = {{margin : '50px', display : 'flex', justifyContent: 'center'}}>

            <div style={{display : 'flex', flexDirection : 'column',alignItems : 'center',width : '800px', height: '650px',border : '2px solid #548CCB', backgroundColor : 'white'}}>
          <h3>Add A New Post</h3>
          <div style={{display : 'flex', flexDirection : 'column', width : '600px', height : '600px', }}>
              <TextField
                  required
                  fullWidth
                  label="Job Title"
                />
                <TextField
                  required
                  fullWidth
                  label="Job Description"
                />
                <h4>Job Type</h4>
                <div style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-evenly'}}>
                <div style={{display : 'flex',flexDirection : 'column', justifyContent : 'space-evenly'}}>
                <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Full Time" />
                <FormControlLabel control={<Checkbox />} label="Part Time" />
                </FormGroup>
                </div>
                <div style={{display : 'flex',flexDirection : 'column', justifyContent : 'space-evenly'}}>
                <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Internship" />
                <FormControlLabel control={<Checkbox />} label="Job" />
                </FormGroup>
                </div>
                <div style={{display : 'flex',flexDirection : 'column', justifyContent : 'space-evenly'}}>
                <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Online" />
                <FormControlLabel control={<Checkbox />} label="Physical" />
                </FormGroup>
                </div>
                </div>
                <h4>Set Salary</h4>
                <div style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-evenly'}}>
                <TextField
                label = 'Minimum Salary'
                />
                <TextField
                label = 'Maximum Salary'
                />
                </div>
                <h4>Set Location and Deadline</h4>
                <div style={{display : 'flex',flexDirection : 'row', justifyContent : 'space-evenly'}}>
                    <TextField
                label = 'City Name'
                />
                <div>
                <DatePicker selected={startDate} onChange = {date => setStartDate(date)}/>
                </div>
                </div>
                <div style={{paddingTop : '30px'}}>
                <Button>Post</Button>
                </div>
          </div>
      </div>


        </div>

    </div>
  )
}
