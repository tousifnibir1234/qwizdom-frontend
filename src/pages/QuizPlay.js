import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../api';
const useStyles = makeStyles(theme => ({
  buttonStyle: {
    color: 'white',
    'background-color': '#333f46',
  },
}));
export default function QuizPlay() {
  const classes = useStyles();

  useEffect(async () => {
    api.getCompleteQuiz();
  }, []);
}
