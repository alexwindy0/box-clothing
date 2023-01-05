import './button.styles.scss'

/* 
we have three types of button:
default

inverted

google sign in 

*/

const BUTTON_TYPE_CLASSES = {

    //this helps us to use a more readble kind of input
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button 
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}
        >
            {children}
        </button>
    )
}

export default Button;