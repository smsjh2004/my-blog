import * as React from 'react';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box } from '@mui/material';


export default function MobileAppAppBar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    return (
        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="top"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              top: 'var(--template-frame-height, 0px)',
            },
          }}
        >
          <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton onClick={toggleDrawer(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            <MenuItem>Blog</MenuItem>
            <Divider sx={{ my: 3 }} />
            <MenuItem>
              <Button color="primary" variant="outlined" fullWidth>
                글쓰기
              </Button>
            </MenuItem>
          </Box>
        </Drawer>
      </Box>
    )
}