const initialState = () => {
  return {
    width: 500,
    height: 500,
    rows: 50,
    cols: 50,
  };
};

export default (state=initialState(), action) => {

  return state;
};
