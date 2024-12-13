import * as React from 'react';
import Container from '@mui/material/Container';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import Latest from '../components/Latest';
import Pagination from '../components/Pagenation';

// import { AppAppBar, Footer, MainContent, Latest } from '../components';

function Blog() {
    return (
        <div>
        {/* <AppAppBar /> */}
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
        >
          <MainContent />
        </Container>
        <Footer />
        </div>
    )
}

export default Blog