import React from 'react';
// import MultiCheckBox from "./MultiCheckBox";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'


//////  I found this here ==> https://stackoverflow.com/questions/42836060/multiple-checkbox-in-redux-form
/// it's pretty good but not really sure how the checked and onchange in the render work

//or why options is am Object?? can it not be an array?
const MultiCheckBox = ({ input, meta: { touched, error, warning } }) => {

    // let options = [{ id: 1, name: 'Red' }, { id: 2, name: 'Yellow' }, { id: 3, name: 'Green' }, { id: 3, name: 'Blue' }, { id: 3, name: 'Fuschia' }, { id: 3, name: 'Orange' }]

    let optionsArray = ['red', 'pink', 'orange', 'brown']

    return optionsArray .map((el, index) => {
        return (
            <div className="checkbox" key={index}>
                <label> {el} </label>
                <input type="checkbox"

                    name={`${input.name}[${index}]`}

                    value={el}

                    checked={input.value.indexOf(el) !== -1}

                    onChange={(event) => {
                        const newValue = [...input.value];
                        if (event.target.checked) {
                            newValue.push(el);
                        } else {
                            newValue.splice(newValue.indexOf(el), 1);
                        }
                        return input.onChange(newValue);
                    }} />
            </div>)
    });
}

class Test extends React.Component {
    submit = (values) => {
        console.log("values : ", values);
    }
    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
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

export default connect()(Test)


