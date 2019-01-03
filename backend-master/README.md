# DB Init
### Init:  
node_modules/.bin/sequelize init

### Tao file models:  
node_modules/.bin/sequelize model:generate --name Person --attributes name:string,age:integer,comment:string

### Create table : 
node_modules/.bin/sequelize db:migrate