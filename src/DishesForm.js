import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import InputMask from 'react-input-mask';

const requiredFieldsBase = [
  'name',
  'preparation_time',
  'type'
];

const requiredFieldsType = {
  '': [],
  'pizza': [
    'no_of_slices',
    'diameter',
  ],
  'soup': [
    'spiciness_scale',
  ],
  'sandwich': [
    'slices_of_bread',
  ],
}

// Validation of inputs
const validate = values => {
  const errors = {};
  let requiredFields;
  if(!!values.type){
    requiredFields = [
      ...requiredFieldsBase,
      ...requiredFieldsType[values.type]
    ];
  }else{
    requiredFields = requiredFieldsBase;
  }
  

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });

  return errors;
};

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && !!error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

//Text field
const renderTextField = ({
  label,
  input,
  type,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    type={type}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

//Time field
const renderTimeField = ({
  label,
  input,
  mask,
  formatChars,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <InputMask
    mask={mask}
    disabled={false}
    maskChar="0"
    formatChars= {{
      ...formatChars,
      '9': '[0-9]',
      'a': '[A-Za-z]',
      '*': '[A-Za-z0-9]'}}
      {...input}
      {...custom}
  >
    {() => <TextField 
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
    />}
  </InputMask>
);

// Select field
const renderSelectField = ({
  input,
  label,
  onChange,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && !!error}>
    <InputLabel>{label}</InputLabel>
    <Select
      native
      onChange={onChange}
      {...input}
      {...custom}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)


//Dishes form component
let DishesForm = props => {
  const { handleSubmit } = props;
  const [dishType, setDishType] = useState('');

  function handleChangeDishType(event){
    setDishType(event.target.value);
  }

  return (
  <form onSubmit={handleSubmit}>
    <div>
      <Field
          name="name"
          component={renderTextField}
          label="Dish name"
      />
    </div>
    <div>
      <Field
          name="preparation_time"
          component={renderTimeField}
          label="Preparation time"
          mask="99:59:59"
          formatChars={{'5': '[0-5]'}}
      />
    </div>
    <div>
        <Field
          name="type"
          component={renderSelectField}
          label="Dish type"
          onChange={handleChangeDishType}
        >
          <option />
          <option value={'pizza'}>Pizza</option>
          <option value={'soup'}>Soup</option>
          <option value={'sandwich'}>Sandwich</option>
        </Field>
    </div>
    {
      (() => {
          if (dishType==='pizza')
             return <>
              <div>
                <Field
                    name="no_of_slices"
                    component={renderTextField}
                    label="Number of slices"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                />
              </div>
              <div>
                <Field
                    name="diameter"
                    component={renderTextField}
                    label="Diameter"
                    type="number"
                    InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                />
              </div>
            </>;
          if (false)
             return <span>Two</span>
          if (false)
             return <span>Three</span>
      })()
    }
    <Button
      variant="contained"
      color="primary"
      type="submit"
    >
      Submit
    </Button>
  </form>
  );
}

DishesForm = reduxForm({
  form: 'dishes',
  validate
})(DishesForm);

export default DishesForm;