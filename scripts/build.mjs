// Vinext's forced successful exit races native build handles on Windows.
// Let the event loop drain; errors still use the original nonzero exit.
if (process.platform === 'win32') {
  const exit = process.exit.bind(process);
  process.exit = (code = 0) => {
    if (Number(code) !== 0) return exit(code);
    process.exitCode = 0;
  };
}
process.argv.splice(2, 0, 'build');
await import(new URL('./cli.js', import.meta.resolve('vinext')).href);
