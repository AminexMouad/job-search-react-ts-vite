import React, { useState } from 'react';
import { Box, Container, Pagination, SxProps } from '@mui/material';
import JobItem from '../components/JobItem';
import useJobs from '../hooks/useJobs';
import Loader from '../components/Loader';
import GenericComponentState from '../components/Generic';
import Header from '../components/Header';
import MobileFilterDrawer from '../components/MobileFilterDrawer';
import { useAppState } from '../hooks/useApp';

const HomePage: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { filters, jobCategories } = useAppState();

  const {
    joblist,
    isLoadingJobList,
    jobListError,
    refetchJob,
    currentPage,
    setCurrentPage,
    preparedJobList,
  } = useJobs({ shouldFilterJobs: true });

  return (
    <React.Fragment>
      <Header openDrawer={() => setOpenDrawer(true)} />
      <Container>
        {isLoadingJobList ? (
          <Loader />
        ) : (
          <GenericComponentState
            error={jobListError}
            noData={preparedJobList?.length === 0}
            refetch={refetchJob}>
            <Box sx={styles.listContainer}>
              {preparedJobList?.map((job) => (
                <JobItem key={job.id} job={job} />
              ))}
            </Box>
            {joblist?.data && joblist?.data?.jobs.length > 0 && !filters && (
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
      <MobileFilterDrawer
        state={openDrawer}
        closeDrawer={() => setOpenDrawer(!openDrawer)}
        jobCategories={jobCategories}
      />
    </React.Fragment>
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
