import { useState, useRef, useEffect } from 'react';
import 'date-fns';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  TextField,
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Fab,
  Chip,
  Select,
  Input,
  MenuItem,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import api from '../api';
import { Header } from '../components';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {},
  main: {
    margin: theme.spacing(6, 0, 0, 0),
    padding: theme.spacing(0, 0, 6, 6),
  },
  rightColumn: {
    margin: theme.spacing(6, 0, 0, 0),
  },
  addCover: {
    position: 'absolute',
    top: theme.spacing(32),
    right: theme.spacing(1),
  },
  cover: {
    height: theme.spacing(30),
    marginTop: theme.spacing(2),
  },
  textField: {
    minWidth: '300px',
  },
  input: {
    display: 'none',
  },
  imageContainer: {
    position: 'relative',
    // margin: theme.spacing(5, 1, 5, 1),
    // left: '0',
    // bottom: '0',
  },
  category: {
    marginBottom: theme.spacing(4),
    minWidth: '300px',
  },
  proceedButton: {
    position: 'fixed',
    right: '5%',
    top: '50%',
    borderRadius: '100px',
  },
  coverImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    margin: theme.spacing(3, 0, 1, 0),
  },
  paper: {
    height: '300px',
    minWidth: '80%',
    margin: theme.spacing(3, 0, 1, 0),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const QuizEdit = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [qid, setqid] = useState('60f54796ae87f5172830e0b0');
  const [quiz, setQuiz] = useState(null);
  const [isTest, setTest] = useState(true);
  const [isScheduled, setScheduled] = useState(true);
  const [isTimebound, setTimebound] = useState(true);
  const [hasAutoEvaluation, setAutoEvaluation] = useState(true);
  const [name, setName] = useState('');
  const cover = useRef(null);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [img, setImg] = useState(null);

  const today = new Date();
  const [startDate, setStartDate] = useState(today);

  const history = useHistory();
  const [names, setNames] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [categoryIds, setCategoryIds] = useState(['60d1cd36bb5d6069d8149f42']);

  const theme = useTheme();

  const handleChange = event => {
    const arr = event.target.value;
    setPersonName(arr);

    const ids = [];
    names.forEach(({ name, id }) => {
      if (arr.includes(name)) {
        ids.push(id);
      }
    });

    setCategoryIds(ids);
  };

  useEffect(async () => {
    setLoading(true);
    let res = await api.getCategories();
    setNames(res.data);
    res = await api.getQuiz(qid);
    setQuiz(res.data);
    setImg(res.data.coverImage);

    console.log(res.data);
    setLoading(false);
  }, []);

  const handleTypeChange = ({ target: { value } }) => {
    setTest(value === 'test');
    if (value === 'survey') {
      setScheduled(false);
      setTimebound(false);
      setAutoEvaluation(false);
    }
  };

  const handleScheduled = ({ target: { value } }) => {
    setScheduled(value === 'yes');
  };

  const handleTimeBound = ({ target: { value } }) => {
    setTimebound(value === 'yes');
  };

  const handleEvaluationChange = ({ target: { value } }) => {
    setAutoEvaluation(value === 'auto');
  };

  const handleImage = e => {
    if (e.target.files.length !== 0) {
      const file = e.target.files[0];
      setImg(URL.createObjectURL(file));
      cover.current = file;
    }
  };

  const handleStartDate = date => {
    setStartDate(date);
    console.log(date);
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        isTest,
        hasAutoEvaluation,
        isScheduled,
        name,
        description,
        duration,
        categories: categoryIds,
        startTime: startDate,
        coverImage:
          'https://user-images.githubusercontent.com/27550808/126111179-865576f5-5754-4403-87bb-2afc3f936aea.jpg',
      };

      // console.log(requestBody);

      const { data: quiz } = await api.postQuiz(requestBody);

      if (img != null) {
        let formData = new FormData();
        formData.append('cover', cover.current);
        formData.append('fileUpload', true);

        try {
          await api.updateCover(quiz.id, formData);
        } catch (error) {
          console.log(error.response.data.message);
        }
      }

      history.push(`/creation/${quiz.id}`);
    } catch (error) {
      console.log('App crashed, error:', error);
    }
  };

  return (
    <>
      <Header style={{ width: '100%' }} />
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className={classes.root}>
          <Container>
            <div className={classes.imageContainer}>
              <input
                accept="image/*"
                className={classes.input}
                id="coverPhoto"
                multiple
                type="file"
                onChange={handleImage}
                // disabled={formDisabled}
              />
              <div className={classes.addCover}>
                <label htmlFor="coverPhoto">
                  <Fab component="span">
                    <EditIcon />
                  </Fab>
                </label>
              </div>
              <img src={img} className={classes.coverImage} alt="" />
            </div>

            <Grid container className={classes.main} justify="center">
              <Grid
                container
                direction="column"
                spacing={3}
                justify="center"
                item
                md={6}
              >
                <Grid item>
                  <Typography variant="h4">Quiz Settings</Typography>
                </Grid>
                <Grid container spacing={5} item>
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Type</FormLabel>
                      <RadioGroup
                        value={isTest ? 'test' : 'survey'}
                        onChange={handleTypeChange}
                      >
                        <FormControlLabel
                          value="test"
                          control={<Radio />}
                          label="Test"
                        />
                        <FormControlLabel
                          value="survey"
                          control={<Radio />}
                          label="Survey"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    {isTest ? (
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Scheduled</FormLabel>
                        <RadioGroup
                          value={isScheduled ? 'yes' : 'no'}
                          onChange={handleScheduled}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    ) : null}
                  </Grid>
                  <Grid item>
                    {isTest && !isScheduled ? (
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Time bound</FormLabel>
                        <RadioGroup
                          value={isTimebound ? 'yes' : 'no'}
                          onChange={handleTimeBound}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    multiline
                    rows={5}
                    className={classes.textField}
                  />
                </Grid>
                {isTest && (isScheduled || isTimebound) ? (
                  <Grid item>
                    <TextField
                      variant="outlined"
                      label="Duration (in min)"
                      value={duration}
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      onChange={e => setDuration(e.target.value)}
                      className={classes.textField}
                    />
                  </Grid>
                ) : (
                  <div></div>
                )}
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<DoubleArrowIcon />}
                    onClick={handleSubmit}
                  >
                    Proceed
                  </Button>
                </Grid>
              </Grid>

              <Grid
                container
                direction="column"
                item
                md={6}
                className={classes.rightColumn}
              >
                <Grid item className={classes.category}>
                  <FormControl className={classes.formControl} variant="filled">
                    <Typography variant="h6" gutterBottom>
                      Categories
                    </Typography>
                    <Select
                      labelId="demo-mutiple-chip-filled-label"
                      id="demo-mutiple-chip"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={selected => (
                        <div className={classes.chips}>
                          {selected.map(value => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.muiChip}
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {names.map(({ name, id }) => (
                        <MenuItem
                          key={id}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  {isTest ? (
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Evaluation</FormLabel>
                      <RadioGroup
                        value={hasAutoEvaluation ? 'auto' : 'manual'}
                        onChange={handleEvaluationChange}
                      >
                        <FormControlLabel
                          value="auto"
                          control={<Radio />}
                          label="Auto"
                        />
                        <FormControlLabel
                          value="manual"
                          control={<Radio />}
                          label="Manual"
                        />
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <div></div>
                  )}
                </Grid>
                <Grid item>
                  {isTest && isScheduled ? (
                    <Grid item>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid
                          container
                          justify="space-around"
                          direction="column"
                        >
                          <Grid item>
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-start"
                              label="Start Date"
                              format="MM/dd/yyyy"
                              value={startDate}
                              onChange={handleStartDate}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker-start"
                              label="Start Time"
                              value={startDate}
                              onChange={handleStartDate}
                              KeyboardButtonProps={{
                                'aria-label': 'change time',
                              }}
                            />
                          </Grid>
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </Grid>
                  ) : (
                    <div></div>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};

export default QuizEdit;
