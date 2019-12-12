module.exports = function myTestMacro(arc, cloudformation, stage) {
    console.log("Hello from a custom macro")
    console.log(JSON.stringify(cloudformation, null, 2));

    return cloudformation
}