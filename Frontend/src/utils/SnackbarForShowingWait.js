import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SnackbarForShowingWait = ({ severity, message, isOpen, setIsOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Stack>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={isOpen}
          onClose={handleClose}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default SnackbarForShowingWait;
