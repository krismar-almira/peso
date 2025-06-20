import { Box, Card, CardContent, CardMedia, Divider, Typography, Button, dialogActionsClasses } from "@mui/material";
import { useAuthProvider } from "../../context/authContext";
import { JoinJobFair } from "../../services/JobFairScheduleService";
import { useState } from "react";
import ListParticipantsDialog from "../dialog/listOfParticipantsDialog";
import CompanyJoinDialog from "../dialog/companyJoinDialog";
import ParticipantsDialog from "../dialog/participantsDialog";
import { useSnackbar } from "notistack";
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
const ScheduletItem = ({data, reload}) =>{
    const {user} = useAuthProvider();
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] =useState(false);
    const [viewDialog, setViewDialog] = useState(false);
    const [viewDataSelected, setViewDataSelected] = useState();
    const [participantDialog, setParticipantDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const join = async () =>{
        setLoading(true);
        const res = await JoinJobFair({ job_fair_schedule_id:data.id});
        setLoading(false);
        reload();
        console.log(res);
    }
    const viewCompany = () =>{
        setViewDialog(true);
        setViewDataSelected({company_id:user.company_id,schedule_id:data.id});
    }
    const handleClickParticipant=()=>{
        setParticipantDialog(true);
    }
    const handleCopy = async (textToCopy) => {
        const url = import.meta.env.VITE_API_URL.replace('api/','')+'nsrp2?id='+textToCopy;
        try {
            await navigator.clipboard.writeText(url);
            enqueueSnackbar('Copied to clipboard!',{variant:'success'});
        } catch (err) {
            enqueueSnackbar('Failed to copy!',{variant:'error'});
        }
    };
    return (
        <Card >
            <CardContent sx={{display:'flex'}} >
                {viewDialog&&<CompanyJoinDialog data={viewDataSelected} setDialog={setViewDialog}/>}
                {dialog&&<ListParticipantsDialog id={data.id} setDialog={setDialog}/>}
                {participantDialog&&<ParticipantsDialog id={data.id} setDialog={setParticipantDialog}/>}
                <CardMedia
                sx={{ height: 140,flex:1 }}
                image={data?.imagelocation}
                />
                <Box sx={{flex:2, pl:2}}>
                    <Typography variant="subtitle2" color="initial">
                        {data?.theme}
                    </Typography>

                    <Typography sx={{mt:1}} variant="subtitle1" color="initial">
                        Venue: {data?.venue}
                    </Typography>
                    <Typography variant="subtitle1" color="initial">
                        Date:  {data?.event_date==data?.end_event_date?`${new Date(data?.event_date).toLocaleDateString(undefined, options)}`:`${new Date(data?.event_date).toLocaleDateString(undefined, options)} - ${new Date(data?.end_event_date).toLocaleDateString(undefined, options)}`} 
                    </Typography>
                </Box>
                <Divider flexItem orientation="vertical"/>
                <Box sx={{width:200, p:2, gap:1, display:'flex',flexDirection:'column'}}>
                    <Button onClick={handleClickParticipant} sx={{borderRadius:5}} fullWidth variant="outlined" color="primary">
                        Participants
                    </Button>
                    <Button onClick={()=>handleCopy(data.random)} sx={{borderRadius:5}} fullWidth variant="outlined" color="primary">
                        Copy Link To Clipboard
                    </Button>
                </Box>
                {/* <Box sx={{width:200, p:2, gap:1, display:'flex',flexDirection:'column'}}>
                    {
                    data.joined?
                        <Button fullWidth variant="contained" disabled={!data.accept} onClick={viewCompany}>{data.accept?'view':'waiting to accept'}</Button>
                        :
                        <Button disabled={data.joined} loading={loading} onClick={join} sx={{borderRadius:5}} fullWidth variant="outlined" color="primary">
                        Join
                        </Button>
                    }
                    <Button onClick={()=>setDialog(true)} sx={{borderRadius:5}} fullWidth variant="outlined" color="primary">
                      Participants
                    </Button>
                </Box> */}
            </CardContent>
        </Card>
    )
}
export default ScheduletItem;