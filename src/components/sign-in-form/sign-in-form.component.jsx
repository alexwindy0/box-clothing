import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';


//importing functions for authentication with firebase
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: '',

};


/* creating a useState for the page. to remember last checkpoint before the page unmounted
and remounted */
const SignInForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

        //used to reset the form input fields after the form has been submitted
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
        //displays googleSignInPopup after the button is clicked
    const SignInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
         await createUserDocumentFromAuth(user);
    }


    //handles the submit button on the form
    const handleSubmit = async (event) =>{
        event.preventDefault();


        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            console.log(response);

        }   catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('User not Found. please Sign UP');
                    break;
                    default:
                        console.log(error);

            }
        //   resetFormFields();
        }
        
        
    };
    //monitors the event on the form input fields.
    const handleChange = (event) =>{
        const { name, value }   = event.target;
        setFormFields({...formFields, [name]: value });
    };

    return(
        <div className='sign-up-container'>
            <h2>Already have an account</h2>
            <span>Sign in with your Email and Password</span>
            <form onSubmit={handleSubmit}> 
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
                <div className='buttons-container'>
                    <Button type="submit">Sign in</Button> 
                    <Button type='button' buttonType='google' onClick={SignInWithGoogle}>
                     Google Sign in
                    </Button>
                </div>           
            </form>
        </div>
    );
}

export default SignInForm;