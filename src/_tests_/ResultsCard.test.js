import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsCard from '../components/ResultsCard';

describe ('ResultsCard', () =>{
    it('renders company name and distance', () => {
        const row ={
            company: 'Fentigo Enterprises',
            latitude: 34.06,
            longitude: -118.25,
            _distance: 42.2,
            certifications: [],
            employee_count: 500,
            cloud_spend: 100000,
            industry: 'Defense',
            contact_details: 'skynet@cyberdyne.com',
            use_cases: 'AI Research'
        };

        render(<ResultsCard row={row} userLat={34.06} userLng={-118.25}/>);
        expect(screen.getByText(/Fentigo Enterprises/i)).toBeInTheDocument();
        expect(screen.getByText(/AI Research/i)).toBeInTheDocument();
        expect(screen.getByText(/Defense/i)).toBeInTheDocument();     
    });
});