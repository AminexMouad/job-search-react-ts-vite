import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import theme from '../../theme/theme';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { jobFilterSortByType } from '../../interfaces/filters.interface';
import StorageEnums from '../../enums/storage.enum';
import { removeItem, setItem } from '../../utils/storage';
import { useAppDispatch, useAppState } from '../../hooks/useApp';
import { IAppState } from '../../interfaces/stores/appStore.interface';
import useResponsive from '../../hooks/useResponsive';

const sortByItems = [
  {
    label: 'Newest postions',
    value: 'created_at',
  },
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Category',
    value: 'category',
  },
];

interface FiltersFormProps {
  closeDrawer?: () => void;
}

const FiltersForm: React.FC<FiltersFormProps> = ({ closeDrawer }) => {
  const appDispatch = useAppDispatch();
  const { filters, jobCategories } = useAppState();
  const { isMobile } = useResponsive();

  const validationSchema = yup.object({
    name: yup.string(),
    category: yup.string(),
    sortBy: yup.string().nullable(),
  });

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: filters.name,
      category: filters.category,
      sortBy: filters.sortBy,
    },
  });

  const onSubmit = (values: {
    name: string;
    category: string;
    sortBy: jobFilterSortByType;
  }) => {
    const { name, category, sortBy } = values;
    const preparedFilters = {
      ...(name && { name }),
      ...(category && { category: category }),
      ...(sortBy && { sortBy }),
    };
    if (values) {
      appDispatch({
        type: 'SET_STATE',
        payload: {
          filters: preparedFilters,
        } as IAppState,
      });
    }
    setItem(StorageEnums.FILTER_OPTIONS, preparedFilters);
    if (closeDrawer) closeDrawer();
  };

  const onResetFilters = () => {
    removeItem(StorageEnums.FILTER_OPTIONS);
    appDispatch({
      type: 'SET_STATE',
      payload: {
        filters: {},
      },
    });
    reset();
    if (closeDrawer) closeDrawer();
  };

  return (
    <Box sx={styles.container(isMobile)}>
      <Box>
        <Box>
          <Typography variant='h6' color={theme.palette.primary.main}>
            Filter by:
          </Typography>
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
                {...register('category')}
                defaultValue={filters?.category}>
                {jobCategories.map((category, index) => (
                  <MenuItem key={index} value={category.value}>
                    {category.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box mt={'10px'}>
          <Typography variant='h6' color={theme.palette.primary.main}>
            Sort by:
          </Typography>

          <RadioGroup defaultValue={watch('sortBy') || ''}>
            {sortByItems.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio {...register('sortBy')} />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </Box>
      </Box>

      <Box sx={styles.buttonContainer(isMobile)}>
        <Button
          variant='contained'
          sx={!isMobile ? styles.button : {}}
          onClick={handleSubmit(onSubmit)}
          fullWidth={isMobile}>
          Search
        </Button>
        {filters && Object?.keys(filters)?.length !== 0 && (
          <Button
            variant='outlined'
            onClick={onResetFilters}
            sx={!isMobile ? styles.button : {}}
            fullWidth={isMobile}>
            Reset filters
          </Button>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  container: (isMobile: boolean) =>
    ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      ...(!isMobile && {
        borderBottom: '1px solid #D3D3D3D3',
        paddingBottom: '30px',
      }),
    } as SxProps),
  buttonContainer: (isMobile: boolean) =>
    ({
      display: 'flex',
      gap: '20px',
      flexDirection: isMobile ? 'column' : 'row',
      ...(isMobile && {
        mt: '30px',
      }),
    } as SxProps),
  button: {
    width: '30%',
  } as SxProps,
};

export default FiltersForm;
