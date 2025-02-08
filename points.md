## WEB2 Checklist

- [x] Create a Node.js Express backend
- [x] Create AWS credentials → for S3 (one option is that we ask the user to give the S3 instance URL, i.e., CloudFront URL, or we store that in our S3 and bear the cost of it)
- [x] Create 2 frontends
- [x] Design the schema
- [x] Support the following endpoints:
  - [x] GET /generatePresignedUrl
  - [x] Let users upload images via frontend 1
  - [x] POST /task
  - [x] GET /task
- [x] Support the endpoints of the other side:
  - [x] GET /nexttask
  - [x] POST /submission
  - [x] GET /balance
  - [x] POST /payout → dummy for now
