import { Avatar, Box, Button, Card, CardMedia, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, styled } from '@mui/material';
import React,{useEffect, useState} from 'react';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { isEmptyString } from '../../helpers/helper';
import { AddNewPosition } from '../../services/PositionService';
import { AddNewSkill } from '../../services/SkillService';
import { AcceptJobFair, JobFairParticipants } from '../../services/JobFairScheduleService';
import Nsrp1ListDialog from './nsrp1ListDialog';
import { DeleteEmployerJobFairSchedule, GetEmployeerToJobFairSchedule } from '../../services/CompanyService';
import { Delete, Preview } from '@mui/icons-material';
import Nsrp1Dialog from './nsrp1Dialog';

const ParticipantsDialog = ({setDialog, id}) => {
    const [companies, setCompanies] = useState([]);
    const [compnayJoined, setCompanyJoined] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nsrpDialog, setNsrpDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [selectedEmployer, setSelectedEmployer] = useState();
    const [previewDialog, setPreviewDialog] = useState(false);
    useEffect(()=>{
        // loadParticipants();
        reloadList();
    },[]);
    const loadParticipants = async () =>{
        const res = await JobFairParticipants({id:id});
        console.log(res);
        if(res.data)
        setCompanies(res.data);
    }
    const reloadList = async () =>{
        const res = await GetEmployeerToJobFairSchedule({job_fair_schedule_id:id});
        if(res.success){
            enqueueSnackbar('Reloaded',{variant:'success'});
            setCompanyJoined(res.data);
        }
    }
    const handlePreview = (id) =>{
        setSelectedEmployer(compnayJoined.find(x=>x.id===id)?.employeer);
        setPreviewDialog(true);
    }
    const handleDelete = async (id) =>{
        const res = await DeleteEmployerJobFairSchedule({id:id});
        if(res.success){
            enqueueSnackbar('Removed',{variant:'success'});
        }
        reloadList();
    }
    return(
        <Dialog open={true} fullWidth maxWidth='md'>
            {nsrpDialog&&<Nsrp1ListDialog event_id={id} setDialog={setNsrpDialog}/>}
            {previewDialog&&<Nsrp1Dialog data={selectedEmployer} setDialog={setPreviewDialog}/>}
            <DialogTitle>
                List of Participants
            </DialogTitle>
            <DialogContent>
                <Button onClick={()=>setNsrpDialog(true)}>Add</Button>
                <Button onClick={()=>reloadList(true)}>Reload</Button>
                <List>
                    {
                        compnayJoined.map(y=>(
                            <ListItem
                                secondaryAction={
                                    <>
                                        <IconButton onClick={()=>handlePreview(y.id)}>
                                            <Preview/>
                                        </IconButton>
                                        <IconButton  onClick={()=>handleDelete(y.id)}>
                                            <Delete/>
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary={y.employeer.establishment}
                                />
                            </ListItem>
                        ))
                    }
                </List>
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