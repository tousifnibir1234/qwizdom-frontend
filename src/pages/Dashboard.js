import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import api from '../api';
import { Header, DashboardBody, DashboardSidebar } from '../components';

export default function Dashboard() {
  const [subscribedSelected, setSubscribedSelected] = useState(false);
  const [unsubscribedSelected, setUnsubscribedSelected] = useState(false);

  const [scheduledSelected, setScheduledSelected] = useState(false);
  const [unscheduledSelected, setUnscheduledSelected] = useState(false);

  const [timeBoundSelected, setTimeBoundSelected] = useState(false);
  const [notTimeBoundSelected, setNotTimeBoundSelected] = useState(false);

  const [testSelected, setTestSelected] = useState(false);
  const [surveySelected, setSurveySelected] = useState(false);

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');

  const [queryString, setQueryString] = useState('');

  const dashboardBodyProps = {
    loading,
    totalPages,
    quizzes,
    page,
    setPage,
    name,
    setName,
  };

  const dashboardSidebarProps = {
    subscribedSelected,
    setSubscribedSelected,
    unsubscribedSelected,
    setUnsubscribedSelected,
    scheduledSelected,
    setScheduledSelected,
    unscheduledSelected,
    setUnscheduledSelected,
    timeBoundSelected,
    setTimeBoundSelected,
    notTimeBoundSelected,
    setNotTimeBoundSelected,
    testSelected,
    setTestSelected,
    surveySelected,
    setSurveySelected,
  };

  const updateQueryString = () => {
    let str = `page=${page}&limit=4`;

    if (testSelected) {
      str += '&isTest=true';
    } else if (surveySelected) {
      str += '&isTest=false';
    }

    if (timeBoundSelected) {
      str += '&isTimeBound=true';
    } else if (notTimeBoundSelected) {
      str += '&isTimeBound=false';
    }

    if (scheduledSelected) {
      str += '&isScheduled=true';
    } else if (unscheduledSelected) {
      str += '&isScheduled=false';
    }

    setQueryString(str);
  };

  useEffect(async () => {
    const signedIn = localStorage.getItem('refreshToken');
    if (!signedIn) {
      props.history.push('/');
    }

    try {
      setLoading(true);
      updateQueryString();
      const response = await api.getQuizzes(queryString);

      setQuizzes(response.data.results);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await api.getQuizzes(queryString);

      setQuizzes(response.data.results);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [queryString]);

  useEffect(() => {
    updateQueryString();
  }, [
    surveySelected,
    testSelected,
    scheduledSelected,
    unscheduledSelected,
    timeBoundSelected,
    notTimeBoundSelected,
    page,
    name,
  ]);

  return (
    <>
      <Header />
      <Grid container>
        <DashboardSidebar {...dashboardSidebarProps} />

        <Grid item sm={12} md={9}>
          <DashboardBody {...dashboardBodyProps} />
        </Grid>
      </Grid>
    </>
  );
}
