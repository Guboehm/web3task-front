import { useParams } from "react-router-dom"
import { Box, Card, CardContent, Container, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Helmet } from 'react-helmet-async';
import SuspenseLoader from 'src/components/SuspenseLoader'
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect, useState } from "react";
import CardTasks from "../../../../components/Task/CardTask";

const DetailsTask = () => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const taskService = useTaskService();
    const { taskId } = useParams();
    const { handleTask, handleReview, taskData, taskReview, loading, error } = useTaskServiceHook(taskService);

    const fetchData = async () => {
        await handleTask(Number(taskId));
        await handleReview(Number(taskId));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Web3Task - Task Details</title>
            </Helmet>

            <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '40px'
            }}>
                <Box sx={{ width: 709, height: '100%', mt: 6 }} >
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'max-content'} >
                        {
                            loading ? <SuspenseLoader />
                                :
                                (
                                    <>
                                        <Box width={smDown ? '100%' : 709} mt={smDown ? 2 : 0}>
                                            <CardTasks taskId={taskId} taskData={taskData} loading={loading} />

                                            <Box mt={4} width={smDown ? '100%' : 679} display={'flex'} flexDirection={smDown ? 'column' : 'row'} justifyContent={smDown ? 'center' : 'space-between'} alignItems={'center'}/>

                                            <Box mt={4} width={smDown ? '100%' : 679} display={'flex'} flexDirection={smDown ? 'column' : 'row'} justifyContent={smDown ? 'center' : 'space-between'} alignItems={'center'}>
                                                <Card sx={{ width: '100%', height: 200, justifyContent: smDown ? 'center' : 'left', ml: smDown ? 10 : 0 }}>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h4" textAlign={'left'} component="div">
                                                            Description
                                                        </Typography>
                                                        <Divider />
                                                        <Typography variant="h6" textAlign={'left'} mt={1} component="div" style={{
                                                            overflowY: 'scroll',
                                                            maxHeight: '140px',
                                                            scrollbarWidth: 'thin',
                                                            scrollbarColor: '#fff transparent',
                                                            wordBreak: 'break-all'
                                                        }}>
                                                            {taskData ? taskData.description : 'No description provided for this task.'}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>

                                            <Box mt={4} width={smDown ? '100%' : 679} display={'flex'} flexDirection={smDown ? 'column' : 'row'} justifyContent={smDown ? 'center' : 'space-between'} alignItems={'center'}>
                                                <Card sx={{ width: '100%', height: 200, justifyContent: smDown ? 'center' : 'left', ml: smDown ? 10 : 0 }}>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h4" textAlign={'left'} component="div">
                                                            Reviews
                                                        </Typography>
                                                        <Divider />
                                                        <Typography variant="h6" textAlign={'left'} mt={1} height={119} component="div" style={{
                                                            overflowY: 'scroll',
                                                            maxHeight: '200px',
                                                            scrollbarWidth: 'thin',
                                                            scrollbarColor: '#fff transparent'
                                                        }}>
                                                            {taskReview && taskReview.length > 0 ? ([...taskReview].reverse().map((review: any, index: React.Key) => {
                                                                return (
                                                                    <div>
                                                                        <Typography variant="h6" textAlign={'left'} key={'review' + index} mt={1} mb={1} component="div" style={{ wordBreak: 'break-all' }}>
                                                                            {review}
                                                                        </Typography>
                                                                        <Divider />
                                                                    </div>
                                                                )
                                                            })) : <Typography variant="h6" textAlign={'left'} mt={1} component="div" style={{ wordBreak: 'break-all' }}>
                                                                No reviews provided for this task.
                                                            </Typography>}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Box>
                                    </>
                                )
                        }
                    </Box>
                </Box >
            </Container>
        </>
    )
}

export default DetailsTask