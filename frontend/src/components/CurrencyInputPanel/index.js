import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import { BorderlessInput } from '../../theme'
import { darken } from 'polished'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'
import TokenLogo from '../TokenLogo'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { transparentize } from 'polished'
import { Spinner } from '../../theme'

const useStyles = makeStyles(theme => ({
  swapButtonContainer: {
    padding: '10px',
    display: 'table',
    margin: 'auto',
  },
  swapButton: {
    background: '#eee',
    color: '#000 !important',
  },
  customPaper: {
    padding: theme.spacing(2),
  },
  span: {
    float: 'right',
  }
}));

const StyledBorderlessInput = styled(BorderlessInput)`
  min-height: 2.5rem;
  flex-shrink: 0;
  text-align: left;
  padding-left: 1.6rem;
  background-color: ${({ theme }) => theme.concreteGray};
`

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;

  padding: 0.25rem 0.85rem 0.75rem;
`

const Input = styled(BorderlessInput)`
  width: 395px;
  font-size: 2rem;
  color: ${({ error, theme }) => error && theme.salmonRed};
  background-color: ${({ theme }) => theme.inputBackground};
  -moz-appearance: textfield;
`

const CurrencySelect = styled.button`
  align-items: center;
  font-size: 1rem;
  color: ${({ selected, theme }) => (selected ? theme.textColor : theme.royalBlue)};
  height: 2rem;
  border: 1px solid ${({ selected, theme }) => (selected ? theme.mercuryGray : theme.royalBlue)};
  border-radius: 2.5rem;
  background-color: ${({ selected, theme }) => (selected ? theme.concreteGray : theme.zumthorBlue)};
  outline: none;
  cursor: pointer;
  user-select: none;
  float: right;
  border-color: #d8d4d4;

  :hover {
    border: 1px solid
      ${({ selected, theme }) => (selected ? darken(0.2, '#3f51b5') : darken(0.2, '#3f51b5'))};
  }

  :focus {
    border: 1px solid ${({ theme }) => darken(0.2, '#3f51b5')};
  }

  :active {
    background-color: ${({ theme }) => theme.zumthorBlue};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledDropDown = styled(DropDown)`
  margin: 0 0.5rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.textColor : theme.royalBlue)};
  }
`

const InputPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.1, '#fff')};
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.inputBackground};
  z-index: 1;
`

const Container = styled.div`
  border-radius: 1.25rem;
  border: 1px solid ${({ error, theme }) => (error ? theme.salmonRed : theme.mercuryGray)};

  border-color: #b9b7b7;
    :focus-within {
    border: 1px solid ${({ theme }) => theme.malibuBlue};
  }
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.doveGray};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, '#3f51b5')};
  }
`

const LabelContainer = styled.div`
  flex: 1 1 auto;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const TokenModal = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  width: 100%;
`

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 1rem;
  height: 60px;
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.textColor};
  }
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const SearchContainer = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: flex-start;
  padding: 0.5rem 1.5rem;
  background-color: ${({ theme }) => theme.concreteGray};
`

const TokenModalInfo = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.25rem 0.5rem;
  justify-content: center;
  user-select: none;
`

const TokenList = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const TokenModalRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
  user-select: none;

  #symbol {
    color: ${({ theme }) => theme.doveGrey};
  }

  :hover {
    background-color: ${({ theme }) => theme.tokenRowHover};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0.8rem 1rem;
    padding-right: 2rem;
  `}
`

const TokenRowLeft = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items : center;
`

const TokenSymbolGroup = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  margin-left: 1rem;
`

const TokenFullName = styled.div`
  color: ${({ theme }) => theme.chaliceGray};
`

const FadedSpan = styled.span`
  color: ${({ theme }) => theme.royalBlue};
`

const TokenRowBalance = styled.div`
  font-size: 1rem;
  line-height: 20px;
`

const TokenRowUsd = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.chaliceGray};
`

const TokenRowRight = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: flex-end;
`

const StyledTokenName = styled.span`
  margin: 0 0.25rem 0 0.25rem;
`

const SpinnerWrapper = styled(Spinner)`
  margin: 0 0.25rem 0 0.25rem;
  color: ${({ theme }) => theme.chaliceGray};
  opacity: 0.6;
`

const CurrencyInputPanel = (props) => {

  const [value, setValue] = useState('');
  const classes = useStyles();

  function _renderInput() {
    return (
      <InputRow>
        <Input
          type="number"
          min="0"
          step="0.000000000000000001"
          placeholder="0.0"
          onChange={e => setValue(e.target.value)}
          onKeyPress={e => {
            const charCode = e.which ? e.which : e.keyCode
            // Prevent 'minus' character
            if (charCode === 45) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
          value={value}
        />
        <CurrencySelect>
          <TokenLogo address='ETH' />
        ETH
        <StyledDropDown selected='ETH' />
        </CurrencySelect>
      </InputRow>
    )
  }

  return (
    <InputPanel>
      <Container>
        <LabelRow>
          <span>{props.title}</span>
          {props.showBalance && <span className={classes.span}>Balance: 0</span>}
        </LabelRow>
        {_renderInput()}
      </Container>
    </InputPanel>
  )
}

export default CurrencyInputPanel;
