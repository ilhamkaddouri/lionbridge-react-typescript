import React ,{useState, useEffect}from 'react'
import './list-items.css'
import Editor from '../Editor/Editor'
import {Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {User} from '../../shared/models/user.model'
import axios from 'axios'
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const ListComponent: React.FC= ({}) => {
    const [open, setOpen] = React.useState(false);
    const [users,setUsers] = React.useState<User[]>([])

    useEffect(()=>{
      axios.get('http://localhost:5000/users').then(rslt=> {console.log(rslt.data); setUsers(rslt.data)}).catch(err=>console.log(err))
    },[])

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
        const sendEditEvent = (item:String)=>{
            return item
        }
        return (
            <div className="listContainer">
            {users && users.map((user,key)=>(
              
              <div className='todo'>
              <div className="title"><p><strong>{user.firstName}</strong> status</p> </div>
              <div>
              {user.lastName}
              </div>
              <div>
              {user.email}
              </div>
              <div>
              {user.hobbie}
              </div>
              <div>
                  <button className="editButton"  onClick={handleOpen}>Edit</button>
                  <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                      >
                      <Editor userRetrieved={user}/>
                  </Modal>
              </div>
      </div>
           ))}
                
              
            
        </div>
        );
}
export default ListComponent 