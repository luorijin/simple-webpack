var Resolver = require("enhanced-resolve/lib/Resolver");
var NodeJsInputFileSystem = require("enhanced-resolve/lib/NodeJsInputFileSystem");
var CachedInputFileSystem = require("enhanced-resolve/lib/CachedInputFileSystem");
var ModulesInDirectoriesPlugin = require("enhanced-resolve/lib/ModulesInDirectoriesPlugin");
var ModulesInRootPlugin = require("enhanced-resolve/lib/ModulesInRootPlugin");
var ModuleAsFilePlugin = require("enhanced-resolve/lib/ModuleAsFilePlugin");
var ModuleAsDirectoryPlugin = require("enhanced-resolve/lib/ModuleAsDirectoryPlugin");
var ModuleAliasPlugin = require("enhanced-resolve/lib/ModuleAliasPlugin");
var DirectoryDefaultFilePlugin = require("enhanced-resolve/lib/DirectoryDefaultFilePlugin");
var DirectoryDescriptionFilePlugin = require("enhanced-resolve/lib/DirectoryDescriptionFilePlugin");
var FileAppendPlugin = require("enhanced-resolve/lib/FileAppendPlugin");

function makeRootPlugin(name, root) {
    if (typeof root === "string")
        return new ModulesInRootPlugin(name, root);
    else if (Array.isArray(root)) {
        return function () {
            root.forEach(function (root) {
                this.apply(new ModulesInRootPlugin(name, root));
            }, this);
        }
    }
    return function () {
    };
}


const resolver = new Resolver(null);
resolver.fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), 6000);

resolver.apply(
    new FileAppendPlugin(['.js'])
);

resolver.resolve(__dirname, './b.js', function (e,result) {
    console.log(result)
})
