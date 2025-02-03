import { Box, IconButton, Stack, Typography, InputBase, Button, Divider, Avatar, Badge, Link } from
  '@mui/material'
import { ArchiveBox, CircleDashed, MagnifyingGlass, Plus } from 'phosphor-react';
import {useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
// import {ChatList} from '../../data';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import ChatElement from '../../components/ChatElement';
import { apifetch } from '../../utils/fetchApi';
import { dispatch } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import CreateChat from '../../sections/main/CreateChat';
import { setChat } from '../../redux/slices/chatSlice';


const Chats = () => {
  const theme = useTheme();
  // const [chatList,setChatList] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.chats);
  const [openDialog, setOpenDialog] = useState(false);

  
  const handleCloseDialog = () =>{
    console.log("helel")
    setOpenDialog(false);

  }

  useEffect(()=>{
    
    apifetch("/chat",token).then((res)=>{
      if(res?.status == 401){
        dispatch(logout())
      }else if(res.success == 1){
        dispatch(setChat(res?.data?.conversations?.data))
      }
      
    });
  },[])
  
  return (    
    <>
    <Box sx={{
      position: "relative", width: 320, 
      backgroundColor: theme.palette.mode === 'light'? "#F8FAFF" : theme.palette.background.paper,
      boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
    }}>
      <Stack p={3} spacing={2} sx={{height:"100vh"}}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'>
          <Typography variant='h5'>
            Chats
          </Typography>
          {/* <IconButton>
            <CircleDashed />
          </IconButton> */}
        </Stack>

        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
          </Search>
        </Stack>

        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant='subtitle2' component={Link}>New Chat</Typography>
            <IconButton onClick={() =>{setOpenDialog(true)}}>
                <Plus style={{color: theme.palette.primary.main}}/>
            </IconButton>
        </Stack>
        <Divider/>
        {/* <Stack spacing={1}>
          <Stack direction='row' alignItems='center' spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>
              Archive
            </Button>
          </Stack>
          <Divider />
        </Stack> */}

        <Stack className='scrollbar' spacing={2} direction='column' sx={{flexGrow:1, overflow:'scroll', height:'100%'}}>

            {/* <Stack spacing={2.4}>
              <Typography variant='subtitle2' sx={{color:"#676767"}}>
                Pinned
              </Typography>
              {ChatList.filter((el)=> el.pinned).map((el,indx)=>{
                return <ChatElement key={indx}  {...el}/>
              })}
              
            </Stack> */}
          
          <Stack spacing={2.4}>
            <Typography variant='subtitle2' sx={{color:"#676767"}}>
              All Chats
            </Typography>
            {/* filter((el)=> !el.pinned) */}
            {chats.map((el,indx)=>{
              return <ChatElement key={indx} {...el}/>
            })}
            
          </Stack>
          
        </Stack>
      </Stack>

    </Box>
    {openDialog && <CreateChat open={openDialog} handleClose={handleCloseDialog}/>}    
    </>
  )
}

export default Chats