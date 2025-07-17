import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask, fetchTasks } from "~/store/task/index";
import { setCurrentList } from "~/store/list/index";
import Modal from "react-modal";
import moment from "moment";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcom from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Limit from "../common/Limit";

const EditTaskModal = ({ isOpen, setIsOpen, taskId, listId }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [done, setDone] = useState(false);
  const [limitData, setLimitData] = useState();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useSelector((state) => {
    return state.task.tasks?.find((task) => task.id === taskId);
  });

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDetail(task.detail);
      setDone(task.done);
      setLimitData(moment.utc(task.limit));
    }
  }, [task]);

  useEffect(() => {
    void dispatch(setCurrentList(listId));
    void dispatch(fetchTasks());
  }, [listId]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const limit = limitData.format("YYYY-MM-DDTHH:mm:ss[Z]");
      void dispatch(updateTask({ id: taskId, title, detail, done, limit }))
        .unwrap()
        .then(() => {
          setIsOpen(false);
        })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title, taskId, listId, detail, done, limitData],
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(deleteTask({ id: taskId }))
      .unwrap()
      .then(() => {
        setIsOpen(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [taskId]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  });

  const isMobile = useSelector((state) => state.responsive.isMobile);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Edit Task Modal"
      key={taskId}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90%" : "500px",
          height: "auto",
          margin: "auto",
          padding: "2rem",
          borderRadius: "8px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1000,
        },
      }}
    >
      <Box
        component={"div"}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography component={"h4"} variant="h4">
          Edit Task
        </Typography>
        <Button type="button" variant="text" onClick={handleClose}>
          <CloseIcom />
        </Button>
      </Box>
      <Typography component={"p"} color="error">
        {errorMessage}
      </Typography>
      <Box component={"form"} onSubmit={onSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: "1rem" }}
          fullWidth
          required
        />
        <TextField
          label="Description"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          style={{ display: "block", marginBottom: "1rem" }}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              value={done}
              onChange={(e) => setDone(e.target.checked)}
            />
          }
          label="Is Done"
        />
        <Box component="div" style={{ marginTop: "1rem", height: "200px" }}>
          <label>期限</label>
          <Limit limit={limitData} setLimit={setLimitData} />
        </Box>
        <Box
          component={"div"}
          style={{
            display: isMobile || "flex",
            justifyContent: "space-between",
            alignItems: "center",
            widowth: "80%",
            margin: "1rem auto ",
          }}
        >
          {isMobile ? null : (
            <Button variant="outlined" onClick={handleClose} type="button">
              Cancel
            </Button>
          )}
          <Box
            component={"div"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: isMobile && "flex-end",
            }}
          >
            <Button
              type="button"
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
