import React from 'react';
import { uploadDataAC } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class BasicFormComp extends React.Component {
    submit = (values) => {
        console.log("values : ", values);
        uploadDataAC(values, () => {
            console.log("this is the callback from uploadDataAC()");
        })
    }

    render() {

        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit(this.submit)}>
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
        );
    }
}

BasicFormComp = reduxForm({
    // a unique name for the form
    form: 'basicFormComp'
})(BasicFormComp)

export default connect(null, { uploadDataAC })(BasicFormComp)