import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Apartment, Build, BuildOutlined, LocalPostOffice, Person, PowerSettingsNew, SafetyCheck, Settings, SwitchAccessShortcut, VerifiedUser } from '@mui/icons-material';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Posting',
    segment:'posting',
    icon: <SafetyCheck />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'config',
    title:'Configuration',
    icon:<Settings/>,
    children: [
      {
        segment: 'company',
        title: 'Company',
        icon: <Apartment />,
      },
      {
        segment: 'user',
        title: 'User',
        icon: <Person />,
      },
      {
        segment: 'position',
        title: 'Position',
        icon: <SwitchAccessShortcut />,
      },
    ]
  }
];

const BRANDING = {
  // title: 'P.E.S.O Job matching',
  title: 'PO',
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}