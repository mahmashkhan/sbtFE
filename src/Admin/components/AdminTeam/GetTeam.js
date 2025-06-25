import React from 'react';
import AdminLayout from '../../pages/AdminLayout';

import { deleteTeam, getTeam } from '../../../api/TeamApi';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModalLayout from '../Modal';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function GetTeam() {
  const [response, setResponse] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getTeam();
      setResponse(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (memberId) => {
    await deleteTeam(memberId);
    setOpen(false);
    const updatedData = await getTeam();
    setResponse(updatedData);
  };

  const handleOpenModal = (id) => {
    setId(id);
    setOpen(true);
  };

  return (
    <AdminLayout>



      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
          mt: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
          Our Team
        </Typography>
        <Button
          onClick={() => navigate('/admin/add/team')}
          variant="outlined"
          startIcon={<GroupAddIcon />}

        >
          Add Team Member
        </Button>
      </Box>

      {/* Grid Section */}
      <Grid container spacing={3} sx={{ p: 4 }}>
        {response.map((item, index) => (

          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: '#121212',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              maxWidth: 320, // keeps it centered and consistent
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.name}
              sx={{
                height: 300,
                width: '100%',
                objectFit: 'cover',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ wordBreak: 'break-word', mb: 1 }}
              >
                {item.link}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>

            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'flex-end', p: 2 }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/admin/edit/team/${item._id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleOpenModal(item._id)}
              >
                Delete
              </Button>
            </Stack>
          </Card>

        ))}
      </Grid>


      <ModalLayout open={open} setOpen={setOpen} onDelete={() => handleDelete(id)} />
    </AdminLayout>
  );
}
