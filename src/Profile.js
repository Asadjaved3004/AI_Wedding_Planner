import { useState, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Avatar, 
  Button, 
  TextField,
  Paper
} from '@mui/material';
import { CameraAlt } from '@mui/icons-material';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: '16px' }}>
        <Typography variant="h3" gutterBottom sx={{ 
          fontFamily: '"Great Vibes", cursive',
          color: '#d81b60',
          textAlign: 'center',
          mb: 4
        }}>
          Your Profile
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={profileImage}
            sx={{ 
              width: 150, 
              height: 150,
              mb: 2,
              border: '4px solid #e0b0ff'
            }}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            startIcon={<CameraAlt />}
            onClick={triggerFileInput}
            sx={{
              mb: 4,
              background: 'linear-gradient(to right, #d81b60, #5e35b1)',
              '&:hover': {
                background: 'linear-gradient(to right, #c2185b, #4a148c)',
              }
            }}
          >
            Upload Photo
          </Button>
        </Box>

        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Wedding Date"
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.5,
            background: 'linear-gradient(to right, #d81b60, #5e35b1)',
            '&:hover': {
              background: 'linear-gradient(to right, #c2185b, #4a148c)',
            }
          }}
        >
          Save Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;