import { Avatar, Badge, Container, IconButton, InputBase, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { Nav, Paper, Profile } from "./style"
import { useRegister } from "../../context/context";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState, useRef } from "react";
const Navbar = () => {

  const { user, search, setSearch } = useRegister();
  const [isLog, setIsLog] = useState(user.key)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    window.localStorage.removeItem("user");
    handleClose();
    setIsLog(null);
  }

  const searchRef = useRef();

  const enter = () => {
    searchRef.current.src = "/icons/search-dark.svg"
  }
  const leave = () => {
    searchRef.current.src = "/icons/search.svg"
  }

  const onSearch = (e) => {
    setSearch(e.target.value)
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: '-1px',
        left: '-1px',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  return (
    <Container>
      <Nav>
        <Link to={"/"}>
          <img src="/icons/logo.svg" alt="" />
        </Link>
        <Paper onMouseEnter={enter} onMouseLeave={leave}>
          <IconButton sx={{ p: '10px' }} aria-label="menu">
            <img ref={searchRef} src="/icons/search.svg" alt="" />
          </IconButton>
          <InputBase
            onChange={onSearch}
            value={search}
            sx={{ ml: 1, flex: 1, color: 'gray' }}
            placeholder="Search books"
            inputProps={{ 'aria-label': 'search books' }}
          />
          {
            search &&
            <IconButton aria-label="menu" onClick={() => setSearch('')}>
              <CancelIcon />
            </IconButton>
          }
        </Paper>

        <Profile>
          {
            isLog ?
              <>
                <IconButton>
                  <img src="/icons/bell.svg" alt="" />
                </IconButton>

                <IconButton
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt="emy Sharp" src="/imgs/avatar.png" />
                  </StyledBadge>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem disabled color="success" divider selected>{user.name}</MenuItem>
                  <MenuItem onClick={logout} color="error" sx={{color: 'rgb(211, 47, 47)'}}>Log out</MenuItem>
                </Menu>
              </> :
              <>
                <Link to="/signin" className="link">Sign in</Link>
                <Link to="/signup" className="link">Register</Link>
              </>
          }
        </Profile>
      </Nav>
    </Container>
  );
};

export default Navbar;
