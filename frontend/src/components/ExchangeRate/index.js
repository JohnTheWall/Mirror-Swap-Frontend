import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
// import { useTranslation } from 'react-i18next'

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.doveGray};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem;
  background: #eee;
  width: 89%;
  margin-left: 14px;
  border-radius: 0.625rem;
`
const spanStyle = {
  float: 'right'
}
const ExchangeRates = ({
  inputCurrency,
  outputCurrency,
}) => {
  // const { t } = useTranslation()

  return (
    <LabelRow>
      <span>Exchange Rate:</span>
      <span style={spanStyle}>-</span>
    </LabelRow>
  );  
};

ExchangeRates.propTypes = {
  inputCurrency: PropTypes.object,
  outputCurrency: PropTypes.object,
};

export default ExchangeRates;
