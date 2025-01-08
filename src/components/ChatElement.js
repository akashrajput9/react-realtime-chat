import { Avatar, Badge, Box, Stack, Typography } from '@mui/material';
import {useTheme , styled} from '@mui/material/styles';
import StyledBadge from './StyledBadge';

// {
//   "id": 2,
//   "name": "reiciendis officia cum",
//   "is_group": 1,
//   "created_at": "2025-01-08T15:15:00.000000Z",
//   "updated_at": "2025-01-08T15:15:00.000000Z",
//   "users": [
//       {
//           "id": 8,
//           "name": "Dr. Kristina Huels II",
//           "email": "hulda92@example.net",
//           "email_verified_at": "2025-01-08T15:15:00.000000Z",
//           "created_at": "2025-01-08T15:15:00.000000Z",
//           "updated_at": "2025-01-08T15:15:00.000000Z",
//           "pivot": {
//               "conversation_id": 2,
//               "user_id": 8
//           }
//       },
//       {
//           "id": 1,
//           "name": "Damien Kub",
//           "email": "akashrajput9@hotmail.com",
//           "email_verified_at": "2025-01-08T15:15:00.000000Z",
//           "created_at": "2025-01-08T15:15:00.000000Z",
//           "updated_at": "2025-01-08T15:15:00.000000Z",
//           "pivot": {
//               "conversation_id": 2,
//               "user_id": 1
//           }
//       },
//       {
//           "id": 11,
//           "name": "Garnet Schaden",
//           "email": "josefina.leannon@example.org",
//           "email_verified_at": "2025-01-08T15:15:00.000000Z",
//           "created_at": "2025-01-08T15:15:00.000000Z",
//           "updated_at": "2025-01-08T15:15:00.000000Z",
//           "pivot": {
//               "conversation_id": 2,
//               "user_id": 11
//           }
//       },
//       {
//           "id": 4,
//           "name": "Angelina Hill",
//           "email": "rohan.briana@example.org",
//           "email_verified_at": "2025-01-08T15:15:00.000000Z",
//           "created_at": "2025-01-08T15:15:00.000000Z",
//           "updated_at": "2025-01-08T15:15:00.000000Z",
//           "pivot": {
//               "conversation_id": 2,
//               "user_id": 4
//           }
//       },
//       {
//           "id": 6,
//           "name": "Rosemarie Bashirian",
//           "email": "gleichner.oren@example.org",
//           "email_verified_at": "2025-01-08T15:15:00.000000Z",
//           "created_at": "2025-01-08T15:15:00.000000Z",
//           "updated_at": "2025-01-08T15:15:00.000000Z",
//           "pivot": {
//               "conversation_id": 2,
//               "user_id": 6
//           }
//       }
//   ]
// }
//single chat element
const ChatElement = ({id,is_group,name,created_at,users,is_online,profile_photo}) => {
    const theme = useTheme();
    return (
      <Box sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === 'light'? "#fff" : theme.palette.background.default
      }}
        p={2}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'>
          <Stack direction='row' spacing={2}>
            {is_online ? <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot">
            <Avatar src={profile_photo} />
            </StyledBadge> : <Avatar src={profile_photo} /> }
            
            <Stack spacing={0.3}>
              <Typography variant='subtitle2'>
                {name}
              </Typography>
              <Typography variant='caption'>
                {/* {msg} */}
              </Typography>
            </Stack>
            </Stack>
            <Stack spacing={2} alignItems='center'>
              <Typography sx={{fontWeight:600}} variant='caption'>
                {created_at}
              </Typography>
              <Badge color='primary' badgeContent={4}>
  
              </Badge>
            </Stack>
          
          
        </Stack>
  
  
      </Box>
    )
  };

  export default ChatElement