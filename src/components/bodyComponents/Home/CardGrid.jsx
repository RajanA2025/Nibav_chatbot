import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import NavBarComponent from "../../NavBarComponent";
import UilBox from "@iconscout/react-unicons/icons/uil-box";
import UilTruck from "@iconscout/react-unicons/icons/uil-truck";
import InfoCard from "../../bodyComponents/InfoCard";

const CardGrid = () => {
  const sections = [
    {
      title: "Productivity",
      cards: [
        {
          icon: <UilBox size={60} color={"#F6F4EB"} />,
          title: "College Managed Solution",
        
          mx: 3,
          my: 0,
        },
        {
          icon: <UilTruck size={60} color={"#F6F4EB"} />,
          title: "Computer Vision",
       
          mx: 5,
          my: 0,
        },
      ],
    },
    {
      title: "Personalization",
      cards: [
        {
          icon: <UilBox size={60} color={"#F6F4EB"} />,
          title: "Personalization Recommendation",
       
          mx: 3,
          my: 0,
        },
        {
          icon: <UilTruck size={60} color={"#F6F4EB"} />,
          title: "Customer Insights",
        
          mx: 5,
          my: 0,
        },
      ],
    },
    {
      title: "Cloud Solutions",
      cards: [
        {
          icon: <UilBox size={60} color={"#F6F4EB"} />,
          title: "Cloud Transformation Framework",
         
          mx: 3,
          my: 0,
        },
        {
          icon: <UilTruck size={60} color={"#F6F4EB"} />,
          title: "Rapid Infra Automation",
          
          mx: 5,
          my: 0,
        },
        {
          icon: <UilTruck size={60} color={"#F6F4EB"} />,
          title: "Cloud Cost Optimization",
          disabled: true,
          mx: 5,
          my: 0,
        },
        {
          icon: <UilTruck size={60} color={"#F6F4EB"} />,
          title: "Integrated Management Systems",
          disabled: true,
          mx: 5,
          my: 0,
        },
      ],
    },
  ];

  return (
    <>
    <NavBarComponent/>
   
    <Box sx={{ padding: 3 }}>
      {sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} sx={{ marginBottom: 4 }}>
          {/* Blue title header */}
          <Box
            sx={{
              backgroundColor: "#1976d2", // MUI blue
              padding: "10px 20px",
              borderRadius: 2,
              color: "#fff",
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold",textAlign:"center" }}>
              {section.title}
            </Typography>
          </Box>

          {/* Cards row */}
          <Grid container spacing={2}>
            {section.cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <InfoCard card={card} />
              </Grid>
            ))}
          </Grid>
          <br/>
        </Box>
      ))}
    </Box>
    </>
  );
};

export default CardGrid;
