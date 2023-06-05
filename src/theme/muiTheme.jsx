import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#eb749e",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        textAlign: "left",
         fontSize:'14px',
         color: "#5c5c5c", // Default text color
      },
      // variants: [
      //   {
      //     props: { variant: "secondary" },
      //     style: {
      //       // fontSize:'16px',
      //       color: "#424142", // Secondary text color
      //     },
      //   },
      // ],
    },
  },
});

export default theme;
