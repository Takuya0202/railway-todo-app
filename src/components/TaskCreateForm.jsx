import { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./TaskCreateForm.css";
import { CheckIcon } from "~/icons/CheckIcon";
import { createTask } from "~/store/task";
import React from "react";
import Button from "./common/Buttons/Button";
import Input from "./common/Input";
import Textarea from "./common/Textarea";
import AppButton from "./common/Buttons/AppButton";
import Limit from "./common/Limit";
import moment from "moment";
export const TaskCreateForm = () => {
  const dispatch = useDispatch();

  // フォームがフォーカスされているかの状態を調べたいから？
  const refForm = useRef(null);
  const [elemTextarea, setElemTextarea] = useState(null);

  const [formState, setFormState] = useState("initial");

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [done, setDone] = useState(false);
  const [limit, setLimit] = useState(moment());
  const [isLimitChange,setIsLimitChange] = useState(false);

  // useCallbackは第二引数に関連があるときに、再定義される関数。パフォーマンス向上？
  const handleToggle = useCallback(() => {
    setDone((prev) => !prev);
  }, []);

  const handleFocus = useCallback(() => {
    setFormState("focused");
  }, []);

  const handleBlur = useCallback(() => {
    // タイトルと詳細が選択されているときはなにもしない
    if (title || detail) {
      return;
    }

    setTimeout(() => {
      const formElement = refForm.current;
      if (formElement && formElement.contains(document.activeElement)) {
        // フォーム内の要素がフォーカスされている場合は何もしない
        return;
      }

      setFormState("initial");
      setDone(false);
      setLimit(moment()); // 外れた時に初期化
    }, 100);
  }, [title, detail]);

  const handleDiscard = useCallback(() => {
    setTitle("");
    setDetail("");
    setFormState("initial");
    setDone(false);
    setLimit(moment()); // Discard時に期限を初期化
    setIsLimitChange(false);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setFormState("submitting");

      void dispatch(createTask({ title, detail, done }))
        .unwrap()
        .then(() => {
          handleDiscard();
        })
        .catch((err) => {
          alert(err.message);
          setFormState("focused");
        });
    },
    [title, detail, done],
  );

  useEffect(() => {
    if (!elemTextarea) {
      return;
    }

    const recalcHeight = () => {
      elemTextarea.style.height = "auto";
      elemTextarea.style.height = `${elemTextarea.scrollHeight}px`;
    };

    elemTextarea.addEventListener("input", recalcHeight);
    recalcHeight();

    return () => {
      elemTextarea.removeEventListener("input", recalcHeight);
    };
  }, [elemTextarea]);

  return (
    <form
      ref={refForm}
      className="task_create_form"
      onSubmit={onSubmit}
      data-state={formState} // カスタムの属性？
    >
      <div className="task_create_form__title_container">
        <Button
          type="button"
          onClick={handleToggle}
          className="task_create_form__mark_button"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {done ? (
            <div
              className="task_create_form__mark____complete"
              aria-label="Completed"
            >
              <CheckIcon className="task_create_form__mark____complete_check" />
            </div>
          ) : (
            <div
              className="task_create_form__mark____incomplete"
              aria-label="Incomplete"
            ></div>
          )}
        </Button>
        <Input
          type="text"
          className="task_create_form__title"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={formState === "submitting"}
        />
      </div>
      {formState !== "initial" && (
        <div>
          <Textarea
            ref={setElemTextarea}
            rows={1}
            className="task_create_form__detail"
            placeholder="Add a description here..."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            onBlur={handleBlur}
            disabled={formState === "submitting"}
          />
          <div>タスクの締切日を設定</div>
          <Limit
            limit={limit}
            setLimit={setLimit}
            setIsLimitChange={setIsLimitChange}
          />
          <p>{limit.format("YYYY-MM-DDTHH:mm:ss[Z]")}</p>
          <div className="task_create_form__actions">
            <AppButton
              type="button"
              data-variant="secondary"
              onBlur={handleBlur}
              onClick={handleDiscard}
              disabled={(!title && !detail && !isLimitChange) || formState === "submitting"}
            >
              Discard
            </AppButton>
            <div className="task_create_form__spacer"></div>
            <AppButton
              type="submit"
              onBlur={handleBlur}
              disabled={!title || !detail || formState === "submitting"}
            >
              Add
            </AppButton>
          </div>
        </div>
      )}
    </form>
  );
};
