import React, { useEffect, useState } from 'react';
import { Box, Typography, Card } from '@mui/material';
import { User, UsersThree, Gear, Envelope } from 'phosphor-react';
import { apifetch } from '../../utils/fetchApi';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const {token} = useSelector(state => state.auth);
  const [data,setData] = useState();
  console.log(token,'token')
  useEffect(() => {
    apifetch("/dashboard-data",token).then(res =>{
      console.log(res,'res dashboard api')
      setData(res.data);
    })
  },[])
  return (
    <Box
      sx={{
        padding: 4,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FDEFDB',
        display: 'flex',
        alignItems: 'center', // Keeps everything vertically centered
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {/* Left Section */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', minWidth: '250px',marginRight:'40px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Application Analytics
        </Typography>
      </Box>

      {/* Right Section - Boxes */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: '250px' }}>
        <InfoCard icon={<User size={40} />} title="Total Users" count={data?.users} />
        <InfoCard icon={<Envelope size={40} />} title="Total Chats" count={data?.chats} />
        <InfoCard icon={<UsersThree size={40} />} title="Total Groups" count={data?.groups} />
      </Box>
    </Box>
  );
};

// Reusable Info Card Component
const InfoCard = ({ icon, title, count }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: '500px',
        minHeight: '250px', // Ensures each card is at least 200px in height
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        {icon}
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#F9A825',
          borderRadius: '50%',
          width: 50,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        {count}
      </Box>
    </Card>
  );
};

export default Dashboard;
