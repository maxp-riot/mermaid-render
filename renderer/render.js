// Run by the mod as:
//   osascript -l JavaScript render.js <bundle> <bg> <fg>
// with the Mermaid source on stdin, and prints the diagram's SVG, background
// left transparent (the mod has resvg paint one when it wants it). JavaScriptCore
// ships with macOS, so no Node is needed.
ObjC.import('Foundation')

// The bundle expects three globals JavaScriptCore lacks: elkjs looks up `global`,
// entities decodes its tables with `atob`, and beautiful-mermaid flushes elkjs's
// setTimeout(0) callbacks itself to lay out synchronously.
function atob(input) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let out = ''
  let buffer = 0
  let bits = 0
  for (const char of input.replace(/=+$/, '')) {
    buffer = (buffer << 6) | alphabet.indexOf(char)
    bits += 6
    if (bits >= 8) {
      bits -= 8
      out += String.fromCharCode((buffer >> bits) & 255)
    }
  }
  return out
}

function readFile(path) {
  return $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, null).js
}

function readStdin() {
  const data = $.NSFileHandle.fileHandleWithStandardInput.readDataToEndOfFile
  return $.NSString.alloc.initWithDataEncoding(data, $.NSUTF8StringEncoding).js
}

function run(argv) {
  globalThis.global = globalThis
  globalThis.atob = atob
  globalThis.setTimeout = fn => {
    fn()
    return 0
  }
  eval(readFile(argv[0]))

  return BeautifulMermaid.renderMermaidSVG(readStdin(), { bg: argv[1], fg: argv[2], transparent: true })
}
