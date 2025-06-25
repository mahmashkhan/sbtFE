import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  CircularProgress,
} from '@mui/material';
import { getHighlight } from '../../../api/HighlightApi';
import { useNavigate } from 'react-router-dom';

import AdminLayout from '../../pages/AdminLayout';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

export default function MyHighlight() {
  const [highlight, setHighlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHighlight = async () => {
      try {
        const response = await getHighlight();
        setHighlight(response.data.highlight[0]);
      } catch (error) {
        console.error('Failed to fetch highlight:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHighlight();
  }, []);

  return (
    <AdminLayout>
      
      <Container maxWidth="md" sx={{ py: 6 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="bold" >
              Video Highlight
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/add/highlight')}
              startIcon={<ChangeCircleIcon />}
            >
              Change
            </Button>
          </Box>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        

          {loading ? (
            <Box display="flex" justifyContent="center" mt={6}>
              <CircularProgress />
            </Box>
          ) : highlight ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%', // 16:9 aspect ratio
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
              }}
            >
              <iframe
                src={highlight}
                title="Highlight Video"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          ) : (
            <Typography color="text.secondary" textAlign="center" mt={4}>
              No video highlight available.
            </Typography>
          )}
        </Paper>
      </Container>
    </AdminLayout>
  );
}
