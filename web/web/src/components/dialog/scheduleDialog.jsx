import { CellWifiOutlined, CloudUpload } from '@mui/icons-material';
import { Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, styled } from '@mui/material';
import React,{useState} from 'react';
import { SaveNewCompany } from '../../services/CompanyService';
import { useSnackbar } from 'notistack';
import { isEmptyString } from '../../helpers/helper';
import { AddNewPosition } from '../../services/PositionService';
import noimage from '../../assets/noimage.svg'
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { SaveNewJobFairSchedule } from '../../services/JobFairScheduleService';

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
const ScheduleDialog = ({setDialog}) => {
    const [isSaving, setIsSaving] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [currentData, setCurrentData] = useState({theme:'', image:'', venue:'', event_date:dayjs(),end_event_date:dayjs()});
    const [image, setImage] = useState(noimage);
    const [preview, setPreview] = useState(noimage);
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
        console.log(currentData);
        setIsSaving(true);
        const res = await SaveNewJobFairSchedule(currentData);
        setIsSaving(false);
        if(!res.success){
            enqueueSnackbar('Encounter error while saving', {variant:'error'});
            return;
        }
        enqueueSnackbar('Saved', {variant:'success'});
        setDialog(false);
    }
    return(
        <Dialog open={true} fullWidth maxWidth='md'>
            <DialogTitle>
                NEW JOB FAIR SCHEDULE
            </DialogTitle>
            <DialogContent>
                <Box sx={{display:'flex',pt:1, gap:1}}>
                    <Box sx={{flex:1, flexDirection:'column', display:'flex', gap:0.5}}>
                        {preview&&
                        (<Card sx={{ width:'100%' }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={preview}
                                alt="Preview"
                            />
                        </Card>)
                        }
                        {preview && (
                            <Button sx={{mt:1}} size="small" variant="outlined" color="error" onClick={handleRemove}>
                                Remove
                            </Button>
                        )}
                        <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        size='small'
                        startIcon={<CloudUpload />}
                        >
                            Theme
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>
                    </Box>
                    <Box sx={{flex:1, flexDirection:'column', display:'flex', gap:1}}>
                        <TextField
                        label="Theme"
                        multiline
                        rows={5}
                        value={currentData.theme}
                        onChange={(val)=>setCurrentData(prev=>({...prev, theme:val.target.value}))}
                        />
                        <TextField
                        label="Venue"
                        value={currentData.venue}
                        onChange={(val)=>setCurrentData(prev=>({...prev, venue:val.target.value}))}
                        />
                        <DatePicker
                        label='Event Date'
                        value={currentData.event_date}
                        onChange={(val)=>setCurrentData(prev=>({...prev, event_date:val}))}
                        />
                        <DatePicker
                        label='Event End'
                        minDate={currentData.event_date}
                        value={currentData.end_event_date}
                        onChange={(val)=>setCurrentData(prev=>({...prev, end_event_date:val}))}
                        />
                    </Box>
                    
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
export default ScheduleDialog;