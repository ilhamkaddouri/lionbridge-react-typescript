import React, { useState } from 'react'
import { TextField, Button, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Formik, Form, Field, useField, FieldAttributes, ErrorMessage } from 'formik'
import './editor.css'
import * as yup from 'yup'
import { User } from '../../shared/models/user.model'
import { updateItem } from '../../services/user.service'

const useStyles = makeStyles({
    root: {
        height:300,
        width:"30%",
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    
    
});

interface EditorProps {
    userRetrieved: User
}

const validationSchema = yup.object({
    firstName: yup.string().required('FirstName is Required').max(10),
    lastName: yup.string().required('lastName is Required').max(10),
    email: yup.string().email().required('email is Required'),
    hobbie: yup.string().required('hobbie is Required').max(10)
})



const Editor: React.FC<EditorProps> = ({ userRetrieved }) => {
    const classes = useStyles();
    //const [user, setUser] = useState<User>({});

    async function onSubmit(values: User, setSubmitting: Function) {

        let id = userRetrieved._id
        await updateItem(values).then(result => console.log("sucess")).catch(error => console.log(error))
        await window.location.reload(false);
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Formik
                    validateOnChange={true}
                    initialValues={{ _id: userRetrieved._id, firstName: userRetrieved.firstName, lastName: userRetrieved.lastName, email: userRetrieved.email, hobbie: userRetrieved.hobbie }}
                    validationSchema={validationSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true)
                        onSubmit(data, setSubmitting)
                        setSubmitting(false)

                    }}>

                    {({ values, errors, isSubmitting }) => (

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
                                    <MenuItem value="dancing">dancing</MenuItem>
                                    <MenuItem value="singing">singing</MenuItem>
                                    <MenuItem value="playing">playing</MenuItem>
                                    <MenuItem value="climbing">climbing</MenuItem>
                                </Field>
                            </div>

                            <div className="editor__field">
                                <Button variant="contained" className="editor__btn" disabled={isSubmitting} type="submit">Save</Button>
                            </div>




                            {/* <pre>
                     {JSON.stringify(values,null,2)}
                     </pre> */}
                        </Form>

                    )}
                </Formik>
            </CardContent>

        </Card>);
}
export default Editor