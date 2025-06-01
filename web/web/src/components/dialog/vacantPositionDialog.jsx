import { Dialog,Autocomplete, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Box, Typography } from '@mui/material';
import react, {useState, useEffect} from 'react';
import { GetAllSkills } from '../../services/SkillService';
import { GetAllPositions } from '../../services/PositionService';
import { romanize } from '../../helpers/helper';
import { getAllEducationalAttainement } from '../../services/EducationService';
import { AddVacantPosition } from '../../services/VacantPositionService';
import { useSnackbar } from 'notistack';
const VacantPositionDialog = ({setDialog, passdata}) =>{
    const [currentData, setCurrentData] = useState({company_id:passdata.company_id, schedule_id:passdata.schedule_id,year_experience:1,position:{id:0, level:0},qty:10, skills:[], attainment:[]});
    const [data,setData] = useState({position:'',skills:[]});
    const [skills, setSkills] = useState([]);
    const [positions, setPositions] = useState([]);
    const [loadingSave, setLoadingSave] = useState(false);
    const [attainments, setAttainments] = useState([]);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(()=>{
        loadSkills();
        loadPositions();
        loadAttainments();
    },[]);
    async function loadSkills(){
        const res = await GetAllSkills();
        if(res.success){
            const _mod = res.data.map(x=>({id:x.id, label:x.name}))
            setSkills(_mod)
        }
    }
    async function loadAttainments(){
        const res = await getAllEducationalAttainement();
        if(res.success){
            setAttainments(res.data);
        }
    }
    async function loadPositions(){
        const res = await GetAllPositions();
        if(res.success){
            const _mod = [];
            res.data.forEach(val => {
                if(!val.min_level){
                    _mod.push({label:val.name, id:val.id, act_id:val.id, selected_level:0});
                    return;
                }
                for (let index = val.min_level; index < val.max_level; index++) {
                    _mod.push({label:`${val.name}-${romanize(index)}`, id:`${val.id}-${index}`, act_id:val.id, selected_level:index});
                }
            });
            console.log(_mod);
            setPositions(_mod);
        }
    }
    const map = async () =>{
        setCurrentData((prev)=>({...prev, 
            position:{id:data.position.act_id, level:data.position.selected_level},
            // skill:data.skills.map(val=>(val.id))
        }))
    }
    useEffect(()=>{
        map();
    },[data]);
    const handleSave = async () =>{
        console.log(currentData);
        setLoadingSave(true);
        const res = await AddVacantPosition(currentData);
        setLoadingSave(false);
        if(!res.success){
            enqueueSnackbar('error while saving', {variant:'error'});
            return;
        }
        enqueueSnackbar('Successfully saved', {variant:'success'});
        setDialog(false);
        
    }
    return <Dialog open={true} fullWidth maxWidth='sm'>
        <DialogTitle id={11}>
            Add Vacant Position
        </DialogTitle>
        <DialogContent>
            <Box sx={{display:'flex', gap:0.5, flexDirection:'column'}}>
                <Autocomplete
                    value={data.position}
                    onChange={(_,val)=>setData((prev)=>({...prev,position:val}))}
                    size='small'
                    options={positions}
                    renderInput={(params) => <TextField variant='filled' size='small' {...params} label="Position" />}
                />
                {/* <Autocomplete
                    multiple={true}
                    size='small'
                    value={data.skills}
                    options={skills}
                    onChange={(_,val)=>setData((prev)=>({...prev,skills:val}))}
                    renderInput={(params) => <TextField variant='filled' size='small' {...params} label="Skills" />}
                /> */}
                 <Autocomplete
                    multiple
                    size="small"
                    options={skills}
                    value={skills.filter(option => currentData.skills.includes(option.id))}
                    getOptionLabel={(option) => option.label || ''}
                    onChange={(_, selectedOptions) =>
                        setCurrentData(prev => ({
                            ...prev,
                            skills: selectedOptions.map(option => option.id)
                        }))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            size="small"
                            label="Skills"
                        />
                    )}
                />
                <Autocomplete
                    multiple
                    size="small"
                    options={attainments}
                    value={attainments.filter(option => currentData.attainment.includes(option.id))} // Convert IDs to objects
                    getOptionLabel={(option) => option.name || ''}
                    onChange={(_, selectedOptions) =>
                        setCurrentData(prev => ({
                            ...prev,
                            attainment: selectedOptions.map(option => option.id) // Save only IDs
                        }))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            size="small"
                            label="Educational Attainments"
                        />
                    )}
                    renderOption={(props, option)=>{
                        const { key, ...optionProps } = props;
                        return(
                            <Box
                                key={key}
                                component="li"
                                sx={{ '& > img': { mr: 2, flexShrink: 0 }, display:'flex', flexDirection:'column', justifyContent:'left'}}
                                {...optionProps}
                            >
                                <Typography variant='body'>{option.name}</Typography>
                                <Typography variant='caption'>{option.edu_level.name}</Typography>
                                
                            </Box>
                        )
                    }}
                />

                <TextField type='number' onChange={(val)=>setCurrentData(prev=>({...prev,year_experience:val.target.value}))} value={currentData.year_experience} variant='filled' size='small' label='Year Experience'/>
                <TextField type='number' onChange={(val)=>setCurrentData(prev=>({...prev,qty:val.target.value}))} value={currentData.qty} variant='filled' size='small' label='# vancant'/>
                
            </Box>
            
        </DialogContent>
        <DialogActions>
            <Button
                onClick={()=>setDialog(false)}
                color="primary"
            >
                Cancel
            </Button>
            <Button
                onClick={()=>handleSave()}
                color="primary"
                loading={loadingSave}
            >
                Save
            </Button>
        </DialogActions>
    </Dialog>
}

export default VacantPositionDialog;