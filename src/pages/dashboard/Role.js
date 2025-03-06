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
import Background from '../../assets/Images/roles-bg.jpg';
import { ArrowArcLeft } from 'phosphor-react';
import { apifetch } from '../../utils/fetchApi';
import { useSelector } from 'react-redux';

const RolesPermissions = () => {
  // State for user management
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userRole, setUserRole] = useState('');

  // State for roles and permissions management
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');
  const [editingRole, setEditingRole] = useState(null);
  const {token} = useSelector(state => state.auth);
  const [userPassword,setUserPassword] = useState("");
  const [userRePassword,setUserRePassword] = useState("");
  const [loading , setLoading] = useState(false);

  

  // Handlers for user management
  const handleAddUser = () => {
    if (!userName || !userEmail || !userRole || !userPassword || !userRePassword) {
      alert("All fields are required");
      return
    };

    if(userPassword != userRePassword){
      alert("Password and verify password should be same");
    }
    setLoading(true);

    apifetch("/users",token,{
      "name": userName,
      "email": userEmail,
      "password": userPassword,
      "verify_password": userRePassword,
      "role": userRole
    },"POST").then(res => {
      if(res.success){
        alert("User created successfully");
        setUsers((prevUsers) => [
          ...prevUsers,
          res.data,
        ]);
        setUserName('');
        setUserEmail('');
        setUserPhone('');
        setUserRole('');
      }else{
        alert(res.message)
      }
      setLoading(false);
    });
    
  };

  const handleDeleteUser = (userId) => {
    setLoading(true)
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setLoading(false);
  };


  

  const handleEditRole = (role) => {
    setLoading(true);
    setEditingRole(role);
    setRoleName(role.name);
    setLoading(false);
  };

  const handleUpdateRole = () => {
    setLoading(true);
    setRoles((prevRoles) =>
      prevRoles.map((role) => (role.id === editingRole.id ? { ...role, name: roleName } : role))
    );
    setEditingRole(null);
    setRoleName('');
    setLoading(false);
  };

  


    useEffect(() => {
      fetchRoles();
      fetchUsers();
      fetchPermissions();
    }, []);

  const fetchRoles = async () => {
    setLoading(true);
    const response = await apifetch('/roles',token);
    if (response.success) setRoles(response.data);
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    const response = await apifetch('/users',token);
    if (response.success) setUsers(response.data);
    setLoading(false);
  };

  const fetchPermissions = async () => {
    setLoading(true);
    const response = await apifetch('/permissions',token);
    if (response.success) setPermissions(response.data);
    setLoading(false);
  };

  const handleCreateRole = async () => {
    setLoading(true);
    if (!roleName) return;
    const response = await apifetch('/role/create', token, { name: roleName }, 'POST');
    console.log(response,'api create role')
    if (response.success) {
      setRoles([...roles,response.data]);
      fetchRoles();
      setRoleName('');
    }
    setLoading(false);
  };

  const handleDeleteRole = async (roleId) => {
    // await apifetch(`/roles/${roleId}`, null, {}, 'DELETE');
    fetchRoles();
  };

  const handleAssignPermission = async () => {
    if (!selectedRole || !selectedPermission) return;
    setLoading(true);
    const response = await apifetch(`/roles/${selectedRole}/permissions`, token, { permission: selectedPermission }, 'POST');
    if(response.success){
      const rolename = roles.filter(res => res.id == selectedRole)[0];
      alert(`Assigned ${selectedPermission} to Role : ${rolename?.name}`);
    }else{
      alert(response.message);
    }
    setLoading(false);
    
  };

  return (
    <Box style={{
      padding: 4,
      width: '100%',
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
    }}>
    
    <Box
      sx={{
        
        // minHeight: '50vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 2,
        padding:2,
        
      }}
    >
      {/* User Creation Box */}
      <Box
        sx={{
          background: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          width:'60%',
          marginLeft: 'auto'
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h4" gutterBottom>
              Roles and Permissions Management
            </Typography>
            <TextField
              label="Role Name"
              variant="outlined"
              fullWidth
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
            <Button
              disabled={loading}
              onClick={editingRole ? handleUpdateRole : handleCreateRole}
              variant="contained"
              sx={{ marginTop: 2 }}
            >
              {editingRole ? 'Update Role' : 'Create Role'}
            </Button>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={selectedRole}
                label="Role"
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Permission</InputLabel>
              <Select
                value={selectedPermission}
                label="Permission"
                onChange={(e) => setSelectedPermission(e.target.value)}
              >
                {permissions.map((permission) => (
                  <MenuItem key={permission.id} value={permission.name}>
                    {permission.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button onClick={handleAssignPermission} disabled={loading} variant="contained">
            Assign Permission
          </Button>
      </Box>

      {/* User List Box */}
      <Box
        sx={{
          background: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          width:'60%',
          marginRight: 'auto'
        }}
      >
        
        <Typography variant="h5" gutterBottom>
            Roles List
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 300, overflow: 'auto' }}>
          <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role ID</TableCell>
                  <TableCell>Role Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody  >
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.id}</TableCell>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>
                    {/* <IconButton onClick={() => handleDeleteRole(role.id)} color="error">
                        🗑️
                      </IconButton>
                      <IconButton onClick={() => handleEditRole(role)} color="primary">
                        ✏️
                      </IconButton> */}
                     
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Box>



      

   
    </Box>

    <Box
      sx={{
        
        // minHeight: '50vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 2,
        padding:0,
      }}
    >
      {/* User Creation Box */}
      <Box
        sx={{
          background: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          width:'60%',
          marginLeft: 'auto'
        }}
      >
        <Typography variant="h5" gutterBottom>
          User Management
        </Typography>
        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="User Email"
          variant="outlined"
          fullWidth
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="User Password"
          variant="outlined"
          fullWidth
          value={userPassword}
          type='password'
          onChange={(e) => setUserPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Retype Password"
          variant="outlined"
          fullWidth
          value={userRePassword}
          type='password'
          onChange={(e) => setUserRePassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" disabled={loading} onClick={handleAddUser}>
          Add User
        </Button>
      </Box>

      {/* User List Box */}
      <Box
        sx={{
          background: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          width:'60%',
          marginRight: 'auto'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Users List
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 300, overflow: 'auto' }}>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                {/* <TableCell>Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  {/* <TableCell>{user.role}</TableCell> */}
                  <TableCell>
                    {user.role}
                    
                    {/* <IconButton
                      onClick={() => handleDeleteUser(user.id)}
                      color="error"
                    >
                      🗑️
                    </IconButton>
                    {user.role == "Admin" ? <></>: <IconButton
                      onClick={() => handleDeleteUser(user.id)}
                      color="error"
                    >
                      <ArrowArcLeft />
                    </IconButton>} */}
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
// import { ArrowArcLeft } from 'phosphor-react';
// import {apifetch} from '../../utils/fetchApi';
// import { useSelector } from 'react-redux';

// const RolesPermissions = () => {
//   const [users, setUsers] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [roleName, setRoleName] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');
//   const [selectedPermission, setSelectedPermission] = useState('');
//   const [editingRole, setEditingRole] = useState(null);
//   const {token} = useSelector(state => state.auth);
//   useEffect(() => {
//     fetchRoles();
//     fetchUsers();
//     fetchPermissions();
//   }, []);

//   const fetchRoles = async () => {
//     const response = await apifetch('/roles',token);
//     if (response.success) setRoles(response.data);
//   };

//   const fetchUsers = async () => {
//     const response = await apifetch('/users',token);
//     if (response.success) setUsers(response.data);
//   };

//   const fetchPermissions = async () => {
//     // const response = await apifetch('/permissions');
//     // if (response.success) setPermissions(response.data);
//   };

//   const handleCreateRole = async () => {
//     if (!roleName) return;
//     const response = await apifetch('/role/create', token, { name: roleName }, 'POST');
//     console.log(response,'api create role')
//     if (response.success) {
//       setRoles([...roles,response.data]);
//       fetchRoles();
//       setRoleName('');
//     }
//   };

//   const handleDeleteRole = async (roleId) => {
//     // await apifetch(`/roles/${roleId}`, null, {}, 'DELETE');
//     fetchRoles();
//   };

//   const handleAssignPermission = async () => {
//     if (!selectedRole || !selectedPermission) return;
//     // await apifetch(`/roles/${selectedRole}/permissions`, null, { permission: selectedPermission }, 'POST');
//     alert(`Assigned ${selectedPermission} to Role ID: ${selectedRole}`);
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Roles and Permissions Management
//       </Typography>
//       <Box sx={{ display: 'flex', gap: 3 }}>
//         <Box sx={{ flex: 1, background: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
//           <TextField
//             label="Role Name"
//             fullWidth
//             value={roleName}
//             onChange={(e) => setRoleName(e.target.value)}
//           />
//           <Button onClick={handleCreateRole} variant="contained" sx={{ marginTop: 2 }}>
//             Create Role
//           </Button>
//         </Box>
//         <Box sx={{ flex: 1, background: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
//           <Typography variant="h5">Roles List</Typography>
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
//                       <IconButton onClick={() => handleDeleteRole(role.id)} color="error">
//                         🗑️
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default RolesPermissions;
