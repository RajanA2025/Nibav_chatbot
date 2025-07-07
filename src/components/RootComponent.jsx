// import React from "react";
// import NavBarComponent from "./NavBarComponent";
// import { Box, Grid } from "@mui/material";
// import SideBarComponent from "./SideBarComponent";
// import { Outlet } from "react-router-dom";

// export default function RootComponent() {
//   return (
//     <>
//       <NavBarComponent />
//       <Box
//         sx={
//           {
//             // bgcolor: "#DEE3E9",
//             // height: 899,
//           }
//         }
//       >
//         <Grid container spacing={0}>
//           <Grid item md={2} sm={0}>
//             <SideBarComponent />
//           </Grid>
//           <Grid item md={10}>
//             <Outlet />
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// }


import React from "react";
import NavBarComponent from "./NavBarComponent";
import { Box } from "@mui/material";
import SideBarComponent from "./SideBarComponent";
import { Outlet } from "react-router-dom";

export default function RootComponent() {
  return (
    <>
      <NavBarComponent />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 64px)", // subtract navbar height
          overflow: "hidden",
        }}
      >
        {/* Fixed Sidebar */}
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            height: "100%",
            overflowY: "auto",
            borderRight: "1px solid #ccc",
            bgcolor: "#ffffff",
            position: "sticky",
            top: 64, // adjust according to your navbar height
          }}
        >
          <SideBarComponent />
        </Box>

        {/* Scrollable Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100%",
            overflowY: "auto",
            p: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
