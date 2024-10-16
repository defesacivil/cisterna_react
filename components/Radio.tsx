import React, { useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';



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