import './form-input.styles.scss';
 
const FormInput = ({ label, ...otherProps}) =>{
    return(
        /* adding sass styling to the signup form (label and otherProps)
        for the input area shrink when the value or textfield is null or empty */
        <div className="group">
        <input className="form-input"
            {...otherProps}
         />
        {label && (
            
            <label 
                className={`${
                    otherProps.value.length ? 'shrink' : ''
                } form-input-label`}
            >
            
                {label}
            </label>
        )}  
       
        </div>
       
    )
}

export default FormInput;