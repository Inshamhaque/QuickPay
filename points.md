## WEB2 Checklist

- [ ] Create a Node.js Express backend
- [ ] Create AWS credentials → for S3 (one option is that we ask the user to give the S3 instance URL, i.e., CloudFront URL, or we store that in our S3 and bear the cost of it)
- [ ] Create 2 frontends
- [ ] Design the schema
- [ ] Support the following endpoints:
  - [ ] GET /generatePresignedUrl
  - [ ] Let users upload images via frontend 1
  - [ ] POST /task
  - [ ] GET /task
- [ ] Support the endpoints of the other side:
  - [ ] GET /nexttask
  - [ ] POST /submission
  - [ ] GET /balance
  - [ ] POST /payout → dummy for now
