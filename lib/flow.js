var execFile = require('child_process').execFile;
var loophole = require('loophole');
var flow = loophole.allowUnsafeEval(function () {
  return loophole.allowUnsafeNewFunction(function () {
    return require('flow-bin');
  });
});

module.exports = {
  activate: function () {
    var self = this;

    atom.workspaceView.command('flow:check', function () {
      self.check('hi');
    });
  },

  /* @flow */
  check: function (type: number) {
    var test = type * 5;
    var initialDirectory = atom.project.getPath() ? atom.project.getPath() : '~';
    // This assumes the active pane item is an editor
    var editor = atom.workspace.getActivePaneItem();
    //editor.insertText('Hello, World!');

    execFile(flow, ['check'], { cwd: initialDirectory }, function (err, stdout, stderr) {
      console.error(err);
      if (err) {
        throw new Error('flow:check error: ' + err);
      }

      console.log(stdout);
      console.error(stderr);
      //editor.insertText(stdout);
    });
  }
};
