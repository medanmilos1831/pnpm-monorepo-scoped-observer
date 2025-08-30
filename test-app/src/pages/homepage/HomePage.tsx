import React, { useState } from "react";
import { Button, Modal, Tooltip, Box, Typography, Paper } from "@mui/material";
import "./HomePage.css";

export const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="homepage">
      <div className="content-container">
        <div className="left-side">
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h5" gutterBottom>
              Material-UI Tooltip Demo
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Tooltip title="This is a basic tooltip example" placement="top">
                <Button variant="contained" color="primary">
                  Hover me for tooltip
                </Button>
              </Tooltip>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Tooltip title="Tooltip on the right side" placement="right">
                <Button variant="outlined" color="secondary">
                  Right tooltip
                </Button>
              </Tooltip>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Tooltip title="Tooltip on the bottom" placement="bottom">
                <Button variant="text" color="info">
                  Bottom tooltip
                </Button>
              </Tooltip>
            </Box>
          </Paper>
        </div>

        <div className="right-side">
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h5" gutterBottom>
              Material-UI Modal Demo
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                size="large"
              >
                Open Modal
              </Button>
            </Box>

            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  maxWidth: 600,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  id="modal-title"
                  variant="h4"
                  component="h2"
                  gutterBottom
                >
                  Modal Title
                </Typography>
                <Typography
                  id="modal-description"
                  variant="body1"
                  sx={{ mt: 2 }}
                >
                  This is a Material-UI modal example. It's fully compatible
                  with React 19 and provides a clean, modern look.
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button variant="outlined" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleCloseModal}>
                    Confirm
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Paper>
        </div>
      </div>
    </div>
  );
};
