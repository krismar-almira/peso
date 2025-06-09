import { Dialog,Autocomplete, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, FormGroup, Container, IconButton } from '@mui/material';
import react, {useState, useEffect} from 'react';
import { GetAllSkills } from '../../services/SkillService';
import { GetAllPositions } from '../../services/PositionService';
import { romanize } from '../../helpers/helper';
import { getAllEducationalAttainement } from '../../services/EducationService';
import { AddVacantPosition } from '../../services/VacantPositionService';
import { useSnackbar } from 'notistack';
import { Add, CheckBox, Delete } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { generateNsrpPdf } from '../../pdf/nsrppdf';

const ApplicantDialog = ({setDialog, passdata}) =>{
    const [currentData, setCurrentData] = useState({company_id:1, schedule_id:1,year_experience:1,position:{id:0, level:0},qty:10, skills:[], attainment:[]});
    const [applicantData, setApplicantData] = useState({
        first_name:'',middle_name:'',surname:'',suffix:'',sex:'',civil_status:'',pa_house_no:'',pa_brgy:'',pa_municipal:'',pa_province:'',tin:'',disability:[],
        contact_no:'',height:'',email:'',employement_type:'',
        "4ps_beneficiary":false,"4ps_house_hold_id":'',pref_part_time:false,pref_full_time:false,
        pref_occupation:[],pref_work_local:false,pref_work_location:[],pref_work_overseas:false,pref_work_location_overseas:[],expeced_salary_min:null,expeced_salary_max:null,
        passport_no:'',passport_expr:null,
        dialects:[
            {id:1,language:'English', read:false, write:false, speak:false,understand:false},
            {id:1,language:'Filipino', read:false, write:false, speak:false,understand:false},
        ],
        educational:[
            {id:1,name:'Elementary', school:'', course:'',yeargraduate:'',level:'', last_attended:'',awards:[]},
            {id:2,name:'Secondary', school:'', course:'',yeargraduate:'',level:'', last_attended:'',awards:[]},
            {id:3,name:'Tertiary', school:'', course:'',yeargraduate:'',level:'', last_attended:'',awards:[]},
            {id:4,name:'Graduate Studies', school:'', course:'',yeargraduate:'',level:'', last_attended:'',awards:[]}
        ],training:[],
        eligibility:[
            {eligibility:'',rating:null,date_examination:null}
        ],
        work_experience:[
            {comapany:'',address:'', position:'',date_start:dayjs(),date_end:dayjs(), status:''},
        ]
        ,skills:[]
    })

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
        console.log(applicantData);
        generateNsrpPdf(applicantData);
        // console.log(currentData);
        // setLoadingSave(true);
        // const res = await AddVacantPosition(currentData);
        // setLoadingSave(false);
        // if(!res.success){
        //     enqueueSnackbar('error while saving', {variant:'error'});
        //     return;
        // }
        // enqueueSnackbar('Successfully saved', {variant:'success'});
        // setDialog(false);
        
    }


     const handleChange = (field, value) => {
        setApplicantData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (category, index, field, value) => {
        setApplicantData(prev => ({
        ...prev,
        [category]: prev[category].map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        )
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(applicantData);
    };
    const addWorkExperience = () =>{
        setApplicantData(prev=>({
            ...prev,
            work_experience:[
                                ...prev['work_experience'],
                                {comapany:'',address:'', position:'',date_start:dayjs(),date_end:dayjs(), status:''}
                            ]
        }))
    }
    const deleteWorkExperiend = (index1) =>{
        setApplicantData(prev=>({
            ...prev,
            work_experience:prev['work_experience'].filter((_, index) => index !== index1)
        }))
    }

    return <Dialog open={true} fullWidth maxWidth='lg'>
        <DialogTitle id={11}>
            Jobseeker Registration Form
        </DialogTitle>
        <DialogContent>
                <Typography variant="h4" gutterBottom>Applicant Information</Typography>
                <form style={{width:'100%'}} onSubmit={handleSubmit}>
                <Grid container direction='column'>
                    <Grid container size={12} spacing={1}>
                        <Grid item size={12}>
                            <Typography variant="h6">Personal Information</Typography>
                        </Grid>
                        <Grid item size={4}>
                            <TextField
                                fullWidth
                                label="First Name"
                                value={applicantData.first_name}
                                onChange={(e) => handleChange('first_name', e.target.value)}
                            />
                        </Grid>
                        <Grid item size={2}>
                            <TextField
                                fullWidth
                                label="Middle Name"
                                value={applicantData.middle_name}
                                onChange={(e) => handleChange('middle_name', e.target.value)}
                            />
                        </Grid>
                        <Grid item size={4}>
                            <TextField
                                fullWidth
                                label="Surname"
                                value={applicantData.surname}
                                onChange={(e) => handleChange('surname', e.target.value)}
                            />
                        </Grid>
                        <Grid item size={2}>
                            <TextField
                                fullWidth
                                label="Suffix"
                                value={applicantData.suffix}
                                onChange={(e) => handleChange('suffix', e.target.value)}
                            />
                        </Grid>
                        <Grid item size={6}>
                            <FormControl fullWidth>
                                <InputLabel>Sex</InputLabel>
                                <Select
                                label='sex'
                                value={applicantData.sex}
                                onChange={(e) => handleChange('sex', e.target.value)}
                                >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item size={6}>
                        <FormControl fullWidth>
                            <InputLabel>Civil Status</InputLabel>
                            <Select
                            label='Civil Status'
                            value={applicantData.civil_status}
                            onChange={(e) => handleChange('civil_status', e.target.value)}
                            >
                            <MenuItem value="Single">Single</MenuItem>
                            <MenuItem value="Married">Married</MenuItem>
                            <MenuItem value="Widowed">Widowed</MenuItem>
                            <MenuItem value="Separated">Separated</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>

                        {/* Address */}
                        <Grid item size={12}>
                            <Typography variant="h6">Permanent Address</Typography>
                        </Grid>
                        <Grid item size={3}>
                        <TextField
                            fullWidth
                            label="House No."
                            value={applicantData.pa_house_no}
                            onChange={(e) => handleChange('pa_house_no', e.target.value)}
                        />
                        </Grid>
                        <Grid item size={3}>
                        <TextField
                            fullWidth
                            label="Barangay"
                            value={applicantData.pa_brgy}
                            onChange={(e) => handleChange('pa_brgy', e.target.value)}
                        />
                        </Grid>
                        <Grid item size={3}>
                        <TextField
                            fullWidth
                            label="Municipality"
                            value={applicantData.pa_municipal}
                            onChange={(e) => handleChange('pa_municipal', e.target.value)}
                        />
                        </Grid>
                        <Grid item size={3}>
                        <TextField
                            fullWidth
                            label="Province"
                            value={applicantData.pa_province}
                            onChange={(e) => handleChange('pa_province', e.target.value)}
                        />
                        </Grid>

                        {/* Other Personal Details */}
                        <Grid item size={12}>
                            <Typography variant="h6">Other Personal Details</Typography>
                        </Grid>
                        <Grid item size={4}>
                            <TextField
                                fullWidth
                                label="TIN"
                                value={applicantData.tin}
                                onChange={(e) => handleChange('tin', e.target.value)}
                            />
                        </Grid>
                        
                        <Grid item size={4}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                value={applicantData.contact_no}
                                onChange={(e) => handleChange('contact_no', e.target.value)}
                            />
                        </Grid>
                        <Grid item size={4}>
                            <TextField
                                fullWidth
                                label="Height(cm)"
                                value={applicantData.height}
                                onChange={(e) => handleChange('height', e.target.value)}
                            />
                        </Grid>
                        <Grid item size={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={applicantData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </Grid>
                        <Grid item size={12}>
                            <Autocomplete
                                multiple
                                freeSolo
                                options={['Visual','Speach', 'Hearing','Physical']}
                                value={applicantData.disability}
                                onChange={(event, newValue) => {
                                    handleChange('disability', newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Disabilities"
                                    placeholder="Type and press Enter"
                                    />
                                )}
                            />
                        </Grid>
                        {/* Employment Status */}
                        <Grid item size={12}>
                            <Typography variant="h6">Employment Status</Typography>
                        </Grid>
                        <Grid item size={12}>
                            <Autocomplete
                                // freeSolo
                                // multiple
                                options={['(Employed)Wage Employed','(Employed)Self Employed', '(Unemployed) New entrant/Fresh Graduate','(Unemployed) Finished Contract','(Unemployed) Resigned','(Unemployed) Retired']}
                                value={applicantData.employement_type}
                                onChange={(event, newValue) => {
                                    handleChange('employement_type', newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Employement Status"
                                    placeholder="Type and press Enter"
                                    />
                                )}
                            />
                        </Grid>
                        
                        {/* Dialects */}
                        <Grid item size={12}>
                            <Typography variant="h6">Dialects</Typography>
                        </Grid>
                        {applicantData.dialects.map((dialect, index) => (
                            <Grid item size={12} key={dialect.id}>
                                <Typography>{dialect.language}</Typography>
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={dialect.read}
                                    onChange={(e) => handleNestedChange('dialects', index, 'read', e.target.checked)}
                                    />
                                }
                                label="Read"
                                />
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={dialect.write}
                                    onChange={(e) => handleNestedChange('dialects', index, 'write', e.target.checked)}
                                    />
                                }
                                label="Write"
                                />
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={dialect.speak}
                                    onChange={(e) => handleNestedChange('dialects', index, 'speak', e.target.checked)}
                                    />
                                }
                                label="Speak"
                                />
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={dialect.understand}
                                    onChange={(e) => handleNestedChange('dialects', index, 'understand', e.target.checked)}
                                    />
                                }
                                label="Understand"
                                />
                            </Grid>
                        ))}
                    </Grid>
                        {/* Educational Background */}
                    <Grid item size={12}>
                        <Typography variant="h6">Educational Background</Typography>
                    </Grid>
                    {applicantData.educational.map((edu, index) => (
                        <Grid sx={{display:'flex', gap:0.5, flexDirection:'column'}} size={12} key={edu.id}>
                            <Typography>{edu.name}</Typography>
                            <TextField
                            fullWidth
                            label="School"
                            value={edu.school}
                            onChange={(e) => handleNestedChange('educational', index, 'school', e.target.value)}
                            />
                            {/* <TextField
                            fullWidth
                            label="Course"
                            value={edu.course}
                            onChange={(e) => handleNestedChange('educational', index, 'course', e.target.value)}
                            />
                            {JSON.stringify(attainments)} */}
                            <Autocomplete
                                options={attainments.filter(x=>x.edu_level.name===edu.name)}
                                value={edu.course}
                                getOptionLabel={(option) => option.name || ''}
                                onChange={(event, newValue) => {
                                    handleNestedChange('educational', index, 'course', newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Course"
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
                            <TextField
                            fullWidth
                            label="Year Graduated"
                            value={edu.yeargraduate}
                            onChange={(e) => handleNestedChange('educational', index, 'yeargraduate', e.target.value)}
                            />
                            <TextField
                            fullWidth
                            label="Level (If not Graduate)"
                            value={edu.level}
                            onChange={(e) => handleNestedChange('educational', index, 'level', e.target.value)}
                            />
                            <TextField
                            fullWidth
                            label="Year Last Attended (If not Graduate)"
                            value={edu.last_attended}
                            onChange={(e) => handleNestedChange('educational', index, 'last_attended', e.target.value)}
                            />
                            <Autocomplete
                                multiple
                                freeSolo
                                options={[]}
                                value={edu.awards}
                                onChange={(event, newValue) => {
                                    handleNestedChange('educational', index, 'awards', newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Awards"
                                    placeholder="Type and press Enter"
                                    />
                                )}
                            />
                            {/* <TextField
                                fullWidth
                                label="Awards"
                                value={edu.awards}
                                onChange={(e) => handleNestedChange('educational', index, 'awards', e.target.value)}
                            /> */}

                        </Grid>
                    ))}
                    

                    {/* Work Experience */}
                    <Grid item size={12} sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <Typography variant="h6">Work Experience</Typography>
                        <Box>
                            <IconButton onClick={()=>{addWorkExperience()}}>
                                <Add/>
                            </IconButton>
                        </Box>
                    </Grid>
                    {applicantData.work_experience.map((work, index) => (
                    <Grid sx={{display:'flex', flexDirection:'column', gap:0.5, mb:2}} item size={12} key={index}>
                        
                        <TextField
                        fullWidth
                        label="Company"
                        value={work.company}
                        onChange={(e) => handleNestedChange('work_experience', index, 'company', e.target.value)}
                        />
                        <TextField
                        fullWidth
                        label="Address"
                        value={work.address}
                        onChange={(e) => handleNestedChange('work_experience', index, 'address', e.target.value)}
                        />
                        <TextField
                        fullWidth
                        label="Position"
                        value={work.position}
                        onChange={(e) => handleNestedChange('work_experience', index, 'position', e.target.value)}
                        />
                        <DatePicker
                            label="From"
                            value={work.date_start}
                            onChange={(value) => handleNestedChange('work_experience', index, 'date_start', value)}
                        />
                        <DatePicker
                            label="To"
                            value={work.date_end}
                            onChange={(value) => handleNestedChange('work_experience', index, 'date_end', value)}
                        />
                        <Autocomplete
                            freeSolo
                            options={['Permanent','Contractual Part-time','Probationary']}
                            value={work.status}
                            onChange={(event, newValue) => {
                                handleNestedChange('work_experience', index, 'status', newValue)
                            }}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                variant="outlined"
                                label="Status"
                                placeholder="Type and press Enter"
                                />
                            )}
                        />
                        {/* <TextField
                        fullWidth
                        label="Status"
                        value={work.status}
                        onChange={(e) => handleNestedChange('work_experience', index, 'status', e.target.value)}
                        /> */}
                        <Box sx={{display:'flex', justifyContent:'center'}}>
                            <IconButton onClick={()=>{deleteWorkExperiend(index)}} color='warning'>
                                <Delete/>
                            </IconButton>
                        </Box>
                        
                    </Grid>
                    ))}
                    <Grid item size={12} sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <Typography variant="h6">Skills</Typography>
                    </Grid>
                    <Grid>
                        <Autocomplete
                            multiple
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
                                    size="small"
                                    label="Skills"
                                />
                            )}
                        />
                    </Grid>
                    
                </Grid>
                
                </form>
        </DialogContent>
        {/* <DialogContent>
            <Box sx={{display:'flex', gap:0.5, flexDirection:'column'}}>
                <Autocomplete
                    value={data.position}
                    onChange={(_,val)=>setData((prev)=>({...prev,position:val}))}
                    size='small'
                    options={positions}
                    renderInput={(params) => <TextField variant='filled' size='small' {...params} label="Position" />}
                />
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
            
        </DialogContent> */}
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

export default ApplicantDialog;