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
import EducationDialog from '../components/dialog/educationDialog';
import { getAllEducationalAttainement } from '../services/EducationService';

const columns = [
    {headerName:'Name',field:'name',flex:1},
    {headerName:'Level',field:'_',flex:1, valueGetter:(val,row)=>{
        return row.edu_level?.name;
    }},
]
const EducationPage = () =>{
    const [dialog, setDialog] = useState(false);
    const [educationalAttainments, setEducationalAttainments] =useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    
    useEffect(()=>{
        if(!dialog)
        loadEducationAttainment();
    },[dialog])
    
    const loadEducationAttainment = async () =>{
        setTableLoading(true);
        const _res = await getAllEducationalAttainement();
        setTableLoading(false);
        if(_res.success){
            setEducationalAttainments(_res.data);
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
            {dialog&&<EducationDialog setDialog={setDialog}/>}
            <Box sx={{ flex: 1, position: 'relative', height:'calc(100vh - 250px)' }}>
                <Box sx={{ inset: 0, position: 'absolute' }}>
                    <DataGrid
                        loading={tableLoading}
                        columns={columns}
                        rows={educationalAttainments}
                    />
                </Box>
            </Box>
        </Box>
    );
}
export default EducationPage;