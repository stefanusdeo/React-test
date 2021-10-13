import React from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import ListJob from '../ListJob/ListJob';

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <ListJob />
    </Card>
  );
};

export default Home;
