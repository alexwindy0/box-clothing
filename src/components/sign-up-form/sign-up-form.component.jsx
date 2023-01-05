import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',

};


/* creating a useState for the page. to remember last checkpoint before the page unmounted
and remounted */
const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

        //used to reset the form input fields after the form has been submitted
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //handles the submit button on the form
    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert("passwords do not Match");
            return;
        }


        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            //calling the resetFormField function after the form have been Submitted
            resetFormFields();

            await createUserDocumentFromAuth(user, {displayName});
        }   catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert("cannot create user, email already in use");
            }else{
                console.log('user creation encountered an error', error);
            };
            //displays firebase error-code when pasword length is lesser than 6 characters
            if(error.code === 'auth/weak-password'){
                alert('password needs to be at least 6 character long');
            }          
        }
        
        
    };
    //monitors the event on the form input fields.
    const handleChange = (event) =>{
        const { name, value }   = event.target;
        setFormFields({...formFields, [name]: value });
    };

    return(
        <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your Email and Password</span>
            <form onSubmit={handleSubmit}> 
                <FormInput 
                    label='Display Name'
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

                <FormInput 
                    label='Email'
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email"
                    value={email}
                /> 

                <FormInput 
                    label='Password'
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password"
                    value={password}
                /> 

                <FormInput 
                    label='Confirm Password'
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button type="submit"> Sign Up</Button>           
            </form>
        </div>
    );
}

export default SignUpForm;