import { Box } from '@mui/material';
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';

const CompanyPosting = () => {
    const [searchParams, setSearchParams] = useSearchParams();
       const query = searchParams.get('q');
    return (
        <Box>
            
        </Box>
    );
}
export default CompanyPosting;