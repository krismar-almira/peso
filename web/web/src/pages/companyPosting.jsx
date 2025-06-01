import { Avatar, Box, Button, Divider, Paper, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';
import { GetCompanyById } from '../services/CompanyService';
import { useSnackbar } from 'notistack';
import { useAuthProvider } from '../context/authContext';
import { green, orange } from '@mui/material/colors';
import { PieChart } from '@mui/x-charts/PieChart';
import VacantPositionDialog from '../components/dialog/vacantPositionDialog';
import { Add, Start } from '@mui/icons-material';
import UserDialog from '../components/dialog/userDialog';

const CompanyPosting = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCompany, setSelectedCompany] = useState();
    const [dialog, setDialog] = useState(false);
    const company = searchParams.get('company');

    const {enqueueSnackbar} = useSnackbar();
    const {user} = useAuthProvider();
    useEffect(()=>{
        if(company)LoadCompany(company);
        else LoadCompany(user.company_id);
    },[company]);
    const LoadCompany = async (id) =>{
        const res = await GetCompanyById({id:id});
        if(!res.success){
            enqueueSnackbar('Error while loading company',{variant:'error'});
            return;
        }
        setSelectedCompany(res.data);
    }
    return (
        <Box>
            {dialog&&<VacantPositionDialog company_id={selectedCompany?.id} setDialog={setDialog}/>}
            <Paper sx={{p:2, display:'flex'}}>
                <Box sx={{flex:1, display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <Avatar sx={{width:100, height:100}} src={selectedCompany?.imagelocation}/>
                    <Typography sx={{mt:1, fontFamily:'Graduate', fontWeight:600, fontStyle:'400'}} variant="h5" color="initial">{selectedCompany?.name}</Typography>
                </Box>
                <Divider orientation='vertical' flexItem />
                <Box sx={{flex:2, pl:2}}>
                <Typography sx={{mt:1, fontWeight:500}} variant="body1" color="initial">Description</Typography>
                    <Typography variant="body1" color="initial">{selectedCompany?.description}</Typography>
                    <Typography sx={{mt:1, fontWeight:500}} variant="body1" color="initial">Address:</Typography>
                    <Typography variant="body1" color="initial">{selectedCompany?.address}</Typography>
                </Box>
            </Paper>
            
            <Paper sx={{ p:2, display:'flex', flexDirection:'column', mt:2}}>
                <Typography sx={{mb:1}} color="initial">Vacant Position Posting:</Typography>
                <Button sx={{mb:2}} size='small' variant='contained' startIcon={<Add/>} onClick={()=>{setDialog(true)}}>
                    Add
                </Button>
                <Paper elevation={1} sx={{width:'100%', px:1, py:1.5, bgcolor:'#eeeeee', borderLeft:6, borderColor:orange[500]}}>
                    <Typography variant="body1" color="initial">Programmer 1</Typography>
                    <Box>
                        <PieChart
                            series={[
                                {
                                data: [
                                    { id: 0, value: 1, label: '100% qualified' },
                                    { id: 1, value: 2, label: '>50% <80%  qaulified' },
                                ],
                                },
                            ]}
                            width={70}
                            height={70}
                        />
                    </Box>
                </Paper>
            </Paper>
        </Box>
    );
}
export default CompanyPosting;