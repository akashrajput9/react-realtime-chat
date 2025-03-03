import { Box, Stack, Typography, Link, IconButton, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react';
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from '../../components/Scrollbar';
import '../../css/global.css';
import { ChatList } from '../../data';
import ChatElement from '../../components/ChatElement';
import CreateGroup from '../../sections/main/CreateGroup';
import { apifetch } from '../../utils/fetchApi';
import { dispatch } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';

const Group = () => {
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const [chatList,setChatList] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const handleCloseDialog = () =>{
        setOpenDialog(false);
      }

      useEffect(()=>{

        apifetch("/chat",token,{filter:'groups'}).then((res)=>{
            console.log('api response',res);
          if(res?.status == 401){
            console.log('lgin')
            dispatch(logout())
          }else if(res.success == 1){
            setChatList(res?.data?.conversations?.data)  
          }
          
        });
      },[])
    return (
    <>
    <Stack direction={'row'} sx={{width:'100%'}}>
        {/* Left */}
        <Box sx={{height:'100vh' , 
        backgroundColor:(theme) =>theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background , 
        width:320,
        boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
            <Stack p={3} spacing={2} sx={{maxHeight:'100vh'}}>
                <Stack>
                    <Typography variant='h5'>Group</Typography>
                </Stack>
                <Stack sx={{width:'100%'}}>
                <Search>
                    <SearchIconWrapper>
                    <MagnifyingGlass color="#709CE6" />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
                </Search>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='subtitle2' component={Link}>Create New Group</Typography>
                    <IconButton onClick={() =>{setOpenDialog(true)}}>
                        <Plus style={{color: theme.palette.primary.main}}/>
                    </IconButton>
                </Stack>
                <Divider/>
                <Stack spacing={3} className='scrollbar'  sx={{flexGrow:1, overflowY:'scroll', height:'100%'}}>
                    <SimpleBarStyle  timeout={500} clickOnTrack={false}>
                        <Stack spacing={2.5}>
                            {/*  */}
                            {/* <Typography variant='subtitle2' sx={{color:'#676667'}}>Pinned</Typography> */}
                            {/* Pinned */}
                            {/* {ChatList.filter((el)=> el.pinned).map((el)=>{
                                return <ChatElement  {...el}/>
                            })} */}

                              {/*  */}
                              <Typography variant='subtitle2' sx={{color:'#676667'}}>All Groups</Typography>
                            {/* Chat List */}
                            {/* filter((el)=> !el.pinned) */}
                            {chatList.filter(el => el.is_group).map((el)=>{
                                return <ChatElement  {...el}/>
                            })}
                        </Stack>
                    </SimpleBarStyle>
                </Stack>
            </Stack>
        </Box>

        {/* Right */}

    </Stack>
    {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog}/>}
    </>
  )
}

export default Group