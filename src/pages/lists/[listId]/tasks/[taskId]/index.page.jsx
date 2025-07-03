import { useCallback, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BackButton } from "~/components/common/Buttons/BackButton";
import "./index.css";
import { setCurrentList } from "~/store/list";
import { fetchTasks, updateTask, deleteTask } from "~/store/task";
import { useId } from "~/hooks/useId";
import React from "react";
import Button from "~/components/common/Buttons/Button";
import Input from "~/components/common/Input";
import Textarea from "~/components/common/Textarea";
import AppButton from "~/components/common/Buttons/AppButton";

const EditTask = () => {
  const id = useId();

  const { listId, taskId } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [done, setDone] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useSelector((state) =>
    state.task.tasks?.find((task) => task.id === taskId),
  );

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDetail(task.detail);
      setDone(task.done);
    }
  }, [task]);

  useEffect(() => {
    void dispatch(setCurrentList(listId));
    void dispatch(fetchTasks());
  }, [listId]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      void dispatch(updateTask({ id: taskId, title, detail, done }))
        .unwrap()
        .then(() => {
          nav(`/lists/${listId}`);
        })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title, taskId, listId, detail, done],
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(deleteTask({ id: taskId }))
      .unwrap()
      .then(() => {
        nav(`/`);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [taskId]);

  return (
    <main className="edit_list">
      <BackButton />
      <h2 className="edit_list__title">Edit List</h2>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-title`} className="edit_list__form_label">
            Title
          </label>
          <Input
            id={`${id}-title`}
            className="app_input"
            placeholder="Buy some milk"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-detail`} className="edit_list__form_label">
            Description
          </label>
          <Textarea
            id={`${id}-detail`}
            className="app_input"
            placeholder="Blah blah blah"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-done`} className="edit_list__form_label">
            Is Done
          </label>
          <div>
            <Input
              id={`${id}-done`}
              type="checkbox"
              checked={done}
              onChange={(event) => setDone(event.target.checked)}
            />
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor="">期限</label>
        </fieldset>
        <div className="edit_list__form_actions">
          <Link to="/" data-variant="secondary" className="app_button">
            Cancel
          </Link>
          <div className="edit_list__form_actions_spacer"></div>
          <Button
            type="button"
            className="app_button edit_list__form_actions_delete"
            disabled={isSubmitting}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <AppButton type="submit" disabled={isSubmitting}>
            Update
          </AppButton>
        </div>
      </form>
    </main>
  );
};

export default EditTask;
