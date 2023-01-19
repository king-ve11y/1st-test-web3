const path = require('path');
const fs = require('fs');
const solc = require('solc');


const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol'); //generates path that points directly to the inbox as well as the file were using
const source = fs.readFileSync(inboxPath,'utf8');//getting source code

//actual compile code
module.exports=solc.compile(source, 1).contracts[':Inbox'];