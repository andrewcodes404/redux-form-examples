import React from 'react';
import { uploadDataAC } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'


const renderInput = ({ input, placeholder, type, meta: { touched, error, warning } }) => (
    <div>
        <input {...input} type={type} placeholder={placeholder} />
        {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
    </div>

)

class FormWithRenderInput extends React.Component {

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
        const radioOptions = ["spring", "summer", "autumn", "winter"]

        return (
            <form onSubmit={handleSubmit(this.submit)}>
                {radioOptions.map(e => (
                    <div key={e} className="field-cont">
                        <label htmlFor={e}>{e}</label>
                        <Field
                            // Specify field name
                            name="season"
                            // Reuse same render component
                            component={renderInput}
                            // "type" prop passed to renderInput
                            type="radio"
                            //placeholder setting
                            placeholder={e}
                            value={e}
                        />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        );
    }
}


const validate = values => {
    const errors = {}
    if (!values.season) {
        errors.season = 'Required'
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


FormWithRenderInput = reduxForm({
    // a unique name for the form
    form: 'formWithRenderInput',
    validate,
    warn
})(FormWithRenderInput)

export default connect(null, { uploadDataAC })(FormWithRenderInput)