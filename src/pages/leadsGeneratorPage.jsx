import React from 'react';
import { useState } from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import useFilterLogic from '../utils/useFilterLogic';
import FilterPanel from '../components/filterPanel';
import ResultsList from '../components/resultList';
import FilterForm from '../components/filterForm';
import MapView from '../components/mapView';
import { getDistanceFromLatLonInKm } from '../utils/distance';

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

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const enhancedResults = results.map((r) => ({
    ...r,
    _distance: getDistanceFromLatLonInKm(userLat, userLng, r.latitude, r.longitude),
  }));
  const sortedResults = enhancedResults.sort((a, b) => {
    const aDist = a._distance ?? Infinity;
    const bDist = b._distance ?? Infinity;
    return aDist - bDist;
  });
  const limitedResults = sortedResults.slice(0,3);

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
      {/* Sidebar: Filter Panel */}
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
            <Box
            component={"img"}
            sx={{
              width:150,
              ml:.5,
              mb:.5
            }}
            src="\public\DCIDE Final Logo_Transparent.png"
            
            />
            
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
          padding: 1,
          boxSizing: 'border-box',
          height: '110%',
          overflow: 'hidden',
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {/* Pre-search Map (centered) */}
        {!searchDone && (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box
              sx={{
                mt: 1,
                height: '40vh',
                width: '45%',
                minHeight: '300px',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid #ccc',
                mb: 1,
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
        <Box sx={{ ml:5 }}>
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
          <Divider sx={{ my: 0.2 }} />
        </Box>

        {/* Post-search layout */}
        {searchDone && (
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              height: '100%',
              gap: 2,
              width: '100%',
            }}
          >
            {/* Center Panel: Map */}
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
                results={sortedResults.slice(0, 3)} //change the number of datapoints
                hoveredIndex={hoveredIndex}
              />
            </Box>

            {/* Right Panel: Results List */}
            <Box
              sx={{
                width: 375,
                backgroundColor: '#ffffff',
                padding: 2,
                borderRadius: 2,
                boxShadow: 1,
                overflowY: 'auto',
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {sortedResults.length} {sortedResults.length === 1 ? 'facility' : 'facilities'} found
              </Typography>
              <ResultsList 
                results={sortedResults}
                userLat={userLat}
                userLng={userLng}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex} 
                />
            </Box>
          </Box>
        )}

        {/* Form (only pre-search) */}
        {!searchDone && (
          <FilterForm
            form={form}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
      </Box>
    </Box>
  );
};

export default NewPage;
