import React from 'react'
import Editor from '../Editor/Editor'
import {User} from '../../models/user.model'

import { render,fireEvent, waitFor } from '@testing-library/react'

const user:User ={
   
    firstName: 'John',
    lastName: 'Dee',
    hobbie:'Playing'
  }

test('should show validation on blur', async () => {
  
  const { getByLabelText, getByTestId,findByTestId } = render(<Editor userRetrieved={user}/>);

  const firstName=getByLabelText("First Name");
  const lastName=getByLabelText("Last Name");
  const email = getByLabelText("Email");
  
  fireEvent.blur(firstName);
  fireEvent.blur(lastName);
  fireEvent.blur(email);



  await waitFor(() => {
   
    expect(findByTestId("emailError")).not.toBe(null);
    expect(findByTestId("lastNameError")).not.toBe(null);
    expect(findByTestId("firstNameError")).not.toBe(null);
   
  });
  
  
  
});
  




