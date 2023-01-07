import app from './server';

app.listen(process.env.port, async () => {
  console.log(`server started on http://localhost:${process.env.port}`);
});



