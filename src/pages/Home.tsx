import React from 'react';
import { Box, Container, Pagination, SxProps } from '@mui/material';
import JobItem from '../components/JobItem';
import useJobs from '../hooks/useJobs';
import Loader from '../components/Loader';
import GenericComponentState from '../components/Generic';

const HomePage: React.FC = () => {
  const {
    joblist,
    isLoadingJobList,
    jobListError,
    refetchJob,
    currentPage,
    setCurrentPage,
  } = useJobs();

  return (
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
          {joblist?.data && joblist?.data?.jobs.length > 0 && (
            <Box sx={styles.paginationContainer}>
              <Pagination
                defaultPage={currentPage}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                count={joblist.meta.maxPage || 0}
                color='primary'
              />
            </Box>
          )}
        </GenericComponentState>
      )}
    </Container>
  );
};

const styles = {
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    m: '20px 0',
  } as SxProps,
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
  } as SxProps,
};

export default HomePage;
