import { ethers } from 'ethers'

export function getQueryParam(windowLocation, name) {
  var q = windowLocation.search.match(new RegExp('[?&]' + name + '=([^&#?]*)'))
  return q && q[1]
}

export function checkSupportedTheme(themeName) {
  // if (themeName && themeName.toUpperCase() in SUPPORTED_THEMES) {
  //   return themeName.toUpperCase()
  // }
  return null
}

export function isAddress(value) {
  try {
    return ethers.utils.getAddress(value.toLowerCase())
  } catch {
    return false
  }
}

export const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object 
