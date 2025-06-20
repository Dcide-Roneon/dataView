import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import useFilterLogic from '../utils/useFilterLogic';
import FilterPanel from '../components/filterPanel';
import ResultsList from '../components/resultList';
import FilterForm from '../components/filterForm';

const NewPage = () => {
  const {
    form,
    errors,
    searchDone,
    results,
    handleChange,
    handleSubmit,
    handleReset,
    handleFilterChange,
    userLat,
    userLng
  } = useFilterLogic();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'whitesmoke',
        padding: 2,
        gap: 2,
        boxSizing: 'border-box',
      }}
    >
      {/* Sidebar */}
      {searchDone && (
        <Box
          sx={{
            width: '350px',
            backgroundColor: 'whitesmoke',
            padding: 2,
            borderRadius: 2,
            boxShadow: 2,
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Box sx={{
            backgroundColor: '#faf9f6',
            padding:2,
            borderRadius:2,

          }}>
            <Typography variant="h8" gutterBottom>Filters</Typography>
            <FilterPanel
              values={form}
              onChange={handleFilterChange}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
          </Box>
        </Box>
      )}

      {/* Main Content */}
      
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#faf9f6',
          borderRadius: 2,
          boxShadow:1,
          padding: 2,
          boxSizing: 'border-box',
          height: '100%',
          overflowY: 'auto',
          mt:5,
          m:3
        }}
      >

        
      <Box sx={{ m:2 
      }} >
        <Stack direction="row" spacing={1}>
          <Typography variant='h5' gutterBottom sx={{
            color:'#222428'}}>
              Data 
          </Typography>
          <Typography variant='h5' gutterBottom sx={{
            color:'#222428'}}>
              Center 
          </Typography>
          <Typography variant='h5' gutterBottom sx={{
            color:'#0f56fc'}}>
              Lead
          </Typography>
          <Typography variant='h5' gutterBottom sx={{
            color:'#222428'}}>
              Generator
          </Typography>
        </Stack>
        <Divider sx={{ my: 2 }} />
        
      </Box>
        {!searchDone ? (
          <FilterForm
            form={form}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            />
            ) : (
              <>
              <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {results.length} {results.length === 1 ? 'facility' : 'facilities'} found
                </Typography>
              </Box>
                <ResultsList results={results} userLat={userLat} userLng={userLng} />
              </>
            )
          }
      </Box>
    </Box>
  );
};

export default NewPage;
