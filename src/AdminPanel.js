import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  IconButton,
  Badge,
  Avatar,
  useMediaQuery,
  Paper,
  Grid
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart,
  People,
  Business,
  Settings,
  Menu,
  Notifications,
  Logout,
  CheckCircle,
  Cancel,
  Edit,
  Delete,
  LocalFlorist,
  Cake,
  Favorite,
  //Grid
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const weddingTheme = createTheme({
  palette: {
    primary: {
      main: '#d81b60', // Romantic pink
      light: '#ff5c8d',
      dark: '#a00037',
    },
    secondary: {
      main: '#5e35b1', // Royal purple
      light: '#9162e4',
      dark: '#280680',
    },
    background: {
      default: '#fff9fb', // Very light pink
      paper: '#ffffff',
    },
    success: {
      main: '#4caf50', // For approved status
    },
    error: {
      main: '#f44336', // For rejected status
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Great Vibes", cursive, sans-serif',
    h4: {
      fontFamily: '"Great Vibes", cursive',
      fontSize: '2.5rem',
      color: '#5e35b1',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Playfair Display", serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          textTransform: 'none',
          fontSize: '0.875rem',
          fontWeight: 600,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #d81b60 30%, #5e35b1 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #c2185b 30%, #4a148c 90%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#fff9fb',
            fontFamily: '"Playfair Display", serif',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f0f0f0',
          },
        },
      },
    },
  },
});

const drawerWidth = 240;

const AdminPanel = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const isMobile = useMediaQuery(weddingTheme.breakpoints.down('sm'));

  // Sample Data with wedding-themed examples
  const [orders, setOrders] = useState([
    { id: 1, customer: 'Emma & James', vendor: 'Blossom Florals', date: '2023-06-15', status: 'Pending', total: 2800 },
    { id: 2, customer: 'Sophia & Michael', vendor: 'Gourmet Delights', date: '2023-06-18', status: 'Approved', total: 4200 },
    { id: 3, customer: 'Olivia & William', vendor: 'Elegant Venues', date: '2023-07-02', status: 'Pending', total: 5500 },
  ]);

  const [vendors, setVendors] = useState([
    { id: 1, name: 'Blossom Florals', email: 'contact@blossom.com', phone: '555-0101', status: 'Active' },
    { id: 2, name: 'Gourmet Delights', email: 'info@gourmet.com', phone: '555-0202', status: 'Active' },
    { id: 3, name: 'Elegant Venues', email: 'events@elegant.com', phone: '555-0303', status: 'Pending' },
  ]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOrderAction = (id, action) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: action } : order
    ));
  };

  const handleVendorAction = (id, action) => {
    setVendors(vendors.map(vendor =>
      vendor.id === id ? { ...vendor, status: action } : vendor
    ));
  };

  const deleteVendor = (id) => {
    setVendors(vendors.filter(vendor => vendor.id !== id));
  };

  // Enhanced DataGrid Columns with wedding theme
  const orderColumns = [
    { field: 'id', headerName: 'Order ID', width: 100 },
    { field: 'customer', headerName: 'Couple', width: 180 },
    { field: 'vendor', headerName: 'Vendor', width: 180 },
    { field: 'date', headerName: 'Wedding Date', width: 130 },
    { 
      field: 'total', 
      headerName: 'Total ($)', 
      width: 120,
      valueFormatter: (params) => `$${params.value.toLocaleString()}`
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellClassName: (params) => {
        if (params.value === 'Approved') return 'status-approved';
        if (params.value === 'Rejected') return 'status-rejected';
        return '';
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<CheckCircle color="success" />}
          label="Approve"
          onClick={() => handleOrderAction(params.id, 'Approved')}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<Cancel color="error" />}
          label="Reject"
          onClick={() => handleOrderAction(params.id, 'Rejected')}
          showInMenu
        />
      ],
    },
  ];

  const vendorColumns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Vendor Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      cellClassName: (params) => params.value.toLowerCase()
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 180,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit color="primary" />}
          label="Edit"
          onClick={() => navigate(`/admin/vendors/edit/${params.id}`)}
          showInMenu
        />,
        params.row.status === 'Pending' && (
          <GridActionsCellItem
            icon={<CheckCircle color="success" />}
            label="Approve"
            onClick={() => handleVendorAction(params.id, 'Active')}
            showInMenu
          />
        ),
        <GridActionsCellItem
          icon={<Delete color="error" />}
          label="Delete"
          onClick={() => deleteVendor(params.id)}
          showInMenu
        />
      ].filter(Boolean),
    },
  ];

  const drawer = (
    <Box sx={{ 
      background: 'linear-gradient(to bottom, #fff9fb, #ffffff)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        p: 2,
        background: 'linear-gradient(to right, #d81b60, #5e35b1)',
        color: 'white'
      }}>
        <LocalFlorist sx={{ mr: 1 }} />
        <Typography variant="h6" noWrap component="div" sx={{ fontFamily: '"Great Vibes", cursive' }}>
          Wedding Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {[
          { text: 'Dashboard', icon: <DashboardIcon color="primary" />, tab: 'dashboard' },
          { text: 'Orders', icon: <ShoppingCart color="primary" />, tab: 'orders' },
          { text: 'Vendors', icon: <Business color="primary" />, tab: 'vendors' },
          { text: 'Couples', icon: <People color="primary" />, tab: 'customers' },
          { text: 'Settings', icon: <Settings color="primary" />, tab: 'settings' },
        ].map((item) => (
          <ListItem 
            button 
            key={item.text}
            selected={activeTab === item.tab}
            onClick={() => setActiveTab(item.tab)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(216, 27, 96, 0.1)',
                borderRight: '3px solid #d81b60',
              },
              '&:hover': {
                backgroundColor: 'rgba(216, 27, 96, 0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ color: activeTab === item.tab ? '#d81b60' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontFamily: '"Playfair Display", serif',
                fontWeight: activeTab === item.tab ? 600 : 'normal'
              }} 
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Button 
          variant="outlined" 
          startIcon={<Logout />}
          onClick={() => navigate('/logout')}
          sx={{
            borderColor: '#d81b60',
            color: '#d81b60',
            '&:hover': {
              backgroundColor: 'rgba(216, 27, 96, 0.1)',
              borderColor: '#c2185b'
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={weddingTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: 'linear-gradient(to right, #d81b60, #5e35b1)',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ 
              flexGrow: 1,
              fontFamily: '"Playfair Display", serif'
            }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <Avatar 
              sx={{ 
                ml: 2, 
                bgcolor: 'secondary.main',
                width: 40,
                height: 40
              }}
            >
              A
            </Avatar>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            background: '#fff9fb',
            minHeight: '100vh'
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {activeTab === 'dashboard' && (
              <Paper sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3 
                }}>
                  <LocalFlorist color="primary" sx={{ mr: 1, fontSize: '2rem' }} />
                  <Typography variant="h4" component="h1">
                    Wedding Admin Dashboard
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6">Total Orders</Typography>
                      <Typography variant="h3" color="primary">24</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6">Active Vendors</Typography>
                      <Typography variant="h3" color="primary">18</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6">Pending Approvals</Typography>
                      <Typography variant="h3" color="primary">5</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6">Revenue</Typography>
                      <Typography variant="h3" color="primary">$42,800</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            )}

            {activeTab === 'orders' && (
              <Paper sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 3 
                }}>
                  <Typography variant="h4">
                    <Cake sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Wedding Orders
                  </Typography>
                  <Button 
                    variant="contained"
                    startIcon={<Favorite />}
                  >
                    New Report
                  </Button>
                </Box>
                <Box sx={{ height: 600, width: '100%' }}>
                  <DataGrid
                    rows={orders}
                    columns={orderColumns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    sx={{
                      '& .status-approved': {
                        color: weddingTheme.palette.success.main,
                        fontWeight: 'bold'
                      },
                      '& .status-rejected': {
                        color: weddingTheme.palette.error.main,
                        fontWeight: 'bold'
                      }
                    }}
                  />
                </Box>
              </Paper>
            )}

            {activeTab === 'vendors' && (
              <Paper sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 3 
                }}>
                  <Typography variant="h4">
                    <Business sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Vendor Management
                  </Typography>
                  <Button 
                    variant="contained"
                    onClick={() => navigate('/admin/vendors/add')}
                    startIcon={<Favorite />}
                  >
                    Add Vendor
                  </Button>
                </Box>
                <Box sx={{ height: 600, width: '100%' }}>
                  <DataGrid
                    rows={vendors}
                    columns={vendorColumns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    sx={{
                      '& .active': {
                        color: weddingTheme.palette.success.main,
                        fontWeight: 'bold'
                      },
                      '& .pending': {
                        color: weddingTheme.palette.warning.main,
                        fontWeight: 'bold'
                      }
                    }}
                  />
                </Box>
              </Paper>
            )}

            {/* Add other tabs content similarly */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPanel;