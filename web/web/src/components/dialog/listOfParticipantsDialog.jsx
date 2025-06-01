import { Avatar, Box, Button, Card, CardMedia, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, styled } from '@mui/material';
import React,{useEffect, useState} from 'react';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { isEmptyString } from '../../helpers/helper';
import { AddNewPosition } from '../../services/PositionService';
import { AddNewSkill } from '../../services/SkillService';
import { AcceptJobFair, JobFairParticipants } from '../../services/JobFairScheduleService';

const ListParticipantsDialog = ({setDialog, id}) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        loadParticipants();
    },[]);
    const loadParticipants = async () =>{
        const res = await JobFairParticipants({id:id});
        console.log(res);
        if(res.data)
        setCompanies(res.data);
    }
    const handleAccept = async (id) =>{
        console.log(id);
        setLoading(true);
        const res = await AcceptJobFair({id:id});
        setLoading(false);
        if(!res.success){
            enqueueSnackbar('Error while accepting', {variant:'error'});
            return;
        }
        loadParticipants();
    }
    return(
        <Dialog open={true} fullWidth maxWidth='sm'>
            <DialogTitle>
                List of Participants
            </DialogTitle>
            <DialogContent>
                <List>
                {companies.map(x=>
                    <ListItem divider key={x.id}>
                        <ListItemAvatar>
                            <Avatar  src={x.imagelocation} size='lg'/>
                        </ListItemAvatar>
                        <ListItemText>
                            {x.company}
                        </ListItemText>
                        {x.accept?
                        <ListItemButton disabled>
                            Accepted
                        </ListItemButton>
                        :
                        loading?
                            <CircularProgress size={20}/>:
                            <ListItemButton onClick={()=>{handleAccept(x.id)}}>
                            Accept
                        </ListItemButton>
                        }
                        
                    </ListItem>
                )}
                </List>
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
export default ListParticipantsDialog;