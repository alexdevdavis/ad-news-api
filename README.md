# AD News API

## Environment Variables

To run this repo locally, the db seed will attempt to set a PGDATABASE environment variable, based on whether the program is running in 'test' or 'development' mode.
Therefore, you'll need to create 2 files:

1. .env.development
2. .env.test
And set your PGDATABASE names in these, ```nc_news``` and ```nc_news_test``` respectively.
