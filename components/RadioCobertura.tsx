import React, { useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';



const RadioCobertura = () => {
  
  const moradia: RadioButtonProps[] = useMemo(() => ([
    {
      id: '1', 
      label: 'PVC',
      value: 'pvc'
    },
    {
      id: '2',
      label: 'Amianto',
      value: 'amianto'
    },
    {
      id: '3',
      label: 'Concreto',
      value: 'concreto'
    },
    {
      id: '4',
      label: 'Outros',
      value: 'outros'
    },
    {
      id: '5',
      label: 'Cerâmica',
      value: 'ceramica'
    },
    {
      id: '6',
      label: 'Fibrocimento',
      value: 'fibrocimento'
    },
    {
      id: '7',
      label: 'Zinco',
      value: 'zinco'
    },
    {
      id: '8',
      label: 'Metálica',
      value: 'metalica'
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

export default RadioCobertura;