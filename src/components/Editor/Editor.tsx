import React from 'react'
import { TextField, Button, Select, MenuItem } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import './editor.css'
import * as yup from 'yup'
import { User } from '../../models/user.model'
import { updateUser } from '../../services/userservice'

interface EditorProps {
    userRetrieved: User
}

const validationSchema = yup.object({
    firstName: yup.string().required('FirstName is Required').max(10),
    lastName: yup.string().required('lastName is Required').max(10),
    email: yup.string().email().required('Email is Required'),
    hobbie: yup.string().required('hobbie is Required')
})



const Editor: React.FC<EditorProps> = ({ userRetrieved }) => {
    async function onSubmit(values: User) {
        await updateUser(values).then(result => console.log("sucess")).catch(error => console.log(error))
        await window.location.reload(false);
        
    }

    return (
        <Card className="editor__card">
            <CardContent>
                <Formik
                    validateOnChange={true}
                    initialValues={{ _id: userRetrieved._id, firstName: userRetrieved.firstName, lastName: userRetrieved.lastName, email: userRetrieved.email, hobbie: userRetrieved.hobbie }}
                    validationSchema={validationSchema}
                    onSubmit={(data) => {
                       
                        onSubmit(data)

                    }}>

                    {() => (

                        <Form className="editor__form">

                            <div className="editor__field">
                                <label htmlFor="firstName">First Name</label>
                                <Field id="firstName" placeholder="FistName" type="input" name="firstName" as={TextField} />
                                <ErrorMessage data-testid="firstNameError" name="firstName" >{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>
                            </div>

                            <div className="editor__field">
                                <label htmlFor="lastName">Last Name</label>
                                <Field id="lastName" placeholder="LastName" type="input" name="lastName" as={TextField} />
                                <ErrorMessage data-testid="lastNameError" name="lastName" >{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>
                            </div>

                            
                            <div className="editor__field">
                                <label htmlFor="email">Email</label>
                                <Field data-testid="email" id="email" placeholder="Email" type="email" name="email" as={TextField}  />
                                
                                <ErrorMessage data-testid="emailError" name="email" component="div">{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>
                            </div> 
                           

                            <div className="editor__field">
                                <label htmlFor="hobbie">Hobbie</label>
                                <Field id="hobbie" type="select" name="hobbie" as={Select}  >
                                    <MenuItem value="Writing">Writing</MenuItem>
                                    <MenuItem value="Singing">Singing</MenuItem>
                                    <MenuItem value="Playing">Playing</MenuItem>
                                    <MenuItem value="Dancing">Dancing</MenuItem>
                                </Field>
                              
                            </div>

                            <div className="editor__field">
                                <Button variant="contained" className="editor__btn"  type="submit">Save</Button>
                            </div>

                        </Form>

                    )}
                </Formik>
            </CardContent>

        </Card>);
}
export default Editor