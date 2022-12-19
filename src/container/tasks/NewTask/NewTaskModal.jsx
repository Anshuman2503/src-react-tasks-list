import React from "react";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { TextField, Box, Button, Switch, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TasksService } from "../../../services";

const NewTaskModal = ({ isOpen, onClose, getTasks }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const initialValues = {
    description: "",
    complete: false,
  };

  const validationSchema = Yup.object({
    description: Yup.string("Enter task description").required(
      "Description is required"
    ),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await TasksService.addTask(values);
      await getTasks();
      onClose();
      formik.resetForm();
    },
  });

  const handleSwitchChange = (event) => {
    formik.setFieldValue("complete", event.target.checked);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" mb={3}>
            Add New Task
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1} justify="center">
              <Grid item md={15}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={(e) => {
                    formik.setFieldValue("description", e.target.value);
                  }}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  onBlur={formik.handleBlur("description")}
                />
              </Grid>
              <Grid item md={15}>
                <span>Completed :</span>
                <Switch
                  checked={formik.values.complete}
                  onChange={(e) => handleSwitchChange(e)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="Submit"
                style={{ margin: "10px" }}
              >
                SUMBIT
              </Button>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default NewTaskModal;
