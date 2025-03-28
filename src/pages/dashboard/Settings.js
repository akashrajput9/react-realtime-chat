import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import React, {useState} from 'react';
import { useTheme } from "@mui/material/styles";
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, Pencil, PencilCircle } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import Shortcuts from '../../sections/settings/Shortcuts';
import Conversation from '../../components/Conversation';
import { useSelector } from 'react-redux';

const Settings = () => {

    const theme = useTheme();

    const [openShortcuts, setOpenShortcuts] = useState(false);
    const {user}  = useSelector((state) => state.auth);

    const handleOpenShortcuts = ()=>{
        setOpenShortcuts(true);
    }

    const handleCloseShortcuts = ()=>{
        setOpenShortcuts(false);
    }

    const list = [
    //   {
    //     key:0,
    //     icon: <Bell size={20}/>,
    //     title: 'Notifications',
    //     onclick: () =>{}
    //   },
    //   {
    //     key:1,
    //     icon: <Lock size={20}/>,
    //     title: 'Privacy',
    //     onclick: () =>{}
    //   },
    //   {
    //     key:2,
    //     icon: <Key size={20}/>,
    //     title: 'Security',
    //     onclick: () =>{}
    //   },
    //   {
    //     key:3,
    //     icon: <PencilCircle size={20}/>,
    //     title: 'Theme',
    //     //onclick: handleOpenTheme
    //     onclick: () =>{}
    //   },
    //   {
    //     key:4,
    //     icon: <Image size={20}/>,
    //     title: 'Chat Wallpaper',
    //     onclick: () =>{}
    //   },
    //   {
    //     key:5,
    //     icon: <Note size={20}/>,
    //     title: 'Request Account Info',
    //     onclick: () =>{}
    //   },
    //   {
    //     key:6,
    //     icon: <Keyboard size={20}/>,
    //     title: 'Keyboard Shortcuts',
    //     onclick: handleOpenShortcuts
    //   },
    //   {
    //     key:7,
    //     icon: <Pencil size={20}/>,
    //     title: 'Update Profile Picture',
    //     onclick: () =>{}
    //   },
    ]

  return (
    <>
    <Stack direction='row' sx={{width:'100%'}}>
        {/* Left panel */}
        <Box className='scrollbar' sx={{overflow:'scroll', height:'100vh', width:320, 
        backgroundColor:theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
        boxShadow:'0px 0px 2px rgba(0)'}}>
          
            <Stack p={4} spacing={5}>
                {/* Header */}
                <Stack direction={'row'} alignItems='center' spacing={3}>
                    <IconButton>
                        <CaretLeft size={24} color='#4B4B4B'/>
                    </IconButton>
                    <Typography variant='h6'>Settings</Typography>
                </Stack>
                {/* Profile */}
                <Stack direction='row' spacing={3}>
                    <Avatar sx={{height:56, width:56}} src={user.profile_photo} alt={user?.name}/>
                    <Stack spacing={0.5}>
                        <Typography variant='article'>
                            {user?.name}
                        </Typography>
                        <Typography variant='body2'>
                          {user?.email}
                        </Typography>
                    </Stack>
                </Stack>
                {/* List of options */}
                <Stack spacing={4}>
                    {list.map(({key,icon,title,onclick})=> <>
                        <Stack spacing={2} sx={{cursor:'pointer'}} onClick={onclick}>
                            <Stack direction='row' spacing={2} >
                                {icon}
                                <Typography variant='body2'>{title}</Typography>
                            </Stack>
                            {key !== 7 && <Divider/>}
                        </Stack>
                    </>)}
                </Stack>
            </Stack>
            
        </Box>
        {/* Right panel */}
        
    </Stack>
    {openShortcuts && <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts}/>}
     
    </>
  )
}

export default Settings