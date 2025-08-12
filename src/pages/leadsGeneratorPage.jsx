import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import FormContainer from '../components/FormContainer';
import styles from '../styles/NewPage.module.css';

const NewPage = () => {
  return (
    <Box className={styles.pageContainer}>
    <Box
      component="img"
      className={styles.logo}
      src="/DCIDE Final Logo_Transparent.png"
      alt="DCIDE Logo"
      />
      {/* Page Title */}
      <Box className={styles.pageTitle}>
        <Stack direction="row" spacing={1}>
          <Typography variant="h5" gutterBottom className={styles.darkText}>
            Data
          </Typography>
          <Typography variant="h5" gutterBottom className={styles.darkText}>
            Center
          </Typography>
          <Typography variant="h5" gutterBottom className={styles.highlightText}>
            Lead
          </Typography>
          <Typography variant="h5" gutterBottom className={styles.darkText}>
            Generator
          </Typography>
        </Stack>
        <Divider className={styles.divider} />
      </Box>

      {/* Core UI Component */}
      <FormContainer />
    </Box>
  );
};

export default NewPage;
