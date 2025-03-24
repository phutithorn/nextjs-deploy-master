"use client"; 

import React, { useEffect, useState } from 'react';
import { 
  Card, CardActions, CardContent, CardMedia, Button, Typography, Grid 
} from '@mui/material';

export async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attractions`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default function Page() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setData(result);
        setLoaded(true); // เริ่มแอนิเมชันเมื่อโหลดเสร็จ
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <Typography variant='h5'>Attractions</Typography>
      <Grid container spacing={2}>
        {data.map((attraction, index) => (
          <Grid item key={attraction.id} xs={12} md={4}>
            <Card className={loaded ? "card-animate MuiCard-root" : "MuiCard-root"}>
              <CardMedia
                sx={{ height: 140 }}
                image={attraction.coverimage}
                title={attraction.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {attraction.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {attraction.detail}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={`/attractions/${attraction.id}`}>
                  <Button size="small">Learn More</Button>
                </a>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
