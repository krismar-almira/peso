import { Avatar, Box, Button, Card, CardMedia, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography, styled } from '@mui/material';
import React,{useEffect, useState} from 'react';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { isEmptyString, localizeTime } from '../../helpers/helper';
import { AddNewPosition } from '../../services/PositionService';
import { AddNewSkill } from '../../services/SkillService';
import { AcceptJobFair, JobFairParticipants } from '../../services/JobFairScheduleService';

const Nsrp1Dialog = ({setDialog, data}) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const {
        establishment,
        business_address,
        industry_classification,
        business_type,
        contact_person,
        designation,
        contact_number,
        email_address,
        confirmed,
        vacant_positions = [],
        created_at,
        updated_at
    } = data;
    // useEffect(()=>{
    //     loadParticipants();
    // },[]);
    // const loadParticipants = async () =>{
    //     const res = await JobFairParticipants({id:id});
    //     console.log(res);
    //     if(res.data)
    //     setCompanies(res.data);
    // }
    // const handleAccept = async (id) =>{
    //     console.log(id);
    //     setLoading(true);
    //     const res = await AcceptJobFair({id:id});
    //     setLoading(false);
    //     if(!res.success){
    //         enqueueSnackbar('Error while accepting', {variant:'error'});
    //         return;
    //     }
    //     loadParticipants();
    // }
    return(
        <Dialog open={true} fullWidth maxWidth='sm'>
            <DialogTitle>
                NSRP 1
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography><strong>Establishment:</strong> {establishment}</Typography>
                    <Typography><strong>Business Address:</strong> {business_address}</Typography>
                    <Typography><strong>Industry Classification:</strong> {industry_classification}</Typography>
                    <Typography><strong>Business Type:</strong> {business_type}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography><strong>Contact Person:</strong> {contact_person}</Typography>
                    <Typography><strong>Designation:</strong> {designation}</Typography>
                    <Typography><strong>Contact Number:</strong> {contact_number}</Typography>
                    <Typography><strong>Email Address:</strong> {email_address}</Typography>
                </Grid>
                </Grid>

                <Box mt={2}>
                    <Typography variant="subtitle1"><strong>Confirmed:</strong> {confirmed ? "Yes" : "No"}</Typography>
                    <Typography><strong>Created At:</strong> {new Date(created_at).toLocaleString()} {localizeTime(created_at)}</Typography>
                    <Typography><strong>Updated At:</strong> {new Date(updated_at).toLocaleString()}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {vacant_positions.map((position, index) => (
                <Box key={index} mb={3}>
                    <Typography variant="h6">Vacant Position #{index + 1}</Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography><strong>Position Title:</strong> {position.positionTitle}</Typography>
                        <Typography><strong>Salary:</strong> {position.salary}</Typography>
                        <Typography><strong>Preferred Sex:</strong> {position.preferred_sex}</Typography>
                        <Typography><strong>Age Requirement:</strong> {position.age_requirement}</Typography>
                        <Typography><strong>Employment Status:</strong> {position.employment_status}</Typography>
                        <Typography><strong>Place of Assignment:</strong> {position.placeOfAssignment}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography><strong>Job Description:</strong> {position.job_description}</Typography>
                        <Typography><strong>License Eligibility:</strong> {position.license_eligibility}</Typography>
                        <Typography><strong>No. of Vacancies:</strong> {position.number_of_Vacancies}</Typography>
                        <Typography><strong>Duration of Employment:</strong> {position.duration_of_employment}</Typography>
                        <Typography><strong>Education:</strong></Typography>
                        {position.education.map((edu, i) => <Chip key={i} label={edu} size="small" sx={{ mr: 1, mt: 0.5 }} />)}

                        <Typography sx={{ mt: 1 }}><strong>Skills Required:</strong></Typography>
                        {position.skills_required.map((skill, i) => <Chip key={i} label={skill} size="small" sx={{ mr: 1, mt: 0.5 }} />)}

                        <Typography sx={{ mt: 1 }}><strong>Language/Dialect:</strong></Typography>
                        {position.language_dialect.map((lang, i) => <Chip key={i} label={lang} size="small" sx={{ mr: 1, mt: 0.5 }} />)}
                    </Grid>
                    </Grid>
                    <Divider sx={{ mt: 2 }} />
                </Box>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setDialog(false)}>
                    Close
                </Button>
                
            </DialogActions>
        </Dialog>
    )
}
export default Nsrp1Dialog;