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
import Background from '../../assets/Images/roles-bg.jpg'

const RolesPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    // Fetch roles and permissions
    const fetchData = async () => {
      try {
        // Simulating API calls (replace these with actual API calls)
        setRoles([{ id: 1, name: 'Admin' }, { id: 2, name: 'Production' },{ id: 3, name: 'Sales' },{ id: 4, name: 'Management' }]);
        setPermissions([{ id: 1, name: 'Send Message' }, { id: 2, name: 'Delete Message' },{id:3,name: "Receive Message"}]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
    <Box sx={{ padding: 3,width:'100%',backgroundImage: `url(${Background})`,backgroundSize:'cover'  }}>
      
      <Typography variant="h4" gutterBottom>
        Roles and Permissions Management
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Column: Form Section */}
        <Box sx={{ flex: 1,background:'white',padding:2,borderRadius:2 }}>
          <Box sx={{ marginBottom: 3 }}>
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

        {/* Middle Column: Roles List */}
        <Box sx={{ flex: 1 }}>
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

        {/* Right Column: Permissions List */}
        <Box sx={{ flex: 1 }}>
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
    </Box>
  );
};

export default RolesPermissions;
