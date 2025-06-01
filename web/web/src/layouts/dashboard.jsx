import React, {useState} from 'react';
import { Outlet, useLocation, useParams, matchPath } from 'react-router';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Chip, IconButton, Paper, Stack, TextField, Tooltip, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Avatar, Button } from '@mui/material';
import { CheckCircle, CloudCircle, Search, Work, WorkOutline, ExpandMore, Height } from '@mui/icons-material';
import { useAuthProvider } from '../context/authContext';
import { logOutUserServer } from '../services/UserService';
import { useSnackbar } from 'notistack';
import { delay } from '../helpers/helper';

export default function Layout() {
  const location = useLocation();
  const {user} = useAuthProvider();
  const [logginOut, setLogginOut] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const logOutUser = async () =>{
    setLogginOut(true);
    const res = await logOutUserServer();
    setLogginOut(false);
    if(!res.success) return;
    enqueueSnackbar('Logout success. Page automatically reload in 3 seconds',{variant:'success'});
    await delay(2000);
    window.location.reload();
  }
  // const { employeeId } = useParams();

  // const title = React.useMemo(() => {
  //   if (location.pathname === '/employees/new') {
  //     return 'New Employee';
  //   }
  //   if (matchPath('/employees/:employeeId/edit', location.pathname)) {
  //     return `Employee ${employeeId} - Edit`;
  //   }
  //   if (employeeId) {
  //     return `Employee ${employeeId}`;
  //   }
  //   return undefined;
  // }, [location.pathname, employeeId]);
  function CustomAppTitle() {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* <Work fontSize="large" color="primary" />
        <Typography variant="h6">P.E.S.O</Typography>
        <Chip size="small" label="JOB Fair" color="info" /> */}
      </Stack>
    );
  }
  function ToolbarActions() {
    return (
      <Stack direction="row" sx={{display:'flex', alignItems:'center'}}>
        <ThemeSwitcher/>

        <Box sx={{height:50 , minWidth:200}}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-label="Expand"
              aria-controls="-content"
              id="-header"
            >
              <Avatar sizes='small' src={user.imagelocation} sx={{ width: 26, height: 26, mr:1 }}/>
              <Typography>{`${user.first_name} ${user.last_name}`}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{display:'flex', justifyContent:'center',alignItems:'center', flexDirection:'column' }}>
              <Avatar sizes='small' src={user.imagelocation} sx={{ width: 60, height: 60}}/>
              <Typography variant='h6'>{`${user.first_name} ${user.middle_name} ${user.last_name}`}</Typography>
              <Typography variant='body'>{user?.company?.name&&user.company.name}</Typography>
              <Button loading={logginOut} onClick={logOutUser} variant='contained' size='small' fullWidth color='error' sx={{mt:2}}>
                Logout
              </Button>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Stack>
    );
  }

  return (
    <DashboardLayout
    slots={{
      appTitle: CustomAppTitle,
      toolbarActions: ToolbarActions,
    }}>
      <PageContainer  maxWidth={false} sx={{ px: 0, mx: 0 }}>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}