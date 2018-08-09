import React from 'react';
import { uploadDataAC } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

const submit = (values) => {
    uploadDataAC(values, ()=>{
        console.log("this is the callback from uploadDataAC()");
    })
}

let BasicFormFSC = props => {
    const { handleSubmit } = props
    return(
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" component="input" type="text" />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}





BasicFormFSC = reduxForm({
    // a unique name for the form
    form: 'basicFormFSC'
})(BasicFormFSC)

export default connect(null, { uploadDataAC })(BasicFormFSC)