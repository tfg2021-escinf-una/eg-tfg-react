import { Toolbar,
         IconButton,
         Typography,
         MenuItem,
         Menu } from "@mui/material";
import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { StyledAppBar } from './AppBar.styles';

export interface AppBarProps {
  isAuthenticated : boolean,
  title : string,
  handleClose? : () => void,
};

export const AppBar = ({
  isAuthenticated = false,
  title = ""
} : AppBarProps) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <StyledAppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          { title }
        </Typography>
        {
          isAuthenticated && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Sign out</MenuItem>
              </Menu>
            </div>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}
