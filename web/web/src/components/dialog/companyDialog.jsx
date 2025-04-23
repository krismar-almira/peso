import { CellWifiOutlined, CloudUpload } from '@mui/icons-material';
import { Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, TextField, styled } from '@mui/material';
import React,{useState} from 'react';
import { SaveNewCompany } from '../../services/CompanyService';
import { useSnackbar } from 'notistack';
import { isEmptyString } from '../../helpers/helper';
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
const CompanyDialog = ({setDialog}) => {
    const [currentData,setCurrentData] = useState({name:'',description:'',address:'',image:''});
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
        for (const [key, value] of Object.entries(currentData)) {
            if(isEmptyString(value)){
                enqueueSnackbar(`${key.replace('_',' ').toLocaleUpperCase()} is empty`, {variant:'error'})
                return;
            }
        }
        if(!preview){
            enqueueSnackbar('Please add company logo.', {variant:'error'})
            return;
        }
        setIsSaving(true);
        const res = await SaveNewCompany(currentData);
        setIsSaving(false);
        setDialog(false);
    }
    return(
        <Dialog open={true} fullWidth maxWidth='sm'>
            <DialogTitle>
                Add
            </DialogTitle>
            <DialogContent>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:1}}>
                    {preview&&
                    (<Card sx={{ width: 100 }}>
                        <CardMedia
                            component="img"
                            height="100"
                            image={preview}
                            alt="Preview"
                        />
                    </Card>)
                    }
                    {preview && (
                        <Button size="small" variant="outlined" color="error" onClick={handleRemove}>
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
                        Upload Profile
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                    
                </Box>
                <Box sx={{display:'flex', gap:.8,mt:1, flexDirection:'column'}}>
                    <TextField
                        fullWidth
                        label='Company Name'
                        variant='filled'
                        value={currentData.name}
                        onChange={(val)=>setCurrentData((prev)=>({...prev, name:val.target.value}))}
                    />
                    <TextField
                        fullWidth
                        label='Address'
                        variant='filled'
                        value={currentData.address}
                        helperText='Street / Barangay / Municipality / Province'
                        onChange={(val)=>setCurrentData((prev)=>({...prev, address:val.target.value}))}
                    />
                    <TextField
                        fullWidth
                        variant='filled'
                        multiline
                        rows={5}
                        label='Description'
                        value={currentData.description}
                        onChange={(val)=>setCurrentData((prev)=>({...prev, description:val.target.value}))}
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
export default CompanyDialog;