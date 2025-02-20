import { Avatar, AvatarGroup, Badge, Box, Stack, Typography } from '@mui/material';
import {useTheme } from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import groupAvatar from '../assets/Images/group-icon.png';
import { dispatch } from '../redux/store';
import { setMessages } from '../redux/slices/messageSlice';
import { useSelector } from 'react-redux';
import { apifetch } from '../utils/fetchApi';
import { setRead } from '../redux/slices/chatSlice';


const ChatElement = (props) => {
    const {id,is_group,name,users,created_at,is_online,last_message,unread_count} = props;
    const theme = useTheme();
    const profile_photo = is_group ? groupAvatar :users[0].profile_photo;
    const user_name = is_group? name: users[0].name;
    
    // const { messages } = useSelector((state) => state.messages);
    const { token } = useSelector((state) => state.auth);
    const handleClick = async () => {
      const data = await apifetch("/chat/messages",token,{conversation_id:id})
      let dispatch_data = data?.data;
      console.log('seting conversation element',props)
      dispatch_data.conversation_element = props;
      dispatch(setMessages(dispatch_data));
      dispatch(setRead(props.id))
      
    }
    return (
      <Box sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === 'light'? "#fff" : theme.palette.background.default
      }}
        onClick={handleClick}
        p={2}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'>
          <Stack direction='row' spacing={2}>
            {is_online ? <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot">
            <Avatar src={profile_photo} />
            </StyledBadge> : <Avatar src={profile_photo} /> }
            
            <AvatarGroup />
            <Stack spacing={0.3}>
              <Typography variant='subtitle2'>
                {user_name}
              </Typography>
              <Typography variant='caption'>
                {last_message?.content}
              </Typography>
            </Stack>
            </Stack>
            <Stack spacing={2} alignItems='center'>
              <Typography sx={{fontWeight:600}} variant='caption'>
                {created_at}
              </Typography>
              <Badge color='primary' badgeContent={unread_count}>
              </Badge>
            </Stack>
          
          
        </Stack>
  
  
      </Box>
    )
  };

  export default ChatElement