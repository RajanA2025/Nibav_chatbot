import React from "react";
import { Box, Grid } from "@mui/material";
import UilReceipt from "@iconscout/react-unicons/icons/uil-receipt";
import UilBox from "@iconscout/react-unicons/icons/uil-box";
import UilTruck from "@iconscout/react-unicons/icons/uil-truck";
import UilCheckCircle from "@iconscout/react-unicons/icons/uil-check-circle";
import InfoCard from "../../bodyComponents/InfoCard";
import TotalSales from "./TotalSales";
import SalesByCity from "./SalesByCity";
import Channels from "./Channels";
import TopSellingProduct from "./TopSellingProduct";
import Chatbox from "../../subComponents/Chatbox";




const Home = () => {
  const data = {};
  const cardComponent = [
    {
      icon: <UilBox size={60} color={"#F6F4EB"} />,
      title: "Uploaded Files",
      subTitle: "1256",
      mx: 3,
      my: 0,
    },
    {
      icon: <UilTruck size={60} color={"#F6F4EB"} />,
      title: "Users", 
      subTitle: "12",
      mx: 5,
      my: 0,
    },
    // {
    //   icon: <UilCheckCircle size={60} color={"#F6F4EB"} />,
    //   title: "Users",
    //   subTitle: "15",
    //   mx: 5,
    //   my: 0,
    // },
    // {
    //   icon: <UilReceipt size={60} color={"#F6F4EB"} />,
    //   title: "Invoice",
    //   subTitle: "07",
    //   mx: 3,
    //   my: 0,
    // },
  ];

  return (
    <Box
      sx={{
        margin: 0,
        padding: 3,
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginX: 3,
          borderRadius: 2,
          padding: 0,
        }}
      >
        {cardComponent.map((card, index) => (
          <Grid item md={4} key={index}>
            <InfoCard card={card} />
          </Grid>
        ))}
      </Grid>

      {/* <Grid container sx={{ marginX: 3 }}>
        <Grid item md={8}>
          <TotalSales data={data} />
        </Grid>
        <Grid item md={4}>
          <SalesByCity data={data} />
        </Grid>
      </Grid>

      <Grid container sx={{ margin: 3 }}>
        <Grid item md={6}>
          <Channels />
        </Grid>
        <Grid item md={6}>
          <TopSellingProduct />
        </Grid>
      </Grid> */}
      <Chatbox />
    </Box>
  );
};

export default Home;
