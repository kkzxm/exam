var fs;
try
{
    fs = require("graceful-fs");
}
catch(e)
{
    fs = require("static/lib/less/lib/less-node/fs");
}
module.exports = fs;
