import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, Button, Drawer, SxProps, Typography } from '@mui/material';
import React from 'react';
import theme from '../../theme/theme';
import { ITag } from '../../interfaces/job.interface';
import FiltersForm from '../FiltersForm';

interface MobileFilterDrawerProps {
  state: boolean;
  closeDrawer: () => void;
  jobCategories: ITag[];
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  state,
  closeDrawer,
}) => {
  return (
    <Drawer
      anchor={'left'}
      open={state}
      PaperProps={{
        sx: { width: '100%' },
      }}>
      <Box sx={styles.container}>
        <Box sx={styles.containerTopHeader}>
          <Typography
            variant='h5'
            fontWeight={500}
            color={theme.palette.primary.main}>
            Filters
          </Typography>
          <Button onClick={closeDrawer}>
            <MenuOpenIcon
              htmlColor={theme.palette.secondary.main}
              sx={{
                width: '35px',
                height: '35px',
              }}
            />
          </Button>
        </Box>
        <FiltersForm closeDrawer={closeDrawer} />
      </Box>
    </Drawer>
  );
};

const styles = {
  container: {
    padding: '10px 20px',
  } as SxProps,
  containerTopHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps,
  formContainer: {} as SxProps,
};

export default MobileFilterDrawer;
