import React,{useEffect, useState} from 'react';
import {Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, Divider, IconButton, Stack} from "@mui/material";
import { AddCircle, Schedule, Widgets } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { AddEmployeerToJobFairSchedule, EmployeerRequestApprove, EmployeerRequestDelete, GetAllCompany,  GetAllEmployeersRequest} from '../../services/CompanyService';
import { localizeTime, romanize } from '../../helpers/helper';
import { useSnackbar } from 'notistack';
import Nsrp1Dialog from '../../components/dialog/nsrp1Dialog';


const Nsrp1ListDialog = ({setDialog, event_id}) =>{
    const [nsrp1s, setNsrp1s] =useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [nsrpDialog,setNsrp1Dialog] = useState(false);
    const [seletedNsrp, setSelectedNsrp] = useState();
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleSelectionChange = (selection) => {
        const selectedIds = selection && selection.ids
            ? Array.from(selection.ids)
            : Array.isArray(selection)
            ? selection
            : [];
        setSelectedIds(selectedIds);
        const selectedData = nsrp1s.filter((row) => selectedIds.includes(row.id));
        setSelectedRows(selectedData);
        console.log('Type of selection:', typeof selection, selection);
        console.log('Selected IDs:', selectedIds);
        console.log('Selected Rows:', selectedData);
    };

    const columns = [
        {headerName:'Establishment',field:'establishment',flex:1},
        {
            headerName:'Avail.Positions',
            field:'_',
            width:150,
            renderCell: (params) => {
                return <Chip
                    label={params.row?.vacant_positions?.length}
                    color={params.value === 'Active' ? 'success' : 'default'}
                    variant="outlined"
                    size="small"
                />
            },
        },
        {
            headerName:'Number Of Vacancies',
            field:'___',
            width:150,
            valueGetter: (params,row) => {
                try {
                    const total = row.vacant_positions.reduce((n, {number_of_Vacancies}) => n + parseInt(number_of_Vacancies), 0);
                    return total
                } catch (error) {
                    return 0;
                }
                
            },
        },
        {
            headerName:'Date Requested',
            field:'__',
            width:200,
            valueGetter:(params,row)=>{
                return localizeTime(row.created_at);
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            renderCell: (params) => (
                <Box height='100%'  display="flex" flex='row' alignItems="center" alignContent='center' gap={1}>
                    <Button
                        variant="contained"
                        color="default"
                        size="small"
                        onClick={()=>{
                            setSelectedNsrp(params.row);
                            setNsrp1Dialog(true);
                        }}
                        >
                            View
                    </Button>
                    <Divider orientation='vertical' flexItem />
                    {
                        params.row.confirmed?
                     
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            disabled
                            >
                                Approved
                        </Button>
                        :
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                    onClick={() => handleApprove(params.row)}
                                >
                                    approve
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                    onClick={() => handleDelete(params.row)}
                                >
                                    Delete
                            </Button>
                        </>
                        
                    }
                   
                </Box>
                
            ),
    },

    ]
    const handleApprove = async (row) =>{
        console.log(row);
        const res = await EmployeerRequestApprove({id:row.id});
        if(res.success){
            enqueueSnackbar('Approved',{variant:'success'});
            loadNsrp1();
        }
    }
    const handleDelete = async (row) =>{
        console.log(row);
        const res = await EmployeerRequestDelete({id:row.id});
        if(res.success){
            enqueueSnackbar('Approved',{variant:'success'});
            loadNsrp1();
        }
    }
    useEffect(()=>{
        loadNsrp1();
    },[])
    const loadNsrp1 = async () =>{
        setTableLoading(true);
        const _res = await GetAllEmployeersRequest();
        setTableLoading(false);
        if(_res.success){
            setNsrp1s(_res.data);
        }
    }
    const handleOpenDialog = (crud) =>{
        setDialog(true);
    }
    const handleAdd = async () =>{
        setLoading(true);
        const res = await AddEmployeerToJobFairSchedule({schedule_id:event_id,comapany_id:selectedIds});
        setLoading(false);
        if(!res.success){
            enqueueSnackbar('encounter error while adding to job fair schedule', {variant:'error'});
            return;
        }
        enqueueSnackbar('Successfully added', {variant:'success'});
    }
    return(
        <Dialog open={true} fullWidth maxWidth='lg'>
            <DialogContent>
                <Box sx={{position:'relative'}}>
                    <IconButton sx={{position:'absolute', right:0, top:-50, zIndex:1000}} aria-label="" onClick={()=>handleOpenDialog('New')}>
                    <AddCircle/>
                    </IconButton>
                    {nsrpDialog&&<Nsrp1Dialog data={seletedNsrp} setDialog={setNsrp1Dialog}/>}
                    <Box sx={{ flex: 1, position: 'relative', height:'calc(100vh - 250px)' }}>
                        <Box sx={{ inset: 0, position: 'absolute' }}>
                            <DataGrid
                                loading={tableLoading}
                                columns={columns}
                                rows={nsrp1s}
                                checkboxSelection
                                onRowSelectionModelChange={handleSelectionChange}
                            />
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setDialog(false)}>
                    Close
                </Button>
                <Button loading={loading} onClick={handleAdd}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
        
    );
}
export default Nsrp1ListDialog;