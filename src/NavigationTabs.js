import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Tabs, 
  Tab, 
  useMediaQuery, 
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  AppBar,
  Toolbar,
  Button
} from '@mui/material';
import { 
  Home, 
  Info, 
  Work, 
  Person,
  Menu as MenuIcon,
  Login as LoginIcon
} from '@mui/icons-material';

const NavigationTabs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Map routes to tab values
  const routeToValue = {
    '/dashboard': 0,
    '/about': 1,
    '/services': 2,
    '/profile': 3,
    '/login': 4 // Added login route
  };
  
  const [value, setValue] = useState(routeToValue[location.pathname] || 0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (newValue) => {
    setValue(newValue);
    switch(newValue) {
      case 0:
        navigate('/dashboard');
        break;
      case 1:
        navigate('/about');
        break;
      case 2:
        navigate('/services');
        break;
      case 3:
        navigate('/profile');
        break;
      case 4:
        navigate('/login');
        break;
      default:
        navigate('/dashboard');
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleSignIn = () => {
    navigate('/login'); // Changed from '/signin' to '/login' for consistency
    setValue(4); // Set the active tab value for login
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // For mobile view
  if (isMobile) {
    return (
      <>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Button 
              color="inherit" 
              startIcon={<LoginIcon />}
              onClick={handleSignIn}
              sx={{ 
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Sign In
            </Button>
          </Toolbar>
        </AppBar>
        
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: 240,
              top: '64px'
            },
          }}
        >
          <List>
            <ListItem 
              button 
              selected={value === 0}
              onClick={() => handleNavigation(0)}
            >
              <ListItemIcon>
                <Home color={value === 0 ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <Divider />
            <ListItem 
              button 
              selected={value === 1}
              onClick={() => handleNavigation(1)}
            >
              <ListItemIcon>
                <Info color={value === 1 ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
            <Divider />
            <ListItem 
              button 
              selected={value === 2}
              onClick={() => handleNavigation(2)}
            >
              <ListItemIcon>
                <Work color={value === 2 ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItem>
            <Divider />
            <ListItem 
              button 
              selected={value === 3}
              onClick={() => handleNavigation(3)}
            >
              <ListItemIcon>
                <Person color={value === 3 ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem 
              button 
              selected={value === 4}
              onClick={handleSignIn}
            >
              <ListItemIcon>
                <LoginIcon color={value === 4 ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          </List>
        </Drawer>

        {/* Bottom Navigation */}
        <Paper sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          boxShadow: '0px -2px 10px rgba(0,0,0,0.1)'
        }} elevation={3}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => handleNavigation(newValue)}
            showLabels
            sx={{
              '& .Mui-selected': {
                color: theme.palette.primary.main,
              }
            }}
          >
            <BottomNavigationAction label="Home" icon={<Home />} />
            <BottomNavigationAction label="About" icon={<Info />} />
            <BottomNavigationAction label="Services" icon={<Work />} />
            <BottomNavigationAction label="Profile" icon={<Person />} />
          </BottomNavigation>
        </Paper>
      </>
    );
  }

  // For desktop view
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tabs 
        value={value} 
        onChange={(event, newValue) => handleNavigation(newValue)}
        textColor="inherit"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
            height: 4
          },
          '& .MuiTab-root': {
            minHeight: 64,
            padding: '6px 16px'
          }
        }}
      >
        <Tab 
          label="Home" 
          icon={<Home />} 
          iconPosition="start" 
          sx={{ textTransform: 'none', fontSize: '0.875rem' }} 
        />
        <Tab 
          label="About" 
          icon={<Info />} 
          iconPosition="start" 
          sx={{ textTransform: 'none', fontSize: '0.875rem' }} 
        />
        <Tab 
          label="Services" 
          icon={<Work />} 
          iconPosition="start" 
          sx={{ textTransform: 'none', fontSize: '0.875rem' }} 
        />
        <Tab 
          label="Profile" 
          icon={<Person />} 
          iconPosition="start" 
          sx={{ textTransform: 'none', fontSize: '0.875rem' }} 
        />
      </Tabs>
      <Button
        variant={value === 4 ? "contained" : "outlined"}
        startIcon={<LoginIcon />}
        onClick={handleSignIn}
        sx={{
          ml: 2,
          textTransform: 'none',
          borderRadius: '20px',
          color: value === 4 ? '#fff' : theme.palette.primary.main,
          backgroundColor: value === 4 ? theme.palette.primary.main : 'transparent',
          borderColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: value === 4 ? theme.palette.primary.dark : theme.palette.primary.light,
            borderColor: theme.palette.primary.dark
          }
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default NavigationTabs;