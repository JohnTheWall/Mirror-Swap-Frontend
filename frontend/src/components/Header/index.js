import React from 'react'
import styled from 'styled-components'

import { Link } from '../../theme'
// import Web3Status from '../Web3Status'
import { darken } from 'polished'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 23px;
`

const HeaderElement = styled.div`
  margin: 1.25rem;
  display: flex;
  min-width: 0;
  display: flex;
  align-items: center;
`

const Nod = styled.span`
  transform: rotate(0deg);
  transition: transform 150ms ease-out;

  :hover {
    transform: rotate(-10deg);
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-left: 22px;

  :hover {
    cursor: pointer;
  }

  #link {
    text-decoration-color: ${({ theme }) => theme.UniswapPink};
  }

  #title {
    display: inline;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.wisteriaPurple};
    :hover {
      color: ${({ theme }) => darken(0.2, '#3f51b5')};
    }
  }
`
const CurrencySelect = styled.button`
  align-items: center;
  font-size: 1rem;
  color: ${({ selected, theme }) => (selected ? theme.textColor : theme.royalBlue)};
  height: 2rem;
  border: 1px solid ${({ selected, theme }) => (selected ? theme.mercuryGray : theme.royalBlue)};
  border-radius: 2.5rem;
  background-color: white;
  outline: none;
  cursor: pointer;
  user-select: none;
  border-color: #d8d4d4;
  float: right;
  margin-right: 18px;
  :hover {
    border: 1px solid
      ${({ selected, theme }) => (selected ? darken(0.2, '#3f51b5') : darken(0.2, '#3f51b5'))};
      background-color: #1d3fff;
      color: white;
  }

  :focus {
    border: 1px solid ${({ theme }) => darken(0.2, '#3f51b5')};
  }

  :active {
    background-color: ${({ theme }) => theme.zumthorBlue};
  }
`

const Header = () => {
  return (
    <HeaderFrame>
      <Title>
        <Nod>
          <Link id="link" href="/#">
          </Link>
        </Nod>
        <Link id="link" href="/#">
          <h1 id="title">Mirror Swap</h1>
        </Link>
      </Title>
      <CurrencySelect>
        Connect Account
        </CurrencySelect>
    </HeaderFrame>
  )
}

export default Header;
