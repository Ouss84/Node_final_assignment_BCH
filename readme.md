# Tasks

1. Create a folder for the project
2. Write create statements for the database
3. Create the database
4. Create sql statements for accessing the data
5. Create data access layer for the data
6. Create REST server (indexREST.js)
7. Create a single-page application to use the data
8. Create a SPA server (indexSPA.js)

### 1- Create a folder for the project √

- Create a folder for the project. Name the folder with `'Bahri_Oussama_product_project'`.
- Generate or write the package.json file for the project.
- Install mariadb library into the project folder.
- Install all necessary libraries to the project.

### 2- Write create statements for the database √

- Write create statements to create a database called `'productdb'`.
- Create a table product, for product data. Table columns are:

```json
  productId integer
  name varchar(22)
  model integer
  type varchar(13)
  price integer
```

- All columns are mandatory. The primary key is productId.
- Add two insert statements into the create statements for testing.
- Create user `'amelia@localhost'` with password `'e9Od7CDM'`. Grant all necessary privileges to the user.
- Save all necessary create statements into a json file `'Bahri_Oussama_product_createStatements.json'`

### 3- Create the database √

- Create the database with the create statements Bahri_Oussama_product_createStatements.json

### 4- Create sql statements for accessing the data √

- With sql statements you should be able to:

  - select
  - insert
  - update
  - delete

  #### Select

  - `get` all
  - `get` using primary key productId as a key.

  #### Insert

  - Data can be added. Primary key is `productId` .

  #### Update

  - All data except primary key ( `productId` ) can be updated. Primary key `productId` serves as a selection criterion.

  #### Delete

  - Data can be deleted using primary key `productId` as criterion.

### 5- Create data access layer for the data √

- Create a datastorage layer with all necessary methods:
  - get all
  - get one
  - insert
  - update
  - remove

### 6- Create REST server (indexREST.js)

- Create a REST server. Server is listening host `localhost:4000`. Allow cross-origin requests (Cross-Origin Resource Sharing).
- REST API:
  Create REST API. The resouces of the REST API are given and returned in json format. The API should include following:
  - Get all:
    GET /api/products
  - Get product
    GET /api/products/productId Example: GET /api/products/1
  - Insert product data
    POST /api/products
  - Update
    PUT /api/products/productId
  - Delete product
    DELETE /api/products/productId Example:DELETE /api/products/1

### 7- Create a single-page application to use the data

- Create a single-page web application. Use fetch to manipulate data.
- Create the following operations:
  - get all
  - get one
  - insert
  - remove
- Design and implement the main menu and all other necessary pages.
- Design and implement stylesheets for your application.

### 8- Create a SPA server (indexSPA.js)

-Create a server to serve single page aplication and necessary resources (html, css, js, etc.). Server is listening host localhost:3000. Main page can be opened from root route /.
