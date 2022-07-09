const whiteList = [process.env.CLIENT_URL];

export default {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Cors error"));
    }
  },
};
