import * as React from 'react';
import {
  SignIn,
  SignUp,
  Dashboard,
  QuizHome,
  QuizCreation,
  QuizEdit,
  AllSubmissions,
  Profile,
  QuizCreationBasic,
  QuizPlay,
  Leaderboard,
  ResultPage,
  ManualEvaluation,
  ForumPage,
  Stat,
  LandingPage,
} from './pages';
import { Route, Switch } from 'react-router-dom';
import { FullThread } from './components';

const App = () => {
  return (
    <main>
      <Switch>
        {/* <Route path="/" component={SignIn} exact /> */}
        <Route path="/" component={LandingPage} exact />
        <Route path="/landing" component={LandingPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />

        <Route path="/quiz/:id/home" component={QuizHome} />
        <Route path="/create" component={QuizCreationBasic} />
        <Route path="/quiz/:id/create" component={QuizCreation} />
        <Route path="/quiz/:id/edit-main" component={QuizCreation} />
        <Route path="/quiz/:qid/edit-base" component={QuizEdit} />
        <Route path="/quiz/:id/play" component={QuizPlay} />
        <Route
          path="/quiz/:quizId/evaluate/:userId"
          component={ManualEvaluation}
        />

        <Route path="/quiz/:id/result" component={ResultPage} />
        <Route path="/quiz/:id/submission/:userId" component={ResultPage} />
        <Route path="/quiz/:id/leaderboard" component={Leaderboard} />
        <Route path="/quiz/:id/submissions" component={AllSubmissions} />
        <Route path="/quiz/:id/stats" component={Stat} />

        <Route path="/quiz/:id/forum" component={ForumPage} exact />
        <Route
          path="/quiz/:quizId/forum/thread/:threadId"
          component={FullThread}
        />
      </Switch>
    </main>
  );
};

export default App;
