// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from '@mui/material';
// import Background from '../../assets/Images/roles-bg.jpg';
// import { ArrowArcLeft } from 'phosphor-react';

// const RolesPermissions = () => {
//   // State for user management
//   const [users, setUsers] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [userPhone, setUserPhone] = useState('');
//   const [userRole, setUserRole] = useState('');

//   // State for roles and permissions management
//   const [roles, setRoles] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [roleName, setRoleName] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');
//   const [selectedPermission, setSelectedPermission] = useState('');
//   const [editingRole, setEditingRole] = useState(null);

//   useEffect(() => {
//     // Simulated API calls (replace with real APIs)
//     setUsers([
//       { id: 1, name: 'Arvin', email: 'john@example.com', phone: '1234567890', role: 'Admin' },
//       { id: 1, name: 'Akash', email: 'john@example.com', phone: '1234567890', role: 'Production' },
//       { id: 1, name: 'Anas', email: 'john@example.com', phone: '1234567890', role: 'Admin' },
//       { id: 1, name: 'Neha', email: 'john@example.com', phone: '1234567890', role: 'User' },
//     ]);
//     setRoles([
//       { id: 1, name: 'Admin' },
//       { id: 2, name: 'Production' },
//       { id: 3, name: 'Sales' },
//       { id: 4, name: 'Management' },
//     ]);
//     setPermissions([
//       { id: 1, name: 'Send Message' },
//       { id: 2, name: 'Delete Message' },
//       { id: 3, name: 'Receive Message' },
//     ]);
//   }, []);

//   // Handlers for user management
//   const handleAddUser = () => {
//     if (!userName || !userEmail || !userPhone || !userRole) return;
//     setUsers((prevUsers) => [
//       ...prevUsers,
//       {
//         id: users.length + 1,
//         name: userName,
//         email: userEmail,
//         phone: userPhone,
//         role: roles.find((role) => role.id === userRole)?.name || '',
//       },
//     ]);
//     setUserName('');
//     setUserEmail('');
//     setUserPhone('');
//     setUserRole('');
//   };

//   const handleDeleteUser = (userId) => {
//     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
//   };

//   // Handlers for roles and permissions management
//   const handleCreateRole = () => {
//     if (!roleName) return;
//     setRoles((prevRoles) => [...prevRoles, { id: roles.length + 1, name: roleName }]);
//     setRoleName('');
//   };

//   const handleEditRole = (role) => {
//     setEditingRole(role);
//     setRoleName(role.name);
//   };

//   const handleUpdateRole = () => {
//     setRoles((prevRoles) =>
//       prevRoles.map((role) => (role.id === editingRole.id ? { ...role, name: roleName } : role))
//     );
//     setEditingRole(null);
//     setRoleName('');
//   };

//   const handleDeleteRole = (roleId) => {
//     setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
//   };

//   const handleAssignPermission = () => {
//     if (!selectedRole || !selectedPermission) return;
//     alert(`Assigned ${selectedPermission} to Role ID: ${selectedRole}`);
//   };

//   return (
//     <Box style={{
//       padding: 4,
//       width: '100%',
//       backgroundImage: `url(${Background})`,
//       backgroundSize: 'cover',
//     }}>
    
//     <Box
//       sx={{
        
//         // minHeight: '50vh',
//         display: 'grid',
//         gridTemplateColumns: 'repeat(2, 1fr)',
//         gap: 2,
//         padding:2,
        
//       }}
//     >
//       {/* User Creation Box */}
//       <Box
//         sx={{
//           background: 'white',
//           padding: 3,
//           borderRadius: 2,
//           boxShadow: 3,
//           display: 'flex',
//           flexDirection: 'column',
//           width:'60%',
//           marginLeft: 'auto'
//         }}
//       >
//         <Box sx={{ marginBottom: 3 }}>
//             <Typography variant="h4" gutterBottom>
//               Roles and Permissions Management
//             </Typography>
//             <TextField
//               label="Role Name"
//               variant="outlined"
//               fullWidth
//               value={roleName}
//               onChange={(e) => setRoleName(e.target.value)}
//             />
//             <Button
//               onClick={editingRole ? handleUpdateRole : handleCreateRole}
//               variant="contained"
//               sx={{ marginTop: 2 }}
//             >
//               {editingRole ? 'Update Role' : 'Create Role'}
//             </Button>
//           </Box>

//           <Box sx={{ marginBottom: 3 }}>
//             <FormControl fullWidth>
//               <InputLabel>Role</InputLabel>
//               <Select
//                 value={selectedRole}
//                 label="Role"
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               >
//                 {roles.map((role) => (
//                   <MenuItem key={role.id} value={role.id}>
//                     {role.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           <Box sx={{ marginBottom: 3 }}>
//             <FormControl fullWidth>
//               <InputLabel>Permission</InputLabel>
//               <Select
//                 value={selectedPermission}
//                 label="Permission"
//                 onChange={(e) => setSelectedPermission(e.target.value)}
//               >
//                 {permissions.map((permission) => (
//                   <MenuItem key={permission.id} value={permission.name}>
//                     {permission.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           <Button onClick={handleAssignPermission} variant="contained">
//             Assign Permission
//           </Button>
//       </Box>

//       {/* User List Box */}
//       <Box
//         sx={{
//           background: 'white',
//           padding: 3,
//           borderRadius: 2,
//           boxShadow: 3,
//           width:'60%',
//           marginRight: 'auto'
//         }}
//       >
        
//         <Typography variant="h5" gutterBottom>
//             Roles List
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Role ID</TableCell>
//                   <TableCell>Role Name</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {roles.map((role) => (
//                   <TableRow key={role.id}>
//                     <TableCell>{role.id}</TableCell>
//                     <TableCell>{role.name}</TableCell>
//                     <TableCell>
//                     <IconButton onClick={() => handleDeleteRole(role.id)} color="error">
//                         🗑️
//                       </IconButton>
//                       <IconButton onClick={() => handleEditRole(role)} color="primary">
//                         ✏️
//                       </IconButton>
                     
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//       </Box>



      

   
//     </Box>

//     <Box
//       sx={{
        
//         // minHeight: '50vh',
//         display: 'grid',
//         gridTemplateColumns: 'repeat(2, 1fr)',
//         gap: 2,
//         padding:0,
//       }}
//     >
//       {/* User Creation Box */}
//       <Box
//         sx={{
//           background: 'white',
//           padding: 3,
//           borderRadius: 2,
//           boxShadow: 3,
//           display: 'flex',
//           flexDirection: 'column',
//           width:'60%',
//           marginLeft: 'auto'
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           User Management
//         </Typography>
//         <TextField
//           label="User Name"
//           variant="outlined"
//           fullWidth
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           label="User Email"
//           variant="outlined"
//           fullWidth
//           value={userEmail}
//           onChange={(e) => setUserEmail(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           label="User Phone"
//           variant="outlined"
//           fullWidth
//           value={userPhone}
//           onChange={(e) => setUserPhone(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <InputLabel>Role</InputLabel>
//           <Select
//             value={userRole}
//             onChange={(e) => setUserRole(e.target.value)}
//           >
//             {roles.map((role) => (
//               <MenuItem key={role.id} value={role.id}>
//                 {role.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button variant="contained" onClick={handleAddUser}>
//           Add User
//         </Button>
//       </Box>

//       {/* User List Box */}
//       <Box
//         sx={{
//           background: 'white',
//           padding: 3,
//           borderRadius: 2,
//           boxShadow: 3,
//           width:'60%',
//           marginRight: 'auto'
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Users List
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>User ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                   <TableCell>
                    
                    
//                     <IconButton
//                       onClick={() => handleDeleteUser(user.id)}
//                       color="error"
//                     >
//                       🗑️
//                     </IconButton>
//                     {user.role == "Admin" ? <></>: <IconButton
//                       onClick={() => handleDeleteUser(user.id)}
//                       color="error"
//                     >
//                       <ArrowArcLeft />
//                     </IconButton>}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

      

   
   
//     </Box>

//     </Box>
//   );
// };

// export default RolesPermissions;

import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { ArrowArcLeft } from 'phosphor-react';
import {apifetch} from '../../utils/fetchApi';

const RolesPermissions = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    fetchRoles();
    fetchUsers();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    const response = await apifetch('/roles');
    if (response.success) setRoles(response.data);
  };

  const fetchUsers = async () => {
    const response = await apifetch('/users');
    if (response.success) setUsers(response.data);
  };

  const fetchPermissions = async () => {
    const response = await apifetch('/permissions');
    if (response.success) setPermissions(response.data);
  };

  const handleCreateRole = async () => {
    if (!roleName) return;
    const response = await apifetch('/role/create', null, { name: roleName }, 'POST');
    console.log(response,'api create role')
    if (response.success) {
      fetchRoles();
      setRoleName('');
    }
  };

  const handleDeleteRole = async (roleId) => {
    await apifetch(`/roles/${roleId}`, null, {}, 'DELETE');
    fetchRoles();
  };

  const handleAssignPermission = async () => {
    if (!selectedRole || !selectedPermission) return;
    await apifetch(`/roles/${selectedRole}/permissions`, null, { permission: selectedPermission }, 'POST');
    alert(`Assigned ${selectedPermission} to Role ID: ${selectedRole}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Roles and Permissions Management
      </Typography>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1, background: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <TextField
            label="Role Name"
            fullWidth
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <Button onClick={handleCreateRole} variant="contained" sx={{ marginTop: 2 }}>
            Create Role
          </Button>
        </Box>
        <Box sx={{ flex: 1, background: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5">Roles List</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role ID</TableCell>
                  <TableCell>Role Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.id}</TableCell>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteRole(role.id)} color="error">
                        🗑️
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default RolesPermissions;
