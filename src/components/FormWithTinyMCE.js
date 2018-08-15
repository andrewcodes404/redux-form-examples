import React from 'react';
import { uploadDataAC } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import TinyMCE from 'react-tinymce';


// This is done with react-tinymce, there is also 
// tinymce-react available but it's hard to see the difference

// The only problem using reset() cannot get it to work?

/// YOU WILL NEED THIS CDN IN THE index.html ///
//  <script src="//cdn.tinymce.com/4/tinymce.min.js"></script>

const renderTinyMCE = (field) => {
    console.log("field.input.content : ", field.input.content);
    // delete props.input;
    // delete props.meta;
    return <TinyMCE
        {...field.props}
        value={field.input.content !== '' ? field.input.content : null}
        onBlur={(event, value) => { field.input.onChange(event.target.getContent()) }}
        config={field.config} 
    />
}

class FormWithTinyMCE extends React.Component {
    editorConfig = {
        theme: 'modern',
        width: 600,
        height: 300,
        plugins: [
            'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
            'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
            'save table contextmenu directionality emoticons template paste textcolor'
        ],
        // content_css: 'css/content.css',
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons'
    }

    submit = (values) => {
        console.log("this.props : ", this.props);
        console.log("values : ", values);
        uploadDataAC(values, () => {
            console.log("this is the callback from uploadDataAC()");
        })
        this.props.reset();
    }

    render() {

        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Field
                    component={renderTinyMCE}
                    name="tiny"
                    // ref={this.props.id}
                    // id={this.props.id}
                    // disabled={this.props.readonly}
                    // autoComplete="off"
                    config={this.editorConfig}
                />

                <button type="submit" >Submit</button>
            </form>
        );
    }
}

FormWithTinyMCE = reduxForm({
    // a unique name for the form
    form: 'FormWithTinyMCE'
})(FormWithTinyMCE)

export default connect(null, { uploadDataAC })(FormWithTinyMCE)
