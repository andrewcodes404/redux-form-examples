import React from 'react';
import { uploadDataAC } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

const renderInput = field =>   // Define stateless component to render input and errors
    <div>
        <input {...field.input} type={field.type} placeholder={field.placeholder}/>
        
        
        {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
    </div>


class FormWithRenderInput extends React.Component {

    submit = (values) => {
        this.props.reset()
        uploadDataAC(values, () => {
            console.log("values : ", values);
            console.log("this is the callback from uploadDataAC()");
        })
    }
    render() {

        const { handleSubmit, reset } = this.props
       
        //An array of all input types
        //I left some out --> image, hidden, month, week, submit/reset and button
        const alTypes = [ "checkbox", "color", "date", "datetime-local", "email", "file", "number", "password", "radio", "range", "search", "tel", "text", "time", "url"]


        // Here i have mapped through the array of all the different input types
        //You csan see it's as easy as change the label, name and type AND you can still use the same render👏 🎉

        return (
            <form onSubmit={handleSubmit(this.submit)}>    
                <h4>FormWithRenderInput.js</h4>
                {alTypes.map(e=>(
                    <div key={e} className="field-cont">
                        {/* <label htmlFor={e}>{e}</label> */}
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
                ) )}
                

                <button type="submit">Submit</button>
            </form>
        );
    }
}

FormWithRenderInput = reduxForm({
    // a unique name for the form
    form: 'formWithRenderInput'
})(FormWithRenderInput)

export default connect(null, { uploadDataAC })(FormWithRenderInput)



