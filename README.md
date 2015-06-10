# Node Blog  
CMS Software written in Express on NodeJS  
*Author: Coltrane Nadler*  
  
## Installing  
```bash  
git clone https://github.com/ColtraneNadler/Blog.git && cd Blog/ && npm install && node app.js
```  
The web server will listen on **port 3000**.  
  
Input login credentials, and mongo credentials in _Blog/config/auth.js_

##Guide of usage  
Once the application is running, and has successfully established a connection to the provided MongoDB server, login to the blog via http://localhost:3000/login. Make a new post via route http://localhost:3000/articles/new.  
  
##ToDo List  
* Store thumbnail images for each post, either GridFS, or hard disk storage using 'fs' module.  
* Pretty up the design.  
* Admin panel, to create/remove new users(authors) on the fly.



