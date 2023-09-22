export const Launchesdata = (launches) => {
  return {
    type: 'SET_LAUNCHES',
    payload: launches,
  };
};

export const setUpcomingLaunches = (launches) => {
  return {
    type: 'SET_UPLAUNCHES',
    payload: launches,
  };
};
