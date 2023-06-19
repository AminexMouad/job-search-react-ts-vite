import React, { useMemo, useState } from 'react';
import { Box, Container, Pagination, SxProps } from '@mui/material';
import JobItem from '../components/JobItem';
import useJobs from '../hooks/useJobs';
import Loader from '../components/Loader';
import GenericComponentState from '../components/Generic';
import Header from '../components/Header';
import MobileFilterDrawer from '../components/MobileFilterDrawer';
import { useAppState } from '../hooks/useApp';
import FiltersForm from '../components/FiltersForm';
import useResponsive from '../hooks/useResponsive';
import { IJob } from '../interfaces/job.interface';

const HomePage: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [reOrderedJobs, setReOrderedJobs] = useState<IJob[]>([]);

  const { filters, jobCategories } = useAppState();
  const { isMobile } = useResponsive();
  const {
    joblist,
    isLoadingJobList,
    jobListError,
    refetchJob,
    currentPage,
    setCurrentPage,
    preparedJobList,
  } = useJobs({ shouldFilterJobs: true });

  const preparedJobForReOrder = useMemo(() => {
    if (
      reOrderedJobs.length > 0 &&
      (!filters || Object.keys(filters).length === 0)
    ) {
      return reOrderedJobs;
    } else {
      return preparedJobList;
    }
  }, [reOrderedJobs, filters, preparedJobList]);

  const onDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    const draggedIndex: number = parseInt(
      event.dataTransfer.getData('text/plain')
    );
    const newJobItemsOrder = [...preparedJobForReOrder];

    const newOrderedItems = Array.from(newJobItemsOrder);
    [newOrderedItems[draggedIndex], newOrderedItems[index]] = [
      newOrderedItems[index],
      newOrderedItems[draggedIndex],
    ];

    setReOrderedJobs(newOrderedItems);
  };

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
            {!isMobile && (
              <Box>
                <FiltersForm />
              </Box>
            )}

            <Box sx={styles.listContainer}>
              {preparedJobForReOrder?.map((job, index: number) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('Text', index.toString());
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => onDrop(e, index)}>
                  <JobItem job={job} />
                </div>
              ))}
            </Box>
            {joblist &&
              ((filters && Object.keys(filters).length === 0) || !filters) && (
                <Box sx={styles.paginationContainer}>
                  <Pagination
                    defaultPage={currentPage}
                    page={currentPage}
                    onChange={(_, page) => {
                      setCurrentPage(page);
                      setReOrderedJobs([]);
                    }}
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
    m: '40px 0',
  } as SxProps,
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    m: '30px 0',
  } as SxProps,
};

export default HomePage;
