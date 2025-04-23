import React,{useEffect, useState} from 'react';
import {Avatar, Box, IconButton, Stack} from "@mui/material";
import { AddCircle } from '@mui/icons-material';
import CompanyDialog from '../components/dialog/companyDialog';
import { DataGrid } from '@mui/x-data-grid';
import { GetAllCompany } from '../services/CompanyService';
import PositionDialog from '../components/dialog/positionDialog';
import { GetAllPositions } from '../services/PositionService';
import { romanize } from '../helpers/helper';

const columns = [
    {headerName:'Position',field:'name',flex:1},
    {headerName:'Description',field:'_',flex:2,
        valueGetter: (value, row) => {
            let tar = `${row.name}`;
            if(row.min_level){
                 tar += ` ${romanize(row.min_level)} - ${romanize(row.max_level)}`
            }
            return tar;
        }
    },

]
const PositionPage = () =>{
    const [dialog, setDialog] = useState(false);
    const [positions, setPositions] =useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    
    useEffect(()=>{
        if(!dialog)
        loadPositions();
    },[dialog])
    
    const loadPositions = async () =>{
        setTableLoading(true);
        const _res = await GetAllPositions();
        setTableLoading(false);
        if(_res.success){
            setPositions(_res.data);
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
            {dialog&&<PositionDialog setDialog={setDialog}/>}
            <Box sx={{ flex: 1, position: 'relative', height:'calc(100vh - 250px)' }}>
                <Box sx={{ inset: 0, position: 'absolute' }}>
                    <DataGrid
                        loading={tableLoading}
                        columns={columns}
                        rows={positions}
                    />
                </Box>
            </Box>
            
        </Box>
    );
}
export default PositionPage;