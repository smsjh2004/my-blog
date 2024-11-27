import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { MobileAppAppBar } from './MobileAppAppBar';
import styles from './AppAppBar.module.css'; // CSS Module import

export default function AppAppBar() {
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      className={styles.appAppBar}
    >
      <Container maxWidth="lg">
        <Toolbar className={styles.styledToolbar}>
          <Box className={styles.toolbarLeft}>
            <Box className={styles.toolbarLeftHidden}>
              <Button variant="text" color="info" size="small" className={styles.blogButton}>
                Blog
              </Button>
            </Box>
          </Box>
          <Box className={styles.toolbarRight}>
            <Button color="primary" variant="contained" size="small" className={styles.writeButton}>
              글쓰기
            </Button>
          </Box>
          <MobileAppAppBar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
