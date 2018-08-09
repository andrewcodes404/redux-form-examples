import React from 'react';
import { uploadDataAC } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'



const selectOptions = ["red", "green", "pink", "azure"]
const renderSelect = ({ input, type, meta: { touched, error, warning } }) => (

    <div>
        <h3>Pic your favourite color</h3>
        <select {...input} type={type} >
            <option></option>
            {selectOptions.map(e => (
                <option key={e} value={e}>{e}</option>
            ))}
        </select>

        {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
    </div>
)

class FormWithSelectDrop extends React.Component {

    submit = (values) => {
        this.props.reset()
        console.log("values : ", values);
        // uploadDataAC(values, () => {
        //     console.log("values : ", values);
        //     console.log("this is the callback from uploadDataAC()");
        // })
    }
    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <div className="field-cont">
                    {/* <label htmlFor={e}>{e}</label> */}
                    <Field
                        // Specify field name
                        name="FavColour"
                        // Reuse same render component
                        component={renderSelect}
                        // "type" prop passed to renderInput
                        type="select"
                    />
                </div>



                <button type="submit">Submit</button>
            </form>
        );
    }
}


const validate = values => {
    const errors = {}
    if (!values.FavColour) {
        errors.FavColour = 'Required'
    }
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.number < 10) {
        warnings.number = 'Hmm 🤔, we\'d like a # higher than 10!'
    }
    return warnings
}


FormWithSelectDrop = reduxForm({
    // a unique name for the form
    form: 'FormWithSelectDrop',
    validate,
    warn
})(FormWithSelectDrop)

export default connect(null, { uploadDataAC })(FormWithSelectDrop)