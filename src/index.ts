import eslint = require("./eslint");
import esreact = require("./eslint-react");
import prettier = require("./prettier");
import stylelint = require("./stylelint");

export = { stylelint, prettier, eslint, esreact, default: eslint };
