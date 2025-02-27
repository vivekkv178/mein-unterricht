import bunyan from "bunyan";

const logger = bunyan.createLogger({
  name: "backend",
  level: "info",
  streams: [
    {
      stream: process.stdout,
    },
  ],
});

export default logger;
