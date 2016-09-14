'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('apigee-seed') + ' generator' 
    ));

    var prompts = [{
      type: 'input',
      name: 'sample_name',
      message: 'Sample/solution name?',
     },
     {
      type: 'input',
      name: 'sample_description',
      message: 'Pls describe?',
     },
    {
      type: 'input',
      name: 'sample_author',
      message: 'Author?',
     },
      ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var o = {
      sample_name: this.props.sample_name,
      sample_description: this.props.sample_description,
      sample_author: this.props.sample_author
    }
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      o
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      o
    );
    this.fs.copyTpl(
      this.templatePath('test/test.js'),
      this.destinationPath('test/test.js'),
      o
    );
    this.fs.copyTpl(
      this.templatePath('test/test.html'),
      this.destinationPath('test/test.html'),
      o
    );
  },

  install: function () {
    this.npmInstall();
  }
});
