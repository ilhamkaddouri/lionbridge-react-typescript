import React,{useState} from 'react'
import {TextField,Button, Checkbox,Radio, FormControlLabel,Select,MenuItem } from '@material-ui/core'
import {Formik, Form,Field, useField,FieldAttributes,ErrorMessage} from 'formik'
import * as yup from 'yup'
import {User} from '../../shared/models/user.model'
interface EditorProps {
    userRetrieved : User
}

const validationSchema = yup.object({
    firstName : yup.string().required('FirstName is Required').max(10),
    lastName : yup.string().required('lastName is Required').max(10),
    email : yup.string().email().required('email is Required'),
    hobbie : yup.string().required('hobbie is Required').max(10)
})



const Editor: React.FC<EditorProps> = ({userRetrieved}) => {
    const [user, setUser] = useState<User>({});
    function  onSubmit(values: User, setSubmitting: Function ){
        setUser({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            hobbie: values.hobbie
        });
        console.log("user",user)
        
    }

        return (<div>
            <Formik 
                validateOnChange={true}
                initialValues={{firstName : userRetrieved.firstName,lastName:"", email:"",hobbie:""}} 
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => { 
                    setSubmitting(true)
                    //async call
                    console.log("data sent",data)
                    onSubmit(data, setSubmitting) 
                    setSubmitting(false)
                    
                    }}>
 
             {({values ,errors,isSubmitting})=>(
             
                 <Form>
                    
                    <div>
                     <Field placeholder="FistName" type="input" name="firstName" as={TextField} helperText={<ErrorMessage name="firstName" >{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>} />
                    </div>

                    <div>
                     <Field placeholder="LastName" type="input" name="lastName" as={TextField}  helperText={<ErrorMessage name="lastName" >{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>} /> 
                    </div>

                    <div>
                     <Field placeholder="Email" type="input" name="email" as={TextField}  helperText={<ErrorMessage name="email" >{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>} /> 
                    </div>
                    
                    <div>
                     <Field type="select" name="hobbie" as={Select}  >
                            <MenuItem value="dancing">dancing</MenuItem>
                            <MenuItem  value="singing">singing</MenuItem>
                            <MenuItem value="playing">playing</MenuItem>
                            <MenuItem value="climbing">climbing</MenuItem>
                     </Field>    
                    </div>
                    
                    <div>
                        <Button disabled={isSubmitting} type="submit">Submit</Button>
                    </div>

                    
                     
                     
                     <pre>
                     {JSON.stringify(values,null,2)}
                     </pre>
                 </Form>
 
             )}
         </Formik>
         </div>);
}
export  default Editor