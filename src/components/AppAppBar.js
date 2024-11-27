import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MobileAppAppBar from './MobileAppAppBar';

import styles from './AppAppBar.module.css';

export default function AppAppBar() {
  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Container maxWidth="lg">
        <Toolbar className={styles.toolbar}>
          <Box className={styles.left}>
            <Box className={styles.desktopMenu}>
              <Button variant="text" color="info" size="small">
                Blog
              </Button>
            </Box>
          </Box>
          <Box className={styles.rightDesktop}>
            <Button color="primary" variant="contained" size="small">
              글쓰기
            </Button>
          </Box>
          <MobileAppAppBar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
