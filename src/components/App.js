import React from 'react';
// import BasicFormFSC from "./BasicFormFSC";
// import BasicFormComp from "./BasicFormComp";
// import FormWithRenderInput from "./FormWithRenderInput";
// import FormWithRenderValidation from "./FormWithRenderValidation";
// import FormCheckbox from "./FormCheckbox";
import FormWithRadio from "./FormWithRadio";
import FormWithSelectDrop from "./FormWithSelectDrop";



// import Test from "./Test";




// 👇 functional stateless comp
const App = () => (
    <div>
        {/* <BasicFormFSC /> */}
        {/* <BasicFormComp /> */}
        
        {/* all input types here 👇 */}
        {/* <FormWithRenderInput /> */}

        {/* <FormWithRenderValidation /> */}
        
        {/* <FormCheckbox/> */}
        <FormWithRadio />
        <FormWithSelectDrop />

        {/* <Test /> */}





        
    </div>
);

export default App;