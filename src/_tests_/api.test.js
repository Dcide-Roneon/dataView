import { fetchFilteredLeads } from "../utils/api";

beforeEach(() =>{
    fetch.resetMocks();
});

describe('fetchFilteredLeads (Xano)', () => {
    it('returned filtered data from Xano', async() => {
        const mockResponse = [
            {
                id: 1,
                company: 'XanoCorp',
                latitude: 40.7128,
                longitude: -74.0060,
                capacity: 100,
                certifications: ['ISO27001'],
                industry: 'Finance',
            },
        ];

        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const form = {
            latitude: '40.7128',
            longitude: '-74.0060',
            radius: '1000',
            certifications: [],
        }; 
        
        const data = await fetchFilteredLeads(form);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(data).toEqual(mockResponse);
    });

    it('handles empty response', async () => {
        fetch.mockResponseOnce(JSON.stringify([]));

        const form = {
            latitude: '0',
            longitude: '0',
            radius: '1',
            certifications: [],
        };

        const data = await fetchFilteredLeads(form);
        expect(data).toEqual([]);
    });
})