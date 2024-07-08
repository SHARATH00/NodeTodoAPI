# About
This Todo API is designed to facilitate the management of todo tasks. It offers endpoints for creating, updating, retrieving, and deleting todos. Leveraging MongoDB as the underlying database and built with Node.js and Express framework, this API provides a robust solution for todo list management.

## Installation
```
git clone <repository-url>
cd <repository-folder>
npm install
```
## Dependencies
```
npm install body-parser --save
npm install express --save
npm install mongodb --save
npm install mongoose --save
npm install nodemon --save

```

If you haven't already installed npm:
```
sudo apt update
sudo apt install nodejs npm
```
## Visual Overview
* Checkout the testing results from PostMan.
    ![GET](img/GET.png)
    ![POST](img/POST.png)
    ![DELETE](img/DELETE.png)
    ![UPDATE](img/UPDATE.png)
## Error Handling 
* If an error occurs during processing, the API will respond with an appropriate error message and an HTTP status code indicating the error.

