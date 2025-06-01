import React,{useEffect, useState} from 'react';
import {Avatar, Box, IconButton, Stack} from "@mui/material";
import { AddCircle } from '@mui/icons-material';
import CompanyDialog from '../components/dialog/companyDialog';
import { DataGrid } from '@mui/x-data-grid';
import { GetAllCompany } from '../services/CompanyService';
import PositionDialog from '../components/dialog/positionDialog';
import { GetAllPositions } from '../services/PositionService';
import { romanize } from '../helpers/helper';
import SkillDialog from '../components/dialog/skillDialog';
import { GetAllSkills } from '../services/SkillService';

const columns = [
    {headerName:'Name',field:'name',flex:1},
]
const SkillPage = () =>{
    const [dialog, setDialog] = useState(false);
    const [skills, setSkills] =useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    
    useEffect(()=>{
        if(!dialog)
        loadSkills();
    },[dialog])
    
    const loadSkills = async () =>{
        setTableLoading(true);
        const _res = await GetAllSkills();
        setTableLoading(false);
        if(_res.success){
            setSkills(_res.data);
        }
    }
    const handleOpenDialog = (crud) =>{
        setDialog(true);
    }
    return(
        <Box sx={{position:'relative'}}>
            <IconButton sx={{position:'absolute', right:0, top:-50, zIndex:1000}} aria-label="" onClick={()=>handleOpenDialog('New')}>
              <AddCircle/>
            </IconButton>
            {dialog&&<SkillDialog setDialog={setDialog}/>}
            <Box sx={{ flex: 1, position: 'relative', height:'calc(100vh - 250px)' }}>
                <Box sx={{ inset: 0, position: 'absolute' }}>
                    <DataGrid
                        loading={tableLoading}
                        columns={columns}
                        rows={skills}
                    />
                </Box>
            </Box>
            
        </Box>
    );
}
export default SkillPage;