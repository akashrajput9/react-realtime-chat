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

const Dashboard = () => {
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

  useEffect(() => {
    // Simulated API calls (replace with real APIs)
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', role: 'Admin' },
    ]);
    setRoles([
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Production' },
      { id: 3, name: 'Sales' },
      { id: 4, name: 'Management' },
    ]);
    setPermissions([
      { id: 1, name: 'Send Message' },
      { id: 2, name: 'Delete Message' },
      { id: 3, name: 'Receive Message' },
    ]);
  }, []);

  // Handlers for user management
  const handleAddUser = () => {
    if (!userName || !userEmail || !userPhone || !userRole) return;
    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: users.length + 1,
        name: userName,
        email: userEmail,
        phone: userPhone,
        role: roles.find((role) => role.id === userRole)?.name || '',
      },
    ]);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserRole('');
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Handlers for roles and permissions management
  const handleCreateRole = () => {
    if (!roleName) return;
    setRoles((prevRoles) => [...prevRoles, { id: roles.length + 1, name: roleName }]);
    setRoleName('');
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setRoleName(role.name);
  };

  const handleUpdateRole = () => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => (role.id === editingRole.id ? { ...role, name: roleName } : role))
    );
    setEditingRole(null);
    setRoleName('');
  };

  const handleDeleteRole = (roleId) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
  };

  const handleAssignPermission = () => {
    if (!selectedRole || !selectedPermission) return;
    alert(`Assigned ${selectedPermission} to Role ID: ${selectedRole}`);
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
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 3,
        padding:2
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

          <Button onClick={handleAssignPermission} variant="contained">
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
        }}
      >
        
        <Typography variant="h5" gutterBottom>
            Roles List
          </Typography>
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
                      <IconButton onClick={() => handleEditRole(role)} color="primary">
                        ✏️
                      </IconButton>
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

      <Box
        sx={{
          background: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        
        
        <Typography variant="h5" gutterBottom>
            Permissions List
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Permission ID</TableCell>
                  <TableCell>Permission Name</TableCell>
                  <TableCell>Permission Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>{permission.id}</TableCell>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditRole(permission)} color="primary">
                        ✏️
                      </IconButton>
                      <IconButton onClick={() => handleDeleteRole(permission.id)} color="error">
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

    <Box
      sx={{
        
        // minHeight: '50vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 3,
        marginTop:2,
        padding:2
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
          label="User Phone"
          variant="outlined"
          fullWidth
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
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
        <Button variant="contained" onClick={handleAddUser}>
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
        }}
      >
        <Typography variant="h5" gutterBottom>
          Users List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteUser(user.id)}
                      color="error"
                    >
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

export default Dashboard;
