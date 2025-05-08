import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import FormContainer from "../components/FormContainer";


const Home = () => {
    return(
        <Container maxwidth="md" sx={{mt:6}}>
        <Typography variant='h4' gutterBottom>
            Data Center Lead Generator
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            Enter facility details to generate qualified leads
        </Typography>
        <Paper elevation={3} sx={{p: 4, mt: 3, borderRadius: 2}}>
            <Typography variant="h6" gutterBottom>
                Facility Information
            </Typography>
            <FormContainer />     
        </Paper>
    </Container>
    );
};
export default Home;