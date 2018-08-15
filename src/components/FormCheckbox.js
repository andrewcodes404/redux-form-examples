import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { uploadDataAC } from '../actions'


//////  I found this here ==> https://stackoverflow.com/questions/42836060/multiple-checkbox-in-redux-form
/// it's pretty good but not really sure how the checked and onchange in the render work

//Also no error warnings here??

const MultiCheckBox = ({ input, meta: { touched, error, warning } }) => {

    let options = [{ id: 1, name: 'Red' }, { id: 2, name: 'Yellow' }, { id: 3, name: 'Green' }, { id: 3, name: 'Blue' }, { id: 3, name: 'Fuschia' }, { id: 3, name: 'Orange' }]

    // Works with ust a array if you replace all instances of'option.name' with just option
    // let optionsArray = ['red', 'pink', 'orange', 'brown']


    return options.map((option, index) => {
        return (
            <div className="checkbox" key={index}>
                <label> {option.name} </label>
                <input type="checkbox"

                    name={`${input.name}[${index}]`}

                    value={option.name}

                    checked={input.value.indexOf(option.name) !== -1}

                    onChange={(event) => {
                        const newValue = [...input.value];
                        if (event.target.checked) {
                            newValue.push(option.name);
                        } else {
                            newValue.splice(newValue.indexOf(option.name), 1);
                        }
                        return input.onChange(newValue);
                    }} />
            </div>)
    });
}

class Test extends React.Component {


    submit = (values) => {
        console.log("values : ", values);
        uploadDataAC(values, () => {
            console.log("this is the callback");

        })
    }



    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <h4>FormCheckbox.js</h4>
                <Field name="color" component={MultiCheckBox} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

Test = reduxForm({
    // a unique name for the form
    form: 'Test',

})(Test)

export default connect(null, { uploadDataAC })(Test)


