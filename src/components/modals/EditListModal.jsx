import React, { useCallback, useId } from 'react';
import './EditListModal.css'; // Assuming you have a CSS file for styling
import { useDispatch } from 'react-redux';
import { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import { fetchLists, updateList, deleteList } from '~/store/list/index';
import Modal from 'react-modal';



Modal.setAppElement('#root');

const EditListModal = ({isOpen , setIsOpen , listId}) => {
  const id = useId();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const list = useSelector((state) => {
    return state.list.lists?.find((list) => list.id === listId);
  });

  useEffect(() => {
    if (list) {
      setTitle(list.title);
    }
  },[list]);

  useEffect(() => {
      void dispatch(fetchLists());
    }, [listId]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsOpen(false);

    void dispatch(updateList({ id: listId, title }))
      .unwrap()
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  })

  const handleDelete = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this list?")) {
      return;
    }

    setIsSubmitting(true);
    setIsOpen(false);

    void dispatch(deleteList(listId))
      .unwrap()
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  },[]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  },[]);
  


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Edit List Modal"
      style={{
        content:{
          maxWidth: '500px',
          margin: 'auto',
          padding: '2rem',
          borderRadius: '8px',
        },
        overlay : {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1000,
        }
      }}>

    </Modal>
  )
}

export default EditListModal;
