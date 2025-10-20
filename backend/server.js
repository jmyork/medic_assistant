const express = require('express');
const passport = require('passport');
const connectDB = require('./config/database');
const setupPassport = require('./config/passport');

const app = express();
app.use(express.json());

// DB
connectDB();

// Passport
app.use(passport.initialize());
setupPassport(passport);

// Routes loader: mirror routes folder
const fs = require('fs');
const path = require('path');
const routesDir = path.join(__dirname, 'routes');

function loadRoutes(dir, prefix = '') {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      loadRoutes(full, prefix + '/' + f);
    } else if (stat.isFile() && f.endsWith('.js')) {
      const routePath = prefix + '/' + f.replace('.js','');
      app.use(routePath, require(full));
      console.log('Mounted', routePath, '->', full);
    }
  });
}

// mount api root
if (fs.existsSync(routesDir)) loadRoutes(routesDir);

app.get('/', (req, res) => res.send('API Medic Assistant em execução'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));
