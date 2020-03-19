import { isEmptyObject } from '../../utils';

const getOutputValue = (inputValue, inputCurrency, outputCurrency) => {
  if(isEmptyObject(outputCurrency) || isEmptyObject(inputCurrency)) {
    return 0
  }
  console.log(inputValue, inputCurrency, outputCurrency);
  console.log((inputValue * inputCurrency.exchangeRate)/(outputCurrency.exchangeRate));
  return (inputValue * inputCurrency.exchangeRate)/(outputCurrency.exchangeRate);
}

export const initialArg = {
  inputValue: 0,
  inputCurrency: {},
  outputValue: 0,
  outputCurrency: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'inputValue':
      return { 
        ...state, 
        inputValue: action.payload,
        outputValue: getOutputValue(action.payload, state.inputCurrency, state.outputCurrency)
      };
    case 'outputValue':
      return { 
        ...state, 
        outputValue: action.payload,
        inputValue: getOutputValue(action.payload, state.outputCurrency, state.inputCurrency)
      };
    case 'inputCurrency':
      return { 
        ...state, 
        inputCurrency: action.payload,
        outputValue: getOutputValue(state.inputValue, action.payload, state.outputCurrency)
      };
    case 'outputCurrency':
      return { 
        ...state, 
        outputCurrency: action.payload,
        outputValue: getOutputValue(state.inputValue, state.inputCurrency, action.payload)
      };
    case 'handleSwap':
      return { 
        ...state, 
        outputCurrency: state.inputCurrency,
        inputCurrency: state.outputCurrency,
        outputValue: getOutputValue(state.inputValue, state.outputCurrency, state.inputCurrency),
      };
    default:
      throw new Error();
  }
}

