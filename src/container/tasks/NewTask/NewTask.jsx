import React, { useState } from "react";
import Button from "@mui/material/Button";
import NewTaskModal from "./NewTaskModal";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const NewTask = ({ getTasks }) => {
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddOutlinedIcon />}
        onClick={() => {
          setOpenNewTaskModal(true);
        }}
      >
        New Task
      </Button>

      <NewTaskModal
        isOpen={openNewTaskModal}
        toggleModal={() => {
          setOpenNewTaskModal(!openNewTaskModal);
        }}
        onClose={() => {
          setOpenNewTaskModal(false);
        }}
        getTasks={getTasks}
      />
    </>
  );
};

export default NewTask;
