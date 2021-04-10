import React, { useState } from 'react'
import { TextField, Button, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
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
    email: yup.string().email().required('email is Required'),
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

                    {({ }) => (

                        <Form className="editor__form">

                            <div className="editor__field">
                                <Field placeholder="FistName" type="input" name="firstName" as={TextField} helperText={<ErrorMessage name="firstName" >{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>} />
                            </div>

                            <div className="editor__field">
                                <Field placeholder="LastName" type="input" name="lastName" as={TextField} helperText={<ErrorMessage name="lastName" >{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>} />
                            </div>

                            <div className="editor__field">
                                <Field placeholder="Email" type="input" name="email" as={TextField} helperText={<ErrorMessage name="email" >{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>} />
                            </div>

                            <div className="editor__field">
                                <Field type="select" name="hobbie" as={Select}  >
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