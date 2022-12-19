import React, { useEffect, useState } from "react";
import { Container, Switch, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { TasksService } from "../../services";
import NewTask from "./NewTask/NewTask";
import DeleteTaskModal from "./DeleteTask/DeleteTaskModal";
import { Wrapper, NewTaskButton } from "./styles.tasks";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [deleteTask, setDeleteTask] = useState({
    selectedRow: {},
    isOpen: false,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "complete",
      headerName: "Task Completed",
      width: 150,
      renderCell: ({ row, value }) => {
        return (
          <Switch
            checked={value ? true : false}
            onChange={(e) => {
              toggleCompletedTask(e, row);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        );
      },
    },
    {
      headerName: "Action",
      width: 150,
      renderCell: ({ row, value }) => {
        return (
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleDelete(row, value);
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const toggleCompletedTask = (event, selectedRow) => {
    selectedRow.complete = event.target.checked;
    TasksService.updateTask(selectedRow.id, selectedRow);
  };

  const handleDelete = (row, value) => {
    setDeleteTask({ selectedRow: row, isOpen: true });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && tasks?.length === 0) {
      getTasks();
    }

    return () => (mounted = false);
  }, []);

  const getTasks = () => {
    TasksService.getAllTasks()
      .then((res) => {
        return res.data.tasks;
      })
      .then((taskList) => {
        setTasks([...taskList]);
      });
  };

  return (
    <>
      <Container maxWidth="md" style={{ height: 500, width: "90%" }}>
        <Wrapper>
          <Typography variant="h3">Tasks List</Typography>
          <NewTaskButton>
            <NewTask getTasks={getTasks} />
          </NewTaskButton>
          <DataGrid rows={tasks?.length > 0 ? tasks : []} columns={columns} />
        </Wrapper>
      </Container>

      <DeleteTaskModal
        isOpen={deleteTask.isOpen}
        onClose={() => {
          setDeleteTask({ selectedRow: {}, isOpen: false });
        }}
        selectedRow={deleteTask.selectedRow}
        getTasks={getTasks}
      />
    </>
  );
};

export default Tasks;
