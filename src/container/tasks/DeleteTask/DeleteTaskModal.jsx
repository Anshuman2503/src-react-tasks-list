import React from "react";
import { TasksService } from "../../../services";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { Box, Button, Typography } from "@mui/material";

const DeleteTaskModal = ({ isOpen, onClose, selectedRow, getTasks }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    padding: "14px",
  };

  const deleteTask = async () => {
    await TasksService.deleteTask(selectedRow.id);
    await getTasks();
    onClose();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container justify="center" spacing={10}>
            <Grid item md={10}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete Task
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
                Are you sure you want to delete {selectedRow.description} ?
              </Typography>

              <Button
                variant="contained"
                color="primary"
                style={{ margin: "5px", float: "right" }}
                onClick={() => {
                  deleteTask();
                }}
              >
                OK
              </Button>

              <Button
                variant="contained"
                color="primary"
                style={{ margin: "5px", float: "right" }}
                onClick={() => {
                  onClose();
                }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteTaskModal;
