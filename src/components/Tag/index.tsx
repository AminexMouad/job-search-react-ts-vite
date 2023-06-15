import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import theme from '../../theme/theme';

interface TagProps {
  name: string;
  value: string;
}

const Tag: React.FC<TagProps> = ({ name, value }) => {
  return (
    <Box sx={styles.tagItem}>
      <Typography sx={styles.tagLabel}>{name} :</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

const styles = {
  TagContaner: {
    display: 'flex',
    gap: '10px',
  } as SxProps,
  tagItem: {
    display: 'flex',
    gap: '10px',
  } as SxProps,
  tagLabel: {
    fontSize: '17px',
    fontWeight: 500,
    color: theme.palette.secondary.main,
  } as SxProps,
};

export default Tag;
