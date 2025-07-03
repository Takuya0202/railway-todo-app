import { useDispatch, useSelector, } from 'react-redux';
import React, { useCallback, useEffect, useId, useState } from 'react'
import { fetchLists, updateList } from '~/store/list/index';

const EditList = ({isOpen , setIsOpen , listId}) => {
  const id = useId();
  const dispatch = useDispatch();

  const [title,setTitle] = useState("");
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
  },[list]);

  useEffect(() => {
    void dispatch((fetchLists()));
  },[listId]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsSubmitting(false);

      void dispatch(updateList({id : listId , title}))
        .unwrap()
        
    }
  )
  return (
    <>
      {
        isOpen && (
          <div>

          </div>
        )
      }
    </>
  )
}

export default EditList
