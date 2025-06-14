import { Avatar, Box, Button, Card, CardMedia, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, styled } from '@mui/material';
import React,{useEffect, useState} from 'react';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { isEmptyString } from '../../helpers/helper';
import { AddNewPosition } from '../../services/PositionService';
import { AddNewSkill } from '../../services/SkillService';
import { AcceptJobFair, JobFairParticipants } from '../../services/JobFairScheduleService';
import Nsrp1ListDialog from './nsrp1ListDialog';

const ParticipantsDialog = ({setDialog, id}) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nsrpDialog, setNsrpDialog] = useState(false);
    useEffect(()=>{
        loadParticipants();
    },[]);
    const loadParticipants = async () =>{
        const res = await JobFairParticipants({id:id});
        console.log(res);
        if(res.data)
        setCompanies(res.data);
    }
    return(
        <Dialog open={true} fullWidth maxWidth='md'>
            {nsrpDialog&&<Nsrp1ListDialog event_id={id} setDialog={setNsrpDialog}/>}
            <DialogTitle>
                List of Participants
            </DialogTitle>
            <DialogContent>
                <Button onClick={()=>setNsrpDialog(true)}>Add</Button>
                {/* {companies.map(x=>
                    (<Chip key={x.id} avatar={<Avatar src={x.imagelocation}/>} size='lg' label={x.company}/>)
                )} */}
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setDialog(false)}>
                    Close
                </Button>
                
            </DialogActions>
        </Dialog>
    )
}
export default ParticipantsDialog;