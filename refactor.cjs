const fs = require('fs');
const path = require('path');
const dirs = ['Totem', 'Cozinha', 'Painel'];

dirs.forEach(dir => {
  const jsxPath = path.join('C:/Users/felip/Documents/GitHub/automacao-de-aulas/DS/UC/2026/S4/PEND2/2TDS_S/Aulas/OrderTech_Gabarito/frontend/src/pages', dir, dir + '.jsx');
  const cssPath = path.join('C:/Users/felip/Documents/GitHub/automacao-de-aulas/DS/UC/2026/S4/PEND2/2TDS_S/Aulas/OrderTech_Gabarito/frontend/src/pages', dir, dir + '.css');
  const modCssPath = path.join('C:/Users/felip/Documents/GitHub/automacao-de-aulas/DS/UC/2026/S4/PEND2/2TDS_S/Aulas/OrderTech_Gabarito/frontend/src/pages', dir, dir + '.module.css');
  
  if(fs.existsSync(cssPath)) {
    fs.renameSync(cssPath, modCssPath);
  }
  
  if(fs.existsSync(jsxPath)) {
    let content = fs.readFileSync(jsxPath, 'utf8');
    content = content.replace(/import '\.\/(.*?)\.css';/g, 'import styles from \'./$1.module.css\';');
    
    // Replace className="some-class" with className={styles["some-class"]}
    content = content.replace(/className=\"([a-zA-Z0-9_-]+)\"/g, 'className={styles["$1"]}');
    
    // For multiple classes: className="class1 class2" -> className={`${styles["class1"]} ${styles["class2"]}`}
    content = content.replace(/className=\"([a-zA-Z0-9_-]+)\s+([a-zA-Z0-9_-]+)\"/g, 'className={`${styles["$1"]} ${styles["$2"]}`}');
    
    fs.writeFileSync(jsxPath, content);
  }
});

// App.jsx
const appJsx = 'C:/Users/felip/Documents/GitHub/automacao-de-aulas/DS/UC/2026/S4/PEND2/2TDS_S/Aulas/OrderTech_Gabarito/frontend/src/App.jsx';
const appCss = 'C:/Users/felip/Documents/GitHub/automacao-de-aulas/DS/UC/2026/S4/PEND2/2TDS_S/Aulas/OrderTech_Gabarito/frontend/src/App.css';
const appModCss = 'C:/Users/felip/Documents/GitHub/automacao-de-aulas/DS/UC/2026/S4/PEND2/2TDS_S/Aulas/OrderTech_Gabarito/frontend/src/App.module.css';

if(fs.existsSync(appCss)) {
  fs.renameSync(appCss, appModCss);
}
if(fs.existsSync(appJsx)) {
  let content = fs.readFileSync(appJsx, 'utf8');
  content = content.replace(/import '\.\/App\.css';/g, 'import styles from \'./App.module.css\';');
  fs.writeFileSync(appJsx, content);
}
