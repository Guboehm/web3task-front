import { useRef, useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
        background-color: #5B149D;
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: center;
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

function HeaderUserConnect({ connectors, activeConnector, connect, isConnecting, pendingConnector }) {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen} sx={{ ml: 1 }}>
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel fontSize="16px" >Connect wallet</UserBoxLabel>
          </UserBoxText>
        </Hidden>
      </UserBoxButton>
      <Popover
        sx={{ mr: 1 }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        style={{ marginTop: '5px' }}
      >
        <List sx={{ p: 1 }} component="nav">
          {
            connectors
              .map((connector) => (
                <ListItem button to="/" key={connector.id} onClick={() => connect({ connector })} component={NavLink}>
                  <ListItemText primary={connector.name || (isConnecting && connector.id === pendingConnector?.id && ' (connecting)')} />
                </ListItem>
              ))
          }
        </List>
      </Popover>
    </>
  );
}

export default HeaderUserConnect;
