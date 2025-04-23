import { CellWifiOutlined, CloudUpload } from '@mui/icons-material';
import { Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, styled } from '@mui/material';
import React,{useState} from 'react';
import { SaveNewCompany } from '../../services/CompanyService';
import { useSnackbar } from 'notistack';
import { isEmptyString } from '../../helpers/helper';
import { AddNewPosition } from '../../services/PositionService';
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
const PositionDialog = ({setDialog}) => {
    const [currentData,setCurrentData] = useState({name:'',min_level:null,max_level:null});
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setCurrentData(prev=>({...prev, image:base64String}));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleRemove = () => {
        setImage(null);
        setPreview(null);
    };
    const handleSave = async () =>{
        
        const exceptValidation = ['min_level', 'max_level'];
        for (const [key, value] of Object.entries(currentData)) {
            console.log(key);
            if(exceptValidation.includes(key));
            else if(isEmptyString(value)){
                enqueueSnackbar(`${key.replace('_',' ').toLocaleUpperCase()} is empty`, {variant:'error'})
                return;
            }
        }
        
        setIsSaving(true);
        const res = await AddNewPosition(currentData);
        setIsSaving(false);
        if(!res.success){
            if(typeof res.error.data != 'object'){
                enqueueSnackbar('There was an error while saving. Please review and correct your input data.', {variant:'error'})
                return;
            }
            for(const [key, value] of Object.entries(res.error.data)){
                enqueueSnackbar(value[0],{variant:'error'});
            }
            console.log(res.error);
            return;
        }
        setDialog(false);
    }
    return(
        <Dialog open={true} fullWidth maxWidth='sm'>
            <DialogTitle>
                Position - Responsibilities
            </DialogTitle>
            <DialogContent>
                <Box sx={{display:'flex', gap:.8,mt:1, flexDirection:'column'}}>
                    <TextField
                        fullWidth
                        label='Position'
                        variant='filled'
                        value={currentData.name}
                        onChange={(val)=>setCurrentData((prev)=>({...prev, name:val.target.value}))}
                    />
                    <Stack direction='row' gap={1}>
                    <TextField
                        fullWidth
                        label='Min Level'
                        variant='filled'
                        type='number'
                        value={currentData.min_level}
                        helperText='Programmer I'
                        onChange={(val)=>setCurrentData((prev)=>({...prev, min_level:val.target.value}))}
                    />
                    
                    <TextField
                        fullWidth
                        label='Max Level'
                        type='number'
                        variant='filled'
                        value={currentData.max_level}
                        helperText='Programmer IV'
                        onChange={(val)=>setCurrentData((prev)=>({...prev, max_level:val.target.value}))}
                    />
                    </Stack>
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
export default PositionDialog;