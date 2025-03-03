import { Box, Divider, IconButton, Link, Stack, Typography, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { DotsThreeVertical, DownloadSimple, Image } from 'phosphor-react';
import React from 'react';
import {Message_options} from '../../data'
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { deleteMessage } from '../../redux/slices/messageSlice';
import { apifetch } from '../../utils/fetchApi';

const DocMsg = ({el,menu}) => {
    const theme = useTheme();
    const {token} = useSelector(state => state.auth);
    const {user}  = useSelector((state)=>state.auth);
    const is_incoming = user.id !== el.user_id;
    const handleDownloadFile = (el) => {
        // apifetch("/chat/delete",token,{message_id:el.id});

    }
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
        <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
            }}>
        <Stack spacing={2}>
            <Stack p={2} spacing={3} direction='row' alignItems='center' 
            sx={{backgroundColor:theme.palette.background.paper, borderRadius:1}}>
                <Image size={48}/>
                <Typography variant='caption'>
                    {el.content}
                </Typography>
                <IconButton onClick={event => handleDownloadFile(el)}>
                    <DownloadSimple/>
                </IconButton>
            </Stack>
            <Typography variant='body2' sx={{color: el.incoming ? theme.palette.text : '#fff' }} >
                {el.message}
            </Typography>
        </Stack>
        </Box>
        {menu && !is_incoming && <MessageOptions el={el} />}
        
    </Stack>
  )
}

const LinkMsg = ({el,menu}) => {
    const theme = useTheme();
    const {user}  = useSelector((state)=>state.auth);
    const is_incoming = user.id !== el.user_id;
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
        <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
            }}>
        <Stack spacing={2}>
            <Stack p={2} spacing={3} alignItems='start'
             sx={{backgroundColor:theme.palette.background.paper, borderRadius: 1}}>
                <img src={el.preview} alt={el.message} style={{maxHeight:210, borderRadius:'10px'}}/>
                <Stack spacing={2}>
                    <Typography variant='subtitle2'>Creating Chat App</Typography>
                    <Typography variant='subtitle2' sx={{color:theme.palette.primary.main}} 
                    component={Link} to="//https://www.youtube.com">www.youtube.com</Typography>
                </Stack>
                <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
                    {el.message}
                </Typography>
            </Stack>
        </Stack>
        </Box>
        {menu && !is_incoming && <MessageOptions el={el} />}
    </Stack>
  )
}

const ReplyMsg = ({el, menu}) => {
    const theme = useTheme();
    const {user}  = useSelector((state)=>state.auth);
    const is_incoming = user.id !== el.user_id;
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
        <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
            }}>
        <Stack spacing={2}>
            <Stack p={2} direction='column' spacing={3} alignItems='center'
            sx={{backgroundColor:theme.palette.background.paper, borderRadius:1}}>
                <Typography variant='body2' color={theme.palette.text}>
                    {el.message}
                </Typography>    
            </Stack>
            <Typography variant='body2' color={ el.incoming ? theme.palette.text : '#fff'}>
                {el.reply}
            </Typography>
        </Stack>
        </Box>
        {menu && !is_incoming && <MessageOptions el={el} />}
    </Stack>
  )
}

const MediaMsg = ({el,menu}) => {
    const theme = useTheme();
    const {user}  = useSelector((state)=>state.auth);
    const is_incoming = user.id !== el.user_id;
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
        <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
            }}>
                <Stack spacing={1}>
                    <img src={el.img} alt={el.message} style={{maxHeight: 210 , borderRadius:'10px'}}/>
                    <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
            {menu && !is_incoming && <MessageOptions el={el} />}
    </Stack>
  )
}

const TextMsg = ({el,menu}) => {
    const theme = useTheme();
    const {user}  = useSelector((state)=>state.auth);
    const is_incoming = user.id !== el.user_id;
    return (
        <Stack direction='row' justifyContent={is_incoming ? 'start' : 'end'}>
            <Box p={1.5} sx={{
                backgroundColor: is_incoming ? theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
            }}>
                <Typography variant='body2' color={is_incoming ? theme.palette.text : '#fff'}>
                    {el.content}
                </Typography>
            </Box>
            {menu && !is_incoming && <MessageOptions el={el} />}
        </Stack>
    )
}

const TimeLine = ({ el }) => {
    const theme = useTheme();
    return <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Divider width='46%' />
        <Typography variant='caption' sx={{ color: theme.palette.text }}>
            {el.text}
        </Typography>
        <Divider width='46%' />
    </Stack>
}

const MessageOptions = ({el}) => {
    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {token} = useSelector(state => state.auth);
  const open = Boolean(anchorEl);
  const handleClick = (event, type = null) => {
        setAnchorEl(event.currentTarget);
        if(type == null){
            return;
        }
        if(type == 'delete'){
            handleDelete();
        }

        handleClose();
    };

  const handleDelete = () => {
    if(el?.id != null){
        apifetch("/chat/delete",token,{message_id:el.id},"POST").then(res => {
            console.log(res,'delete api res');
            dispatch(deleteMessage(el.id))
        })
        
        
    }
  }  

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <DotsThreeVertical 
    id="basic-button"
    aria-controls={open ? 'basic-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    onClick={(event) => handleClick(event)}
    size={20}
    />

    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      <Stack spacing={1} px={1}>
        {Message_options.map((el, index) => (
                <MenuItem onClick={(event) => handleClick(event, el.type)} key={index} >
                    {el.title}
                </MenuItem>
            ))}

      </Stack>
      </Menu>
    </>
  )
}


// should not be default export, because we need to export multiple things
export { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg }