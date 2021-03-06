import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { makeStyles } from '@mui/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// one day your journey will become someones survival guide

import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
  const { children } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
  },
  logo: {
    height: '3.5em',
    margin: '0.5em',
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
  menu: {
    backgroundColor: theme.palette.common.purple,
    color: 'white',
    borderRadious: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
}))

export default function Header(props) {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleChange = (e, value) => {
    setValue(value)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null)
    setOpen(false)
    setSelectedIndex()
  }

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpen(false)
  }

  const menuOptions = [
    { name: 'Courses', link: '/courses' },
    { name: 'FrontEnd Bootcamp', link: '/frontend-bootcamp' },
    { name: 'BackEnd Bootcamp', link: '/backend-bootcamp' },
    { name: 'FullStack Bootcamp', link: '/fullstack-bootcamp' },
  ]

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0)
    } else if (window.location.pathname === '/courses' && value !== 1) {
      setValue(1)
    } else if (window.location.pathname === '/services' && value !== 2) {
      setValue(2)
    } else if (window.location.pathname === '/about' && value !== 3) {
      setValue(3)
    } else if (window.location.pathname === '/contactus' && value !== 4) {
      setValue(4)
    }
  }, [value])

  return (
    <>
      <ElevationScroll>
        <AppBar
          position='fixed'
          color='success'
          text='secondary'
          sx={{
            color: 'white',
            fontSize: 19,
            fontWeight: '700',
          }}
        >
          <Toolbar disableGutters>
            <Button
              component={Link}
              disableRipple
              to='/'
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img alt='company logo' className={classes.logo} src={logo} />
            </Button>
            <Tabs
              value={value}
              className={classes.tabContainer}
              onChange={handleChange}
              indicatorColor='success'
            >
              <Tab
                className={classes.tab}
                component={Link}
                to='/'
                label='Home'
              />
              <Tab
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup={anchorEl ? 'true' : undefined}
                className={classes.tab}
                onClick={(event) => handleClick(event)}
                onMouseOver={(event) => handleClick(event)}
                component={Link}
                to='/courses'
                label='Courses'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='/services'
                label='Services'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='/about'
                label='Why AlienRoom'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='/contactus'
                label='Contact Us'
              />
            </Tabs>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
            >
              Free Estimated
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              classes={{ paper: classes.menu }}
              MenuListProps={{
                onMouseLeave: handleClose,
              }}
              elevation={0}
            >
              {menuOptions.map((option, index) => (
                <MenuItem
                  key={option}
                  component={Link}
                  to={option.link}
                  classes={{ root: classes.menuItem }}
                  onClick={(event) => {
                    handleMenuItemClick(event, index)
                    setValue(1)
                    handleClose()
                  }}
                  selected={index === selectedIndex && value === 1}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  )
}
