import { Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, styled } from '@mui/material';
import React,{useEffect, useState} from 'react';
import { useSnackbar } from 'notistack';
import { isEmptyString } from '../../helpers/helper';
import { AddNewSkill } from '../../services/SkillService';
import { getAllEducationLevel, saveEducationalAttainement } from '../../services/EducationService';

const EducationDialog = ({setDialog}) => {
    const [currentData,setCurrentData] = useState({name:'', education_level_id:3});
    const [isSaving, setIsSaving] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [educationLevels, setEducationLevels] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        init()
    },[]);
    const init = async () => {
        setLoading(true)
        await pullEducationLevel();
        setLoading(false)
    }
    const pullEducationLevel =  async () =>{
        const res = await getAllEducationLevel();
        if(res.success)setEducationLevels(res.data);
    }
    const handleSave = async () =>{
        setIsSaving(true);
        const res = await saveEducationalAttainement(currentData);
        setIsSaving(false);
        if(!res.success){
            enqueueSnackbar('There was an error while saving. Please review and correct your input data.', {variant:'error'})
            return;
        }
        setCurrentData({education_level_id:3,name:''})
        enqueueSnackbar('Successfully saved.', {variant:'success'})
    }
    return(
        <Dialog open={true} fullWidth maxWidth='sm'>
            <DialogTitle>
                Education
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label='Education'
                    variant='filled'
                    helperText='BS Accounting, BS Compute Science'
                    value={currentData.name}
                    onChange={(val)=>setCurrentData((prev)=>({...prev, name:val.target.value}))}
                />
                <FormControl variant='filled' fullWidth>
                    <InputLabel>Educational Level</InputLabel>
                    <Select
                       label='Educational Level'
                       value={currentData.education_level_id}
                       onChange={(val)=>setCurrentData(prev=>({...prev, education_level_id:val}))}
                    >
                        {educationLevels.map(x=>
                            <MenuItem value={x.id}>{x.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setDialog(false)}>
                    Close
                </Button>
                <Button onClick={handleSave} loading={isSaving}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default EducationDialog;