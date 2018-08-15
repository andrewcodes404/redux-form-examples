import React from 'react';
import { uploadDataAC } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import TinyMCE from 'react-tinymce';



class TinyAgain extends React.Component {

    editorConfig = {
        theme: 'modern',
        width: 600,
        height: 200,
        plugins: [
            'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
            'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
            'save table contextmenu directionality emoticons template paste textcolor'
        ],
        // content_css: 'css/content.css',
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons'
    }

    // editorContent = () => {
    //     return TinyMCE.get(this.props.id) ? TinyMCE.get(this.props.id).getContent() : '';
    // }

    submit = (values) => {
        console.log("it clicked");
        console.log("values : ", values);
        this.props.reset()

        
    }

   
    renderMyStrangeInput = field => {
        delete this.props.input
        return <TinyMCE
            config={this.editorConfig}
            name={field.name}
            
            value={field.input.content !== '' ? field.input.content : null}
            onBlur={(event) => { field.input.onChange(event.target.getContent()) }}
        />
    }


    render() {

        // const { value, id } = this.props;
        const { handleSubmit} = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Field
                    name="myField"
                    component={this.renderMyStrangeInput}
                    
                />
                <button type="submit">Submit</button>

            </form >

        );
    }
}

TinyAgain = reduxForm({
    // a unique name for the form
    form: 'FormWithTinyMCE'
})(TinyAgain)

export default connect(null, { uploadDataAC })(TinyAgain)