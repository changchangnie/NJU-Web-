var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app = express();

const mongoose= require("mongoose");
const url = "mongodb+srv://3179369731:chw20041110@ddchen.ifq6u.mongodb.net/?retryWrites=true&w=majority&appName=dDChen";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB 连接错误："));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRouter");
const projectRouter = require("./routes/projectRouter");
const taskRouter = require("./routes/taskRouter");

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/project",projectRouter);
app.use("/api/task",taskRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;