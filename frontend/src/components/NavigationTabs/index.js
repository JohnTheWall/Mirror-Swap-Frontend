import React, { useCallback } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { transparentize, darken } from 'polished'

const tabOrder = [
  {
    path: '/swap',
    textKey: 'Swap',
    regex: /\/swap/
  },
  {
    path: '/fill',
    textKey: 'Fill',
    regex: /\/fill/
  },
]

const BetaMessage = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  cursor: pointer;
  flex: 1 0 auto;
  align-items: center;
  position: relative;
  padding: 0.5rem 1rem;
  padding-right: 2rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => transparentize(0.6, theme.wisteriaPurple)};
  background-color: ${({ theme }) => transparentize(0.9, theme.wisteriaPurple)};
  border-radius: 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.wisteriaPurple};

  &:after {
    content: '✕';
    top: 0.5rem;
    right: 1rem;
    position: absolute;
    color: ${({ theme }) => theme.wisteriaPurple};
  }
`

const DaiMessage = styled(BetaMessage)`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  word-wrap: wrap;
  overflow: visible;
  white-space: normal;
  padding: 1rem 1rem;
  padding-right: 2rem;
  line-height: 1.2rem;
  cursor: default;
  color: ${({ theme }) => theme.textColor};
  div {
    width: 100%;
  }
  &:after {
    content: '';
  }
`

const CloseIcon = styled.div`
  width: 10px !important;
  top: 0.5rem;
  right: 1rem;
  position: absolute;
  color: ${({ theme }) => theme.wisteriaPurple};
  :hover {
    cursor: pointer;
  }
`

const WarningHeader = styled.div`
  margin-bottom: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.uniswapPink};
`

const WarningFooter = styled.div`
  margin-top: 10px;
  font-size: 10px;
  text-decoration: italic;
  color: ${({ theme }) => theme.greyText};
`

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  height: 2.5rem;
  background-color: #eee;
  border-radius: 3rem;
  /* border: 1px solid ${({ theme }) => theme.mercuryGray}; */
  margin-bottom: 1rem;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.mercuryGray};
  flex: 1 0 auto;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  width: 50%;
  display: inline-flex;
  font-size: large;
  border-color: aliceblue;
  color: black;

  &.${activeClassName} {
    background: #3f51b5;
    color: white;

    border-radius: 3rem;
    border: 1px solid ${({ theme }) => theme.mercuryGray};
    box-shadow: 0 4px 8px 0 ${({ theme }) => theme.shadowColor};
    box-sizing: border-box;
    font-weight: 500;
    :hover {
      /* border: 1px solid ${({ theme }) => theme.mercuryGray}; */
      background-color: ${({ theme }) => theme.inputBackground};
    }
  }

  :hover,
  :focus {
    color: ${({ theme }) => theme.royalBlue};
  }
`

function NavigationTabs({ location: { pathname }, history }) {
  const navigate = useCallback(
    direction => {
      const tabIndex = tabOrder.findIndex(({ regex }) => pathname.match(regex))
      history.push(tabOrder[(tabIndex + tabOrder.length + direction) % tabOrder.length].path)
    },
    [pathname, history]
  )

  return (
    <>
      <Tabs>
        {tabOrder.map(({ path, textKey, regex }) => (
          <StyledNavLink key={path} to={path} isActive={(_, { pathname }) => pathname.match(regex)}>
            {textKey}
          </StyledNavLink>
        ))}
      </Tabs>
    </>
  )
}

export default withRouter(NavigationTabs)
