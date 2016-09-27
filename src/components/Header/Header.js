import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'
import Alerts from '../../containers/Alerts'

export const Header = () => (
  <div>
    <Alerts />
    <h1>Genetics Diagnostics App</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/gavin/patient_zero' activeClassName={classes.activeRoute}>
      Gavin
    </Link>
  </div>

)

export default Header
