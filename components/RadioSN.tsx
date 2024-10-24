import React, { useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';



const RadioSN = () => {
  const simnao: RadioButtonProps[] = useMemo(() => ([
    {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Sim',
    value: 'sim'
  },
  {
    id: '2',
    label: 'Não',
    value: 'nao'
  }]), []);
  
  const [selectedId, setSelectedId] = useState<string | undefined>();

  return (
    <RadioGroup 
        radioButtons={simnao} 
        onPress={setSelectedId}
        selectedId={selectedId}
        layout='row'
    />
);

};

export default RadioSN;