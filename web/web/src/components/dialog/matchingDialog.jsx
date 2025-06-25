import React,{useEffect, useState} from 'react';
import {Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography} from "@mui/material";
import { AddCircle, Schedule, Widgets } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { AddEmployeerToJobFairSchedule, EmployeerRequestApprove, EmployeerRequestDelete, GetAllCompany,  GetAllEmployeersRequest} from '../../services/CompanyService';
import { localizeTime, romanize } from '../../helpers/helper';
import { useSnackbar } from 'notistack';
import Nsrp1Dialog from '../../components/dialog/nsrp1Dialog';
import { GetAllMatchBy } from '../../services/MatchService';
import ParticipantMatchDialog from './participantMatchDialog';
import { generateEndorsementPdf } from '../../pdf/endorsementpdf';


const MatchingDialog = ({setDialog, event_id}) =>{
    const [nsrp1s, setNsrp1s] =useState({applicants:[],employeers:[]});
    const [tableLoading, setTableLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [matchData, setMatchData] = useState([]);
    const [nsrpDialog,setNsrp1Dialog] = useState(false);
    const [seletedNsrp, setSelectedNsrp] = useState();
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [participantMatchDialog, setParticipantMatchDialog] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState();

    const columns = [
        {headerName:'Applicants',field:'full_name',flex:1},
        {
            headerName:'Matches',
            field:'_',
            width:150,
            valueGetter:(params,row)=>{
                return (row.top_matches.length);
            }
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
            width: 100,
            renderCell: (params) => (
                <Box height='100%'  display="flex" flex='row' alignItems="center" alignContent='center' gap={1}>
                    {/* <Button
                        variant="contained"
                        color="default"
                        size="small"
                        onClick={()=>{
                            setSelectedNsrp(params.row);
                            setNsrp1Dialog(true);
                        }}
                        >
                            view
                    </Button> */}
                    <Button
                        variant="contained"
                        color="default"
                        size="small"
                        onClick={()=>{
                            setParticipantMatchDialog(true);
                            setSelectedApplicant(params.row.id)
                        }}
                        >
                            Match
                    </Button>
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
        loadMatchTable();
    },[])
    const loadMatchTable = async () =>{
        setTableLoading(true);
        const _res = await GetAllMatchBy({event_id:event_id});
        setTableLoading(false);
        if(_res.success){
            setMatchData(_res.data);
        }
    }
    return(
        <Dialog open={true} fullWidth maxWidth='lg'>
            <DialogTitle>
            </DialogTitle>
            <DialogContent>
                <Box sx={{position:'relative'}}>
                    <Card>
                        <CardContent>
                            <Box>
                                <Typography variant="body1" color="initial">Total approved Participants</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    {nsrpDialog&&<Nsrp1Dialog data={seletedNsrp} setDialog={setNsrp1Dialog}/>}
                    {participantMatchDialog&&<ParticipantMatchDialog data={matchData} selected={selectedApplicant} setDialog={setParticipantMatchDialog}/>}
                    <Box sx={{ flex: 1, position: 'relative', height:'calc(100vh - 250px)' }}>
                        <Box sx={{ inset: 0, position: 'absolute' }}>
                            <DataGrid
                                loading={tableLoading}
                                columns={columns}
                                rows={matchData.applicants}
                                // checkboxSelection
                                //onRowSelectionModelChange={handleSelectionChange}
                            />
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setDialog(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        
    );
}
export default MatchingDialog;