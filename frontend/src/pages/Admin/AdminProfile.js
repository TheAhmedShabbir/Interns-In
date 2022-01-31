import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function AdminProfile() {

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#3f51b5" }}>Profile</h1>
      <div style={{ borderRadius: "25px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Card xs={{ minWidth: 500, padding: "20px" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ textAlign: "center" }}
            ></Typography>
            <CardContent>
              <div>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="primary"
                      style={{ textAlign: "center" }}
                    >
                      Name
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="primary"
                      style={{ textAlign: "center" }}
                    >
                      Password
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="primary"
                      style={{ textAlign: "center" }}
                    >
                      Email
                    </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}