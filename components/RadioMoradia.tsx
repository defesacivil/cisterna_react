import React, { useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';



const RadioMoradia = () => {
  const moradia: RadioButtonProps[] = useMemo(() => ([
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
  },
    ]), []);

  
  const [selectedId, setSelectedId] = useState<string | undefined>();

  return (
    <RadioGroup 
        radioButtons={moradia} 
        onPress={setSelectedId}
        selectedId={selectedId}
        layout='row'
    />
);

};

export default RadioMoradia;