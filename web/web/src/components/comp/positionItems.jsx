import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Card, CardContent, CardHeader, Chip, MenuList, Typography } from '@mui/material';
import { romanize } from '../../helpers/helper';
import { MoreVert } from '@mui/icons-material';
import { DeleteVacantPosition } from '../../services/VacantPositionService';
import { useSnackbar } from 'notistack';

export default function PositionItem({x, reloadList}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRemove = async () =>{
    setLoading(true);
    const res = await DeleteVacantPosition({id:x.id});
    setLoading(false);
    if(res.success){
        enqueueSnackbar('Delete', {variant:'success'});
        reloadList();
    }
    
  }
  return (
        <Card sx={{position:'relative'}}>
            <CardHeader
            title={`${x.position.name} ${romanize(x.position_level)}`}
            subheader={`Number of Vacant: ${x.qty}`}
            />
            <CardContent >
                <Typography variant="body1" color="initial">Skill Required:</Typography>
                <Box sx={{display:'flex', gap:0.5}}>
                    {x.skills.map((skill)=>(
                        <Chip color='primary' label={skill.skill.name}/>
                    ))}
                </Box>
                <Button
                    aria-haspopup="true"
                    onClick={handleClick}
                    startIcon={<MoreVert/>}
                    sx={{position:'absolute', right:0, top:20}}
                >
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    loading={loading}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleRemove}>Remove</MenuItem>
                </Menu>
            </CardContent>
        </Card>
  );
}
