import React, { useRef } from 'react';
import { useEffect } from 'react';
import { SingleCard } from '../components';
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import api from '../api';
import { withRouter } from 'react-router-dom';

export default withRouter(function DashboardBody(props) {
  useEffect(() => {
    const signedIn = localStorage.getItem('refreshToken');
    if (!signedIn) {
      props.history.push('/');
    }
  }, []);
  const array1 = [1, 2, 3, 4];

  const handleClick = async () => {
    api
      .getThreadComments()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px 10px 20px 10px',
        }}
      >
        <Typography variant="h4">Quizzes</Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {array1.map((i) => {
          return <SingleCard />;
        })}
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pagination count={10} color="secondary" />
      </div>

      <button onClick={handleClick}>check api </button>
    </>
  );
});
