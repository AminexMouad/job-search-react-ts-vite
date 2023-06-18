import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import theme from '../../theme/theme';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IJobFilters } from '../../interfaces/filters.interface';
import { ITag } from '../../interfaces/job.interface';

interface MobileFilterDrawerProps {
  state: boolean;
  closeDrawer: () => void;
  filters: IJobFilters | undefined;
  setFilters: React.Dispatch<React.SetStateAction<IJobFilters | undefined>>;
  jobCategories: ITag[];
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  state,
  closeDrawer,
  filters,
  setFilters,
  jobCategories,
}) => {
  const validationSchema = yup.object({
    name: yup.string(),
    category: yup.string(),
    sortBy: yup.string().oneOf(['created_at', 'name', 'category']),
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
  });

  const onSubmit = (values: {
    name: string;
    category: string;
    sortBy: string;
  }) => {
    const { name, category } = values;
    if (values) {
      setFilters({
        ...(name && { name }),
        ...(category && { category: category }),
      });
    }

    closeDrawer();
  };

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
        <Typography
          variant='h5'
          fontWeight={500}
          mb={'20px'}
          color={theme.palette.primary.main}></Typography>
        <Box>
          <TextField
            placeholder='Search by job name'
            {...register('name')}
            fullWidth
          />
          <Box mt={'10px'}>
            <FormControl fullWidth>
              <InputLabel id='category'>Filter by category</InputLabel>
              <Select
                labelId='category'
                label='Filter by category'
                {...register('category')}>
                {jobCategories.map((category, index) => (
                  <MenuItem key={index} value={category.value}>
                    {category.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mt={'10px'}>
            <Typography variant='h6' color={theme.palette.primary.main}>
              Sort by:
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label='Oldest postions'
              />
              <FormControlLabel control={<Checkbox />} label='Name' />
              <FormControlLabel control={<Checkbox />} label='Category' />
            </FormGroup>
          </Box>
          <Button
            variant='contained'
            fullWidth
            onClick={handleSubmit(onSubmit)}
            sx={{
              mt: '20px',
            }}>
            Search
          </Button>
          {filters && (
            <Button
              variant='outlined'
              fullWidth
              onClick={() => {
                setFilters(undefined);
                reset();
                closeDrawer();
              }}
              sx={{
                mt: '20px',
              }}>
              Reset filters
            </Button>
          )}
        </Box>
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
