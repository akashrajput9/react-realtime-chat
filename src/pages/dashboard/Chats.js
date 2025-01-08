import { Box, IconButton, Stack, Typography, InputBase, Button, Divider, Avatar, Badge } from
  '@mui/material'
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
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


const Chats = () => {
  const theme = useTheme();
  const [chatList,setChatList] = useState([]);
  const { token } = useSelector((state) => state.auth);
  useEffect(()=>{
    
    apifetch("/chat",token).then((res)=>{
      if(res?.status == 401){
        console.log('lgin')
        dispatch(logout())
      }else if(res.success == 1){
        setChatList(res?.data?.conversations)  
      }
      
    });
  },[])
  
  return (    
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

        <Stack spacing={1}>
          <Stack direction='row' alignItems='center' spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>
              Archive
            </Button>
          </Stack>
          <Divider />
        </Stack>

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
            {chatList.map((el,indx)=>{
              return <ChatElement key={indx} {...el}/>
            })}
            
          </Stack>
          
        </Stack>
      </Stack>

    </Box>
  )
}

export default Chats