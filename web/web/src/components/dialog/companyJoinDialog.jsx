import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, Stack, TextField, styled, CardHeader, Typography } from '@mui/material';
import React,{useEffect, useState} from 'react';
import { useSnackbar } from 'notistack';
import { isEmptyString, romanize } from '../../helpers/helper';
import { AddNewPosition } from '../../services/PositionService';
import { AddNewSkill } from '../../services/SkillService';
import { JobFairParticipants } from '../../services/JobFairScheduleService';
import VacantPositionDialog from './vacantPositionDialog';
import { Add } from '@mui/icons-material';
import { GetAllVacantPosition } from '../../services/VacantPositionService';
import PositionItem from '../comp/positionItems';

const CompanyJoinDialog = ({setDialog, data}) => {
    const [vacantPositionDialog, setPositionVactionDialog] = useState(false);
    const [postedVacantPosition, setPosetedVacantPositions] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        reloadList();
    },[])
    const reloadList = async () =>{
        setLoading(true);
        const res = await GetAllVacantPosition(data);
        setLoading(false);
        if(res.success){
            setPosetedVacantPositions(res.data);
        }
        
    }
    return(
        <Dialog open={true} fullWidth maxWidth='sm'>
            {vacantPositionDialog&&<VacantPositionDialog reloadList={reloadList} passdata={data} setDialog={setPositionVactionDialog}/>}
            <DialogTitle>
                Info
            </DialogTitle>
            <DialogContent>
                <Button startIcon={<Add/>} sx={{position:'absolute', top:10, right:20}} onClick={()=>setPositionVactionDialog(true)}>
                    Add Vacant Position
                </Button>
                {loading?<CircularProgress/>:
                <Box sx={{display:'flex', gap:1, flexDirection:'column'}}>
                    {
                        postedVacantPosition.map((x)=>(
                                            <PositionItem key={x.id} reloadList={reloadList} x={x}/>
                                        ))
                    }
                </Box>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setDialog(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default CompanyJoinDialog;