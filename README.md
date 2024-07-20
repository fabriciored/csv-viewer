### CSV Viewer        

CSV Viewer app built with Express and React.

API: http://csv-api.fabas.tech/api/users

Webapp: https://csv-viewer-app.onrender.com/

<br>
API Routes
<br>

`/api/users`

*params:*

q (optional)

page (optional, default 1)

limit (optional, default -1(limitless)

<br>

`/api/files`

*body:*

file (text/csv)


<br>
<br>

### Setup        

### Development Enviroment

**API**

cd backend && npm install && npm run dev

**Webapp**

cd frontend && npm install && npm run dev

### Production Enviroment

**API**

cd backend && npm install && npm run start

**Webapp**

cd frontend && npm install && npm run start
