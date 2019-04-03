const ps = require('python-shell')

ps.PythonShell.run('./python-code2/recommend.py', null, async function (err, results) {
    await results
    if (err) throw err;
    console.log('finished');
    console.log(results)
});


