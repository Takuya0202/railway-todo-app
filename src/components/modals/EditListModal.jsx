import React, { useCallback, useId } from 'react';
import './EditListModal.css'; // Assuming you have a CSS file for styling
import { useDispatch } from 'react-redux';
import { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import { fetchLists, updateList, deleteList } from '~/store/list/index';
import Modal from 'react-modal';
import { Box, Button, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';



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
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: 'auto',
          margin: 'auto',
          padding: '2rem',
          borderRadius: '8px',
        },
        overlay : {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
        }
      }}>
        <Typography variant='h4' component={"h2"} align='left' color='#3e3e3e' fontWeight={'500'} mb={2}>
          Edit List name
        </Typography>
        <Typography variant='p' component={"p"} align='left' color='error'>
          {errorMessage}
        </Typography>
        <Box component="form" onSubmit={onSubmit}>
          <TextField 
            label="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Box>
        <Box component={"div"} 
          style={{display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          widowth:'80%',
          margin: '1rem auto ',
           }}>
          <Button variant='outlined' onClick={onclose} type='button'>
            Cancel
          </Button>
          <Box component={"div"}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Button
              type='button'
              variant='contained'
              color='secondary'
              disabled={isSubmitting}
              onClick={handleDelete}
              startIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Button
              type='submit'
              variant='contained'
              disabled={isSubmitting}>
                Update
            </Button>
          </Box>
        </Box>
    </Modal>
  )
}

export default EditListModal;
