import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRef, useState } from 'react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {InputAdornment} from '@mui/material';

export const AutocompleteComboBox = ((props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const {topics} = props;
  const isOptionEqualToValue = (option, value) => { return option.name === value.name}
  const [value, setValue] = React.useState(null)
  const [option, setOption] = React.useState(topics)

  React.useEffect(()=>{
    setOption(props.topics)
  }, [props.topics])

  const onChange = (event,val)=>{
    setOption(props.topics)
    if(val){
      setValue(val);
      props.selectedTopics(val.name);}
    else{
        setOption(topics)
        setValue(null);
    }
  }

  const onInputChange = (event,newValue)=>{
    const filteredOptions = topics.filter((topic)=> topic.name.toLowerCase().includes(newValue.toLowerCase()));
      setOption(filteredOptions);
  }

  const onFocus = (event)=>{
    const eventValue = event.target.value
    if(eventValue){
      const filteredOptions = topics.filter((topic)=> topic.name.toLowerCase().includes(eventValue.toLowerCase()));
      setOption(filteredOptions);
      const val = topics.filter((topic)=> topic.name === eventValue)[0]
      setValue(val);
      props.selectedTopics(eventValue)
    }
    else{
      setOption(topics)
      setValue(null)
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
      id={"combo-box-"+ props.lableName}
      autoHighlight
      autoSelect
      options={option}
      sx={{ width: isMobile ? 100 : 300 }}
      getOptionLabel={(option)=> option.name }
      noOptionsText='choose listed options'
      value={value}
      onInputChange={onInputChange}
      onChange={ onChange }
      onFocus={ onFocus }
      isOptionEqualToValue={ isOptionEqualToValue }
      renderInput={(params) => 
      <TextField 
        {...params}
        variant="outlined" 
        label={props.lableName[0].toUpperCase() + props.lableName.slice(1)}
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position="start">
              <ManageSearchIcon />
            </InputAdornment>
          ),
        }}
        />}
    />
    </div>
  );
 
});

export const AutocompleteMultipleSelect = (props) => {
  const autocompleteRef = useRef(null);
  const [limitTags] = useState(3);
  const { topics } = props;
  const isOptionEqualToValue = (option, value) => { return option.id === value.id}
  const [value, setValue] = useState([]);

  const onChange = (event, values) => {
    setValue(values);
    if (values.length > 0) {
      props.setSelectedTopics(values.map((val) => val.name));
    } else {
      props.setSelectedTopics([]);
      setValue([]);
    }
  };

  React.useEffect(()=>{
        const filteredSelectedOptions = value.filter((val) =>
            topics.some((topic) => val.id === topic.id)
          );
        setValue(filteredSelectedOptions);
  },[topics])

  return (
    <div>

      <Autocomplete
        id={"combo-box-" + props.labelName}
        ref={autocompleteRef}
        autoSelect
        multiple 
        options={topics}
        style={{
          width: '100%',
          minWidth: 200,
          maxWidth: 450
        }}
        getOptionLabel={(option) => option.name}
        noOptionsText="Choose listed options"
        value={value}
        limitTags={limitTags}
        isOptionEqualToValue={isOptionEqualToValue}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
          {...params}
          label={props.labelName[0].toUpperCase() + props.labelName.slice(1)}
          variant="outlined"
        />
        )}
      />
    </div>
  );
};