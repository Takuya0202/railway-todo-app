import { useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PencilIcon } from "~/icons/PencilIcon";
import { CheckIcon } from "~/icons/CheckIcon";
import { updateTask } from "~/store/task";
import "./TaskItem.css";
import React from "react";
import Button from "./common/Buttons/Button";
import moment from "moment";
import LimitData from "./common/LimitData";

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const { listId } = useParams();
  const { id, title, detail, done, limit } = task;
  // utcにしてしないと自動的に時間が+9時間されてしまう。
  const limitData = moment.utc(limit);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = useCallback(() => {
    setIsSubmitting(true);
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false);
    });
  }, [id, done]);

  return (
    <div className="task_item">
      <div className="task_item__title_container">
        <Button
          type="button"
          onClick={handleToggle}
          disabled={isSubmitting}
          className="task__item__mark_button"
        >
          {done ? (
            <div className="task_item__mark____complete" aria-label="Completed">
              <CheckIcon className="task_item__mark____complete_check" />
            </div>
          ) : (
            <div
              className="task_item__mark____incomplete"
              aria-label="Incomplete"
            ></div>
          )}
        </Button>
        <div className="task_item__title" data-done={done}>
          {title}
        </div>
        <div aria-hidden className="task_item__title_spacer"></div>
        <Link
          to={`/lists/${listId}/tasks/${id}`}
          className="task_item__title_action"
        >
          <PencilIcon aria-label="Edit" />
        </Link>
      </div>
      <div className="task_item__detail">{detail}</div>

      {/* 期限の表示。*/}
      <LimitData limit={limitData} />
    </div>
  );
};
