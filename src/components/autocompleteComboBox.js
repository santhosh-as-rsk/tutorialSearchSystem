import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AutocompleteComboBox = ((props) => {
  const isOptionEqualToValue = (option, value) => option.name === value.name
  const [value, setValue] = React.useState(null)
  const onChange = (val)=>{
    if(val){
    setValue(val);
    props.selectedTopics(val.name);}
    else{
      setValue(null);
    }
  }

  React.useEffect(()=>{
    if(props.value === null){
      setValue(null);}
    else if(props.value===props.topics[0].name){
      setValue(props.topics[0]);
    }
  },[props])
  return (
    <div>
    <Autocomplete
      id={"combo-box-"+props.lableName}
      options={props.topics}
      sx={{ width: 300 }}
      getOptionLabel={(option)=> option.name }
      onChange={ (event,val)=>onChange(val)}
      noOptionsText='choose listed options'
      value={value}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) => 
      <TextField 
        {...params}
        variant="outlined" 
        label={props.lableName[0].toUpperCase() + props.lableName.slice(1)}
        />}
    />
    </div>
  );
 
});

export default AutocompleteComboBox;