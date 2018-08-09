import React from 'react';
import { uploadDataAC } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'


///this is the bit you MUST HAVE 'delete input.value' if you don''t you will get an REACT error

// ☠️   💀   // ☠️   💀   // ☠️   💀   // ☠️   💀   // ☠️   💀   
// Warning: A component is changing an uncontrolled input of type file to be controlled.Input elements should not switch from uncontrolled to controlled
// ☠️   💀   // ☠️   💀   // ☠️   💀   // ☠️   💀   // ☠️   💀   

const renderFileInput = ({ input, type, meta: { touched, error } }) => {
    // this 👇 v.important
    delete input.value
    return (
        <div>
            <input {...input} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    )
}

class FormWithFileInput extends React.Component {


    // 1. Now we can grab our single file and add it to the local state
    state = { selectedFile: null }
    onFileSelected = event => {
        this.setState(
            { selectedFile: event.target.files[0] }
        )
    }

    //2. we must manipulate this 
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
                <h3>file input</h3>

                <div className="field-cont">
                    <label htmlFor="fileUpload">Upload File</label>
                    <Field
                        // Specify field name
                        name="fileUpload"
                        // Reuse same render component
                        component={renderFileInput}
                        // "type" prop passed to renderInput
                        type="file"
                        onChange={this.onFileSelected}
                    />
                </div>

                <button type="submit">Submit</button>


            </form>

        );
    }
}


const validate = values => {
    const errors = {}
    if (!values.imageUpload) {
        errors.imageUpload = 'Required'
    }
    return errors
}


FormWithFileInput = reduxForm({
    // a unique name for the form
    form: 'FormWithFileInput',
    validate,
})(FormWithFileInput)

export default connect(null, { uploadDataAC })(FormWithFileInput)



