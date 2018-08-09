import React from 'react';
import { uploadFileAC } from '../actions'
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



class FormWithFileInputAndAction extends React.Component {

    ////PREVIEW IMAGE Fn
    // https://codepen.io/hartzis/pen/VvNGZP?editors=1010
    state = { file: '', imagePreviewUrl: '' };
    onFileSelected = (e) => {
        // e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }





    //2. we must manipulate this 

    submit = (values) => {
        console.log("values : ", values);
        uploadFileAC(values, () => {
            console.log("this is the callback from uploadFileAC()");
            
        })
        this.props.reset()
    }

    render() {
        // /IMAGE PREVIEW RENDER
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="la la la "/>);
        } 
     
        const { handleSubmit } = this.props
        return (

            <form onSubmit={handleSubmit(this.submit)}>
             
             
                <div className="field-cont">
                <label htmlFor="title">title</label>
                    <Field name="title" component="input" type="text"/>
                </div>

                <div className="field-cont">
                    <label htmlFor="image">Upload Image</label>
                    <Field
                        // Specify field name
                        name="image"
                        // Reuse same render component
                        component={renderFileInput}
                        // "type" prop passed to renderInput
                        type="file"
                        onChange={this.onFileSelected}
                    />
                </div>

                <div className="imgPreview">
                    {$imagePreview}
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


FormWithFileInputAndAction = reduxForm({
    // a unique name for the form
    form: 'FormWithFileInputAndAction',
    validate,
})(FormWithFileInputAndAction)

export default connect(null, { uploadFileAC })(FormWithFileInputAndAction)



