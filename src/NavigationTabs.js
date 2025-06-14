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
  Toolbar
} from '@mui/material';
import { 
  Home, 
  Info, 
  Work, 
  Person,
  Menu as MenuIcon
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
    '/profile': 3
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
      default:
        navigate('/dashboard');
    }
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
          </Toolbar>
        </AppBar>
        
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: 240,
              top: '64px' // To account for the AppBar height
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
  );
};

export default NavigationTabs;