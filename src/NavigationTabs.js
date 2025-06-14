import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import { Home, Info, Work, Person } from '@mui/icons-material';

const NavigationTabs = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
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
  };

  return (
    <Tabs 
      value={value} 
      onChange={handleChange}
      textColor="inherit"
      sx={{
        '& .MuiTabs-indicator': {
          backgroundColor: 'white',
        }
      }}
    >
      <Tab label="Home" icon={<Home />} iconPosition="start" />
      <Tab label="About" icon={<Info />} iconPosition="start" />
      <Tab label="Services" icon={<Work />} iconPosition="start" />
      <Tab label="Profile" icon={<Person />} iconPosition="start" />
    </Tabs>
  );
};

export default NavigationTabs;