import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import CardMultiTasks from "../../../components/Task/CardMultiTasks";
import usePagination from "src/components/Pagination";
import SearchFilters from "src/components/Task/SearchFiltersTasks";
import { useSearchFilters } from "src/hooks/useSearchFilters";
import { Helmet } from "react-helmet-async";
import { useConnect } from 'wagmi';

const HomeTasks = () => {
    const taskService = useTaskService();
    const { handleCountTasks, handleMultiTask, multiTasksData, loading } = useTaskServiceHook(taskService);
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { filter: filterTasks } = useSearchFilters();
    const [tasksPerPage, setTasksPerPage] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [maxTasks, setMaxTasks] = useState<number>(20);
    const [minimumTasks, setMinimumTasks] = useState<number>(1);
    const { currentPage, Pagination } = usePagination();
    const { isConnected, status, isDisconnected } = useConnect();

const fetchData = async () => {
    try {
        const count = await taskService.countTasks();
        await handleMultiTask(minimumTasks, parseInt(count), false);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

    const maxReward = multiTasksData?.reduce((acc, curr) => {
        const parsedReward = Number.parseFloat(curr.reward)

        return parsedReward > acc ? parsedReward : acc
    }, 0) || 0

    const filteredMultiTasks = filterTasks(multiTasksData || [])

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Web3Task</title>
            </Helmet>

            <Box>
                <Box>
                    <Grid display={'flex'} spacing={1} ml={mdDown ? -3 : 15} style={{ width: '92%' }} >
                        <Grid item xs={mdDown ? 4 : 2} ml={smDown && 1.5} mt={5} display={'flex'}>
                            {isConnected && <SearchFilters maxReward={maxReward} />}
                        </Grid>

                        <Grid item xs={mdDown ? 8 : 10} ml={smDown && -2} mt={smDown && -2} style={{ width: '92%' }}>
                            { isDisconnected && status === 'disconnected' && (
                                <div style={{ textAlign: 'center', marginTop: '200px' }}>
                                    <img src={'/static/images/user/profile/wallet.svg'} alt={'Connect Wallet'} />
                                    <p style={{
                                        color: '#FFF',
                                        textAlign: 'center',
                                        fontFamily: 'Inter',
                                        fontSize: '65px',
                                        fontStyle: 'normal',
                                        fontWeight: 700,
                                        marginBottom: '5px',
                                        marginTop: '5px'

                                    }}>
                                        Connect Wallet
                                    </p>
                                    <p style={{
                                        color: '#FFF',
                                        textAlign: 'center',
                                        fontFamily: 'Inter',
                                        fontSize: '21px',
                                        fontStyle: 'normal',
                                        fontWeight: 700,
                                        marginTop: '5px'
                                    }}>
                                        You need to connect your wallet to continue
                                    </p>
                                </div>
                            )}

                            {isConnected && status === 'connected' && (
                                <CardMultiTasks multiTasksData={filteredMultiTasks} loading={loading} page={currentPage} />
                            )}
                        </Grid>
                    </Grid>
                </Box>

                {/* <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={10}>
                    {isConnected && <Pagination numPages={totalPages} />}
                </Box> */}
            </Box>
        </>
    )
}

export default HomeTasks