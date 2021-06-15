import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { createMuiTheme } from '@material-ui/core/styles';

const dummy = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 425,
      laptop: 1200,
      desktop: 1400,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    marginBottom: 30,
  },
  media: {
    height: 140,
    // paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipStyle: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  [dummy.breakpoints.up('desktop')]: {
    root: {
      minWidth: '450px',
    },
  },
  // [dummy.breakpoints.between('tablet', 'laptop')]: {
  //   root: {
  //     maxWidth: '300px',
  //   },
  // },
}));

export default function SingleCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        className={classes.media}
        image="assets/images/quiz1.jpeg"
      />
      <div style={{ padding: '5px' }}>
        <Typography variant="h6" component="p">
          Accounting Job Survey
        </Typography>
      </div>
      <Box className={classes.chipStyle}>
        <Chip color="primary" label="Web" />
        <Chip color="primary" label="Web" />
        <Chip color="primary" label="Web" />
      </Box>

      <div className={classes.titleContainer}>
        <CardHeader
          avatar={
            <Avatar
              src="assets/images/marcos.png"
              className={classes.avatar}
            ></Avatar>
          }
          title="Marcos Marshal"
          // subheader="September 14, 2016"
        />

        <Box
          component="fieldset"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          borderColor="transparent"
        >
          <Typography variant="body2">741 participants</Typography>
          <Rating name="read-only" value={2} readOnly />
        </Box>
      </div>
    </Card>
  );
}
