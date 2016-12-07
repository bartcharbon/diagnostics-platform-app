import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'
import AlertsContainer from '../../containers/AlertsContainer'

export const Header = () => (
  <div>
    <AlertsContainer />
    <h1>Genetics Diagnostics App</h1>
  </div>

)

export default Header
