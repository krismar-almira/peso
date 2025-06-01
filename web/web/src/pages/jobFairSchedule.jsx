import { Box, Button, IconButton } from '@mui/material';
import  React,{useEffect, useState} from 'react';
import ScheduleDialog from '../components/dialog/scheduleDialog';
import { GetAllJobFairSchedule } from '../services/JobFairScheduleService';
import ScheduletItem from '../components/comp/scheduleItem';
import { Add, Refresh } from '@mui/icons-material';

const JobFairSchedule = () =>{
    const [dialogOpen, setDialogOpen] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    useEffect(()=>{
        if(!dialogOpen){
            init();
        }
    },[dialogOpen]);
    const init = async () =>{
        setTableLoading(true);
        await getAllSchedule();
        setTableLoading(false);
    }
    const getAllSchedule = async () =>{
        const res = await GetAllJobFairSchedule();
        setSchedules(res.data);
        console.log(res.data);
    }
    const reload = async () =>{
        await getAllSchedule()
    }
    return(
        <Box>
            <Box sx={{position:'absolute', right:20, top:110, zIndex:1000}}>
                <IconButton loading={tableLoading} onClick={()=>reload()}>
                    <Refresh/>
                </IconButton>
                <Button startIcon={<Add/>} onClick={()=>{setDialogOpen(true)}} variant="contained" color="primary">
                Add
                </Button>
            </Box>
            {dialogOpen&&<ScheduleDialog setDialog={setDialogOpen}/>}
            <Box sx={{display:'flex', gap:1, flexDirection:'column'}}>
                {schedules.map(x=>
                    <ScheduletItem key={x.id} reload={reload} data={x}/>
                )}
            </Box>
        </Box>
    );
}
export default JobFairSchedule;