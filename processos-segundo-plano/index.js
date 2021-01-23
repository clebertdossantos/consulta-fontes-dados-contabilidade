// const { spawn } = require('child_process')
// // const ls = spawn('ls', ['..', '-lh', '/usr'])
// const ls = spawn('ls')

// ls.stdout.on('data', (data)=>{
//     console.log(`stdout: ${data}`)
// })

// ls.stderr.on('data', (data)=>{
//     console.log(`stderr: ${data}`)
// })

// ls.on('close',(code)=>{
//     console.log(`Processo em segundo plano finalizado com o código ${code}`)
// })

const child_process = require('child_process');
// const test = child_process.execSync('cd C:\\Users\\cleber.santos.BETHA\\Desktop\\cursos-web\\javascript\\tollbox-cleber\\processos-segundo-plano')
child_process.exec('dir', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});
