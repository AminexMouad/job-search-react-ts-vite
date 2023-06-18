import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  SxProps,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import theme from '../../theme/theme';
import { IJob } from '../../interfaces/job.interface';
import moment from 'moment';
import JobInfo from './JobInfo';
import Tag from '../Tag';

interface JobItemProps {
  job: IJob;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  const jobType = useMemo(() => {
    if (job) {
      const type = /Type/i;
      return job.tags.find((tag) => type.test(tag.name));
    }
    return null;
  }, [job]);

  const JobCategory = useMemo(() => {
    const categoryNameType = /Category/i;
    const category = job.tags.find((tag) => categoryNameType.test(tag.name));
    return category;
  }, [job.tags]);

  return (
    <Accordion>
      <AccordionSummary>
        <Box sx={styles.summaryContainer}>
          <Box>
            <Typography sx={styles.jobName} variant='h6'>
              {job.name}
              <Typography>{JobCategory?.value}</Typography>
            </Typography>

            <Typography
              variant='subtitle1'
              color={theme.palette.secondary.main}>
              {job.location.text} - Posted{' '}
              {moment(job.created_at).format('DD/MM/YYYY HH:mm')}
            </Typography>
          </Box>
          <Box>
            <Typography color={theme.palette.secondary.main}>
              {jobType?.value}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {job.tags.length > 0 && (
          <JobInfo
            label='Position informations :'
            children={
              <Box mt={'10px'} display={'flex'} flexWrap={'wrap'} gap={'10px'}>
                {job.tags?.map((tag, index) => (
                  <Tag name={tag.name} value={tag.value} key={index} />
                ))}
              </Box>
            }
          />
        )}

        {job.summary && (
          <JobInfo label='Position Description:' value={job.summary} />
        )}
        {job.sections.length > 0 &&
          job.sections.map((section, index) => (
            <JobInfo
              key={index}
              label={section.name || 'Job Description :'}
              value={section.description}
            />
          ))}
        {job.skills?.length > 0 && (
          <JobInfo
            label='Required Skills:'
            children={
              <Box mt={'10px'} display={'flex'} flexWrap={'wrap'} gap={'10px'}>
                {job.skills?.map((skill, index) => (
                  <Chip label={skill.name} key={index} />
                ))}
              </Box>
            }
          />
        )}
        {job.certifications.length > 0 && (
          <JobInfo
            label='Tasks:'
            children={
              <Box mt={'10px'} display={'flex'} flexWrap={'wrap'} gap={'10px'}>
                {job.certifications?.map((certificate, index) => (
                  <Chip label={certificate.name} key={index} />
                ))}
              </Box>
            }
          />
        )}
        {job.tasks.length > 0 && (
          <JobInfo
            label='Required Certifications:'
            children={
              <Box mt={'10px'} display={'flex'} flexWrap={'wrap'} gap={'10px'}>
                {job.tasks?.map((task, index) => (
                  <Chip label={task.name} key={index} />
                ))}
              </Box>
            }
          />
        )}
        {job.languages.length > 0 && (
          <JobInfo
            label='Spoken languages:'
            children={
              <Box mt={'10px'} display={'flex'} flexWrap={'wrap'} gap={'10px'}>
                {job.languages?.map((language, index) => (
                  <Chip
                    label={language.name}
                    sx={{
                      textTransform: 'capitalize',
                    }}
                    key={index}
                  />
                ))}
              </Box>
            }
          />
        )}
        {job.ranges_date.length > 0 && (
          <Box>
            <Typography
              variant='h6'
              mt={'10px'}
              color={theme.palette.primary.main}>
              Position availabilities :
            </Typography>
            {job.ranges_date.map((range, index) => (
              <Box key={index} sx={styles.dateRangeContainer} mt={'5px'}>
                <Box sx={styles.dateReangeItem}>
                  <Typography sx={styles.dateRangeLabel}>From :</Typography>
                  <Typography>
                    {moment(range.value_min).format('DD/MM/YYYY')}
                  </Typography>
                </Box>
                <Box sx={styles.dateReangeItem}>
                  <Typography sx={styles.dateRangeLabel}>To :</Typography>
                  <Typography>
                    {moment(range.value_max).format('DD/MM/YYYY')}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {job.location && (
          <JobInfo
            label='Job location:'
            children={
              <Box sx={styles.postionLocationContainer}>
                <img
                  style={styles.imgPlaceholder}
                  src={
                    'https://subli.info/wp-content/uploads/2015/05/google-maps-blur.png'
                  }
                />
                <a
                  target='_blank'
                  href={`https://www.google.com/maps?q=${job.location.lat},${job.location.lng}
`}>
                  <Button
                    variant='contained'
                    sx={styles.positionLocationButton}>
                    Show on google maps
                  </Button>
                </a>
              </Box>
            }
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

const styles = {
  summaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  } as SxProps,
  jobName: {
    color: theme.palette.primary.main,
  } as SxProps,
  dateRangeContainer: {
    display: 'flex',
    gap: '10px',
  } as SxProps,
  dateReangeItem: {
    display: 'flex',
    gap: '10px',
  } as SxProps,
  dateRangeLabel: {
    fontSize: '17px',
    fontWeight: 500,
    color: theme.palette.secondary.main,
  } as SxProps,
  imgPlaceholder: {
    width: '100%',
  },
  postionLocationContainer: {
    position: 'relative',
  } as SxProps,
  positionLocationButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } as SxProps,
};

export default JobItem;
