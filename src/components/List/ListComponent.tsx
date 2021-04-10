import React, { useState, useEffect } from 'react'
import './list-items.css'
import Editor from '../Editor/Editor'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../../shared/models/user.model'
import { getUsers } from '../../services/user.service'
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core'


const ListComponent: React.FC = ({ }) => {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([])

  useEffect(() => {
    let newUsers: any = [];
    getUsers().then(response => {
      newUsers = response.data.map((item: any) => {
        item._id = item._id.$oid;
        return item;
      });
      setUsers(newUsers);
    });

  }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const sendEditEvent = (item: String) => {
    return item
  }
  return (
    <div className="container">
      <h2 className="header">List of users</h2>
      {users && users.map((user, key) => (

        <div className='user-item'>
          <div className="title"><p><strong>{user.firstName} {user.lastName}</strong></p></div>

          <div>
            {user.email}
          </div>
          <div>
            {user.hobbie}
          </div>
          <div>

            <IconButton onClick={handleOpen}>
              <EditIcon className="btn-edit" />
            </IconButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <Editor userRetrieved={user} />
            </Modal>
          </div>
        </div>
      ))}



    </div>
  );
}
export default ListComponent