# iwindy-server

iWindy REST API Server

| HTTP Method | Description      | Endpoint  | Expect              | Login Required |
| ----------- | ---------------- | --------- | ------------------- | -------------- |
| POST        | Signing up       | /register | "email", "password" | No             |
| POST        | Signin in        | /login    | "email", "password" | No             |
| POST        | Logging out      | /logout   |                     | Yes            |
| GET         | Get all products | /products |                     | No             |
