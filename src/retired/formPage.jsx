import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import FormContainer from "../components/FormContainer";
import FilterFormContainer from '../components/filterFormContainer';
import { green } from '@mui/material/colors';

const FormPage = () =>{
    return(
        <Box
            sx={{
                minHeight: '100vh', //makes it take the full screen height
                width: '100vw',
                backgroundColor: '#F5F5F5',
                display: 'flex',
                justifyContent: 'center',
                alignItems:'Center', // centers content horizontally and vertically
                padding: 4, //space around the box
            }}
        >
            <Container //my form box
                maxWidth="sm" //responsive
                sx={{
                    backgroundColor:' #FAF9F6',
                    borderRadius: 1,//rounded corners!
                    padding: 3,
                    boxShadow: 3,
                    
                }}
            >
                <Box >
                    <Stack direction="row" spacing={1}>
                        
                        <Typography variant='h4' gutterBottom sx={{
                            color:'#222428'
                        }}>
                            Data Center 
                        </Typography>
                        <Typography variant='h4' gutterBottom sx={{
                            color:'#0f56fc'
                        }}>
                            Lead
                        </Typography>
                        <Typography variant='h4' gutterBottom sx={{
                            color:'#222428'
                        }}>
                            Generator
                        </Typography>
                    </Stack>
                </Box>
                <Box maxWidth="sm"
                sx={{
                    padding:3,
                    backgroundColor:"white",
                    borderRadius:3,
                    boxShadow:1
                    
                }}>
                    <FilterFormContainer/>
                </Box>
                
            </Container>
        </Box>
    );
};

export default FormPage;