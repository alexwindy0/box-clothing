import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';


//see this as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,

});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    //using the component did mount to render the onAuthStateChangedListener
    useEffect(() => {

        //onAuthStateChangedListener receives some kind of callback function
        //that calls the second value of onAuthStateChange
        //unsubscribe means stop leaking. if we don't unscubscribe there would be a memory leak.
        const unsubscribe = onAuthStateChangedListener((user) =>{
            //if user exists then createUserDocumentFromAuth for the user on firebase
            if(user){
                createUserDocumentFromAuth(user);
            }//else set the current user
            setCurrentUser(user);
        })

        return unsubscribe;
    }, []);


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}