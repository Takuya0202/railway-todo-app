import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useId, useState } from "react";
import { fetchLists, updateList, deleteList } from "~/store/list/index";
import Button from "~/components/common/Buttons/Button";
import AppButton from "~/components/common/Buttons/AppButton";
import BackButtonModal from "~/components/common/Buttons/BackButtonModal";
import Input from "~/components/common/Input";
import "./EditList.css";
import { Sidebar } from "~/components/Sidebar";

const EditList = ({ isOpen, setIsOpen, listId }) => {
  const id = useId();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 対象リストの取得
  const list = useSelector((state) =>
    state.list.lists?.find((list) => list.id === listId),
  );

  useEffect(() => {
    if (list) {
      setTitle(list.title);
    }
  }, [list]);

  useEffect(() => {
    void dispatch(fetchLists());
  }, [listId]);

  // 提出後、モーダルを閉じる
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(false);
    setIsOpen(false);

    void dispatch(updateList({ id: listId, title }))
      .unwrap()
      // .then(() => {
      //   nav(`/lists/${listId}`);
      // })
      // .catch((err) => {
      //   setErrorMessage(err.message);
      // })
      .finally(() => {
        setIsSubmitting(false);
      });
  });

  const handleDelete = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this list?")) {
      return;
    }

    setIsSubmitting(true);
    setIsOpen(false);

    void dispatch(deleteList({ id: listId }))
      // .unwrap()
      // .then(() => {
      //   nav(`/`);
      // })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {isOpen && (
        <>
          <div className="modal">
            <main className="edit_list">
              <BackButtonModal setIsOpen={setIsOpen}>Back</BackButtonModal>
              <h2 className="edit_list__title">Edit List</h2>
              <p className="edit_list__error">{errorMessage}</p>
              <form className="edit_list__form" onSubmit={onSubmit}>
                <fieldset className="edit_list__form_field">
                  <label
                    htmlFor={`${id}-title`}
                    className="edit_list__form_label"
                  >
                    Name
                  </label>
                  <Input
                    id={`${id}-title`}
                    className="app_input"
                    placeholder="Family"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </fieldset>
                <div className="edit_list__form_actions">
                  <AppButton onClick={handleClose} data-variant="secondary">
                    Cancel
                  </AppButton>
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
          </div>
        </>
      )}
    </>
  );
};

export default EditList;
