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
  Checkbox,
  Chip,
} from '@mui/material';
import Background from '../../assets/Images/roles-bg.jpg';
import { ArrowArcLeft } from 'phosphor-react';
import { apifetch } from '../../utils/fetchApi';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

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
  const [selectedPermission, setSelectedPermission] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [userPassword,setUserPassword] = useState("");
  const [userRePassword,setUserRePassword] = useState("");
  const [loading , setLoading] = useState(false);
  const {user,token} = useSelector(state => state.auth);
  const navigate = useNavigate();
  
  const handlePermissionChange = (event) => {
    console.log('event.target.value',event.target.value)
    setSelectedPermission(event.target.value); // MUI already returns an array
  };

  const handleDirectLogin = async (id) => {
    setLoading(true);
    try {
      
      const resp = await apifetch("/auth/login",token,{id:id},"POST")
      console.log('login response',resp);
      if(resp?.success){
        dispatch(login(resp?.data))
        navigate("/app");
  
      }else{
        alert(resp?.message);
      }
      
    } catch (error) {
        console.log(error);
        
    }
    setLoading(false)
  }
  

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
          <FormControl fullWidth sx={{ maxWidth: 400 }}> {/* Set max width */}
            <InputLabel>Permissions</InputLabel>
            <Select
              multiple
              value={selectedPermission}
              onChange={handlePermissionChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} />
                  ))}
                </Box>
              )}
            >
              {permissions.map((permission) => (
                <MenuItem key={permission.id} value={permission.name}>
                  <Checkbox checked={selectedPermission.includes(permission.name)} />
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

      {user.user_permissions.includes('role-list') ?<Box
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
                    </IconButton> */}
                    {/* <IconButton onClick={() => handleEditRole(role)} color="primary">
                      ✏️
                    </IconButton> */}
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

: null }
      

      

   
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
      {user.user_permissions.includes('user-list') ? <Box
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
                {/* <TableCell>Role</TableCell> */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((usr) => (
                <TableRow key={usr.id}>
                  <TableCell>{usr.id}</TableCell>
                  <TableCell>{usr.name}</TableCell>
                  {/* <TableCell>{user.role}</TableCell> */}
                  <TableCell>
                    {user.user_permissions.includes("direct-user-login") ?
                     <IconButton color="error" onClick={(e) => handleDirectLogin(usr.id)}>
                      <ArrowArcLeft />
                    </IconButton>: null}
                    
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
      </Box>: null}
      

      

   
   
    </Box>

    </Box>
  );
};

export default RolesPermissions;
