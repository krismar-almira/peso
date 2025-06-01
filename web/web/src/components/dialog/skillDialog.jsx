import { Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, styled } from '@mui/material';
import React,{useState} from 'react';
import { useSnackbar } from 'notistack';
import { isEmptyString } from '../../helpers/helper';
import { AddNewPosition } from '../../services/PositionService';
import { AddNewSkill } from '../../services/SkillService';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
const SkillDialog = ({setDialog}) => {
    const [currentData,setCurrentData] = useState({name:''});
    const [isSaving, setIsSaving] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    
    const handleSave = async () =>{
        setIsSaving(true);
        const res = await AddNewSkill(currentData);
        setIsSaving(false);
        if(!res.success){
            enqueueSnackbar('There was an error while saving. Please review and correct your input data.', {variant:'error'})
            return;
        }
        setCurrentData({name:''});
        enqueueSnackbar('Successfully saved.', {variant:'success'})

        // const exceptValidation = ['min_level', 'max_level'];
        // for (const [key, value] of Object.entries(currentData)) {
        //     console.log(key);
        //     if(exceptValidation.includes(key));
        //     else if(isEmptyString(value)){
        //         enqueueSnackbar(`${key.replace('_',' ').toLocaleUpperCase()} is empty`, {variant:'error'})
        //         return;
        //     }
        // }
        
        // setIsSaving(true);
        // const res = await AddNewPosition(currentData);
        // setIsSaving(false);
        // if(!res.success){
        //     if(typeof res.error.data != 'object'){
        //         enqueueSnackbar('There was an error while saving. Please review and correct your input data.', {variant:'error'})
        //         return;
        //     }
        //     for(const [key, value] of Object.entries(res.error.data)){
        //         enqueueSnackbar(value[0],{variant:'error'});
        //     }
        //     console.log(res.error);
        //     return;
        // }
        // setDialog(false);
    }
    return(
        <Dialog open={true} fullWidth maxWidth='sm'>
            <DialogTitle>
                Add new skill
            </DialogTitle>
            <DialogContent>
                <Box sx={{display:'flex', gap:.8,mt:1, flexDirection:'column'}}>
                    <TextField
                        fullWidth
                        label='Skill'
                        variant='filled'
                        helperText='C#, DotNet, PHP'
                        value={currentData.name}
                        onChange={(val)=>setCurrentData((prev)=>({...prev, name:val.target.value}))}
                    />
                   
                </Box>
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
export default SkillDialog;