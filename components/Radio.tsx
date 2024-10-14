import React, { useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';


const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Própria',
      value: 'propria'
    },
    {
      id: '2',
      label: 'Alugada',
      value: 'alugada'
    },
    {
      id: '3',
      label: 'Cedida',
      value: 'cedida'
    }
  ]), []);

const RadioComponent = ({radioButtons}) => {

  
  const [selectedId, setSelectedId] = useState<string | undefined>();

  return (
    <RadioGroup 
        radioButtons={radioButtons} 
        onPress={setSelectedId}
        selectedId={selectedId}
        layout='row'
    />
);

};

export default RadioComponent;