# iwindy-server

iWindy REST API Server

| HTTP Method | Description                   | Endpoint                     | Expect                                                                                                                                                                  | Login Required |
| ----------- | ----------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| POST        | Signing up                    | /auth/register               | "email", "password"                                                                                                                                                     | No             |
| POST        | Signin in                     | /auth/login                  | "email", "password"                                                                                                                                                     | No             |
| POST        | Logging out                   | /auth/logout                 |                                                                                                                                                                         | Yes            |
| GET         | Get all products              | /products                    |                                                                                                                                                                         | No             |
| GET         | Get product by id             | /products/productId          |                                                                                                                                                                         | No             |
| GET         | Get latest 5 products         | /products/latest             |                                                                                                                                                                         | No             |
| GET         | Get product by id             | /products/productId          |                                                                                                                                                                         | No             |
| POST        | Create product                | /products                    | "brand": string, "name": string, "price": number, "discount": boolean,"quantity": number, "description": string, "sizes": string[], "colors": string[], "image": string | Yes            |
| PUT         | Update product                | /products/:productId         | "brand": string, "name": string, "price": number, "discount": boolean,"quantity": number, "description": string, "sizes": string[], "colors": string[], "image": string | Yes            |
| DELETE      | Delete product                | /products/:productId         |                                                                                                                                                                         | Yes            |
| GET         | Get all product by category   | /products/category/:category |                                                                                                                                                                         | No             |
| POST        | Like product                  | /products/like/:productId    |                                                                                                                                                                         | Yes            |
| POST        | Dislike product               | /products/dislike/:productId |                                                                                                                                                                         | Yes            |
| GET         | Get user profile              | /users/:productId            |                                                                                                                                                                         | Yes            |
| GET         | Get user cart                 | /users/cart                  |                                                                                                                                                                         | Yes            |
| POST        | Add to user cart              | /users/cart/add              | "productId": string, "quantity": number                                                                                                                                 | Yes            |
| DELETE      | Delete product from user cart | /users/cart/:productId       |                                                                                                                                                                         | Yes            |
| POST        | Make order                    | /users/cart/order            |                                                                                                                                                                         | Yes            |

## How to run:

1.  Clone repo
2.  npm install / yarn install or etc.
3.  create .env file

-   `PORT=5000 DB_CONNECTION="your db conneciton here" SALT_ROUNDS=10 JWT_SECRET="your secret here" COOKIE_NAME="name of cookie here" COOKIE_SECRET="cookie secret here"`

4.  npm run dev
