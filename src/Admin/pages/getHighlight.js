import React from 'react'
import { Box, Button } from '@mui/material'
import { getHighlight } from '../../api/HighlightApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function getHighlight() {
    const [highlight, setHighlight] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchHighlight = async () => {
            const response = await getHighlight()
            setHighlight(response.data.highlight[0]);
           
        }
        fetchHighlight();
    })
    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
       <Box sx={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end'}} onClick={()=>{navigate('/admin/add/highlight')}}>     <Button variant='outlined'>Add Highlight</Button></Box>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '960px',
                    mx: 'auto',
                    paddingTop: '56.25%', // 16:9 aspect ratio
                }}
            >
                {highlight && <iframe
                    src={highlight}
                    // title="Creative Team"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        borderRadius: '10px'
                    }}
                    allow="fullscreen"
                />}
            </Box>
        </Box>
    )
}
