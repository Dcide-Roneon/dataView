import {Card, CardContent, Typography,  Chip, Stack} from "@mui/material";
import React from "react";

const ResultCard = ({ row} ) => {
    return(
        <Card sx={{ mb:2 }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    {row.company}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {row.latitude}, {row.longitude}
                </Typography>

                <Stack direction="row" spacing={2}
                sx={{my: 1, flexWrap: "wrap"}}>
                    <Chip label={ 'Capacity: $[row.capacity} MW'}/>
                </Stack>
            </CardContent>
        </Card>

    );
};

export default ResultCard;