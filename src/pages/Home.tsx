import React from 'react';
import Header from '../components/Header';
import { Box, Container, SxProps } from '@mui/material';
import JobItem from '../components/JobItem';
import useJobs from '../hooks/useJobs';
import Loader from '../components/Loader';
import GenericComponentState from '../components/Generic';

const HomePage: React.FC = () => {
  const { joblist, isLoadingJobList, jobListError, refetchJob } = useJobs();

  return (
    <div>
      <Header />
      <Container>
        {isLoadingJobList ? (
          <Loader />
        ) : (
          <GenericComponentState
            error={jobListError}
            noData={joblist?.data.jobs.length === 0}
            refetch={refetchJob}>
            <Box sx={styles.listContainer}>
              {joblist?.data.jobs.map((job) => (
                <JobItem key={job.id} job={job} />
              ))}
            </Box>
          </GenericComponentState>
        )}
      </Container>
    </div>
  );
};

const styles = {
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    m: '20px 0',
  } as SxProps,
};

export default HomePage;
