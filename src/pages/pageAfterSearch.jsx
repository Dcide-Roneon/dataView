import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import useFilterLogic from '../utils/useFilterLogic';
import FilterPanel from '../components/filterPanel';
import ResultsList from '../components/resultList';
import FilterForm from '../components/filterForm';
import MapView from '../components/mapView'; // ensure correct path/casing

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
    userLng,
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
      {/* Sidebar: Filter Panel (only after search) */}
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
          <Box
            sx={{
              backgroundColor: '#faf9f6',
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <FilterPanel
              values={form}
              onChange={handleFilterChange}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
          </Box>
        </Box>
      )}

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#faf9f6',
          borderRadius: 2,
          boxShadow: 1,
          padding: 2,
          boxSizing: 'border-box',
          height: '100%',
          overflow: 'hidden',
          mt: 5,
          m: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Always-visible Map */}
       {/* Pre-search Map (only before results) */}
      {!searchDone && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}>
          <Box
            sx={{
              mt:5,
              height: '40vh',
              width: '45%',
              minHeight: '300px',
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid #ccc',
              mb: 2,
              
            }}
          >
            <MapView
              center={null}
              radius={null}
              results={[]}
              hoveredIndex={null}
            />
          </Box>
        </Box>
      )}


        {/* Page Title */}
        <Box sx={{ m: 2 }}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" gutterBottom sx={{ color: '#222428' }}>
              Data
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: '#222428' }}>
              Center
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: '#0f56fc' }}>
              Lead
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: '#222428' }}>
              Generator
            </Typography>
          </Stack>
          <Divider sx={{ my: 2 }} />
        </Box>

        {/* Conditional Content */}
        {!searchDone ? (
          <FilterForm
            form={form}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              height: '100%',
              gap: 2,
              width: '100%',
            }}
          >
            {/* Center Panel: Map again (fills central space below header) */}
            <Box
              sx={{
                flexGrow: 1,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 1,
                minHeight: '300px',
                height: '100%',
              }}
            >
              <MapView
                center={userLat && userLng ? [userLat, userLng] : null}
                radius={form.radius}
                results={results.slice(0, 3)}
                hoveredIndex={null}
              />
            </Box>

            {/* Right Panel: Results List */}
            <Box
              sx={{
                width: 350,
                backgroundColor: '#ffffff',
                padding: 2,
                borderRadius: 2,
                boxShadow: 1,
                overflowY: 'auto',
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {results.length} {results.length === 1 ? 'facility' : 'facilities'} found
              </Typography>
              <ResultsList results={results} userLat={userLat} userLng={userLng} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewPage;
