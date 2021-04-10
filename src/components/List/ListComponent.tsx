import React, { useEffect } from 'react'
import './list-items.css'
import Editor from '../Editor/Editor'
import { Modal } from '@material-ui/core'
import { User } from '../../models/user.model'
import { getUsers } from '../../services/userservice'
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core'


const ListComponent: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<User[]>([])

  useEffect( () => {
    let newUsers: any = [];
    getUsers().then(response => {
      newUsers = response.data.map((user: any) => {
        user._id = user._id.$oid;
        return user;
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
  
  return (
    <div className="container">
      <h2 className="header">List of users with their hobbies</h2>
      {users && users.map((user, key) => (

        <div className='user__item'>
          <div><p className="user__name"><b>{user.firstName} {user.lastName}</b></p></div>

          <div>
            {user.email}
          </div>
          <div>
            {user.hobbie}
          </div>
          <div>

            <IconButton onClick={handleOpen}>
              <EditIcon className="btn__edit" />
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