import React from 'react';
import { uploadDataAC } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'


const renderInput = ({ input, placeholder, type, meta: { touched, error, warning } }) =>   (
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
        uploadDataAC(values, () => {
            console.log("values : ", values);
            console.log("this is the callback from uploadDataAC()");
        })
    }
    render() {

        const { handleSubmit } = this.props

        // just pick enter your input types here
        const allTypes = ["number", "password", "tel", "text", "url"]


        // Here i have mapped through the array of all the different input types
        //You csan see its as easy as change the label, name and type AND you can still use the same render👏 🎉

        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <h4>FormWithRenderValidation.js</h4>
                {allTypes.map(e => (
                    <div key={e} className="field-cont">
                        <label htmlFor={e}>{e}</label>
                        <Field
                            // Specify field name
                            name={e}
                            // Reuse same render component
                            component={renderInput}
                            // "type" prop passed to renderInput
                            type={e}
                            //placeholder setting
                            placeholder={e}
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
    if (!values.number) {
        errors.number = 'Required'
    }

    if (!values.password) {
        errors.password = 'Required'
    }

    if (!values.tel) {
        errors.tel = 'Required'
    }

    if (!values.text) {
        errors.text = 'Required'
    }
    if (!values.url) {
        errors.url = 'Required'
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



