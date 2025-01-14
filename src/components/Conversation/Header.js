import { Avatar, Box, Typography,IconButton, Divider,Stack, } from '@mui/material'
import { CaretDown, MagnifyingGlass } from 'phosphor-react'
import React from 'react';
import { useTheme } from "@mui/material/styles";
import { faker } from '@faker-js/faker';
import StyledBadge from '../StyledBadge';
import { ToggleSidebar } from '../../redux/slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {messages} = useSelector((state) => state.messages);
  const ce = messages?.conversation_element;
  function isRealValue(obj)
  {
    return obj && obj !== 'null' && obj !== 'undefined';
  }
  if(isRealValue(ce)){
    return <></>
  }
  
  const AvatarImg = (ce)=>{
    return <Avatar alt={ce.name} src={faker.image.avatar()}/>
  }
  return (
    <Box p={2} sx={{ width:'100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper, boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
    <Stack alignItems={'center'} direction='row' justifyContent={'space-between'}
    sx={{width:'100%', height:'100%'}}>
        <Stack onClick={()=>{
            dispatch(ToggleSidebar());
        }} direction={'row'} spacing={2}>
            <Box>
                {ce.is_online ? <StyledBadge  overlap="circular"
                anchorOrigin={{ // position
                    vertical: "bottom",
                    horizontal: "right",
                }}
                variant="dot">
                    <AvatarImg ce={ce} />
                </StyledBadge>: <AvatarImg ce={ce} />}
                
            </Box>
            <Stack spacing={0.2}>
                    <Typography variant='subtitle2'>
                        {ce.is_group? ce.name: "ce?.users[0]?.name"}
                    </Typography>
                    <Typography variant='caption'>
                        {ce.is_online ? 'Online': 'Offline'}
                    </Typography>
                </Stack>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={3}>
            {/* <IconButton>
                <VideoCamera/>
            </IconButton>
            <IconButton>
                <Phone/>
            </IconButton> */}
            <IconButton>
                <MagnifyingGlass/>
            </IconButton>
            <Divider orientation='vertical' flexItem/>
            <IconButton>
                <CaretDown/>
            </IconButton>
        </Stack>
    </Stack>
</Box>
  )
}

export default Header