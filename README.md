# Tweeta

npx create-react-app tweeta
npx express-generator --no-view tweeta
npm i sequelize sequelize-cli pg
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes username:string,password:string
npx sequelize-cli model:generate --name Tweet --attributes UserId:integer,content:text
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npm install bcrypt
