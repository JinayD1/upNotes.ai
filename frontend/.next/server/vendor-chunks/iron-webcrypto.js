"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/iron-webcrypto";
exports.ids = ["vendor-chunks/iron-webcrypto"];
exports.modules = {

/***/ "(rsc)/./node_modules/iron-webcrypto/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/iron-webcrypto/dist/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   algorithms: () => (/* binding */ algorithms),\n/* harmony export */   base64urlDecode: () => (/* binding */ base64urlDecode),\n/* harmony export */   base64urlEncode: () => (/* binding */ base64urlEncode),\n/* harmony export */   bufferToString: () => (/* binding */ bufferToString),\n/* harmony export */   clone: () => (/* binding */ clone),\n/* harmony export */   decrypt: () => (/* binding */ decrypt),\n/* harmony export */   defaults: () => (/* binding */ defaults),\n/* harmony export */   encrypt: () => (/* binding */ encrypt),\n/* harmony export */   generateKey: () => (/* binding */ generateKey),\n/* harmony export */   hmacWithPassword: () => (/* binding */ hmacWithPassword),\n/* harmony export */   macFormatVersion: () => (/* binding */ macFormatVersion),\n/* harmony export */   macPrefix: () => (/* binding */ macPrefix),\n/* harmony export */   randomBits: () => (/* binding */ randomBits),\n/* harmony export */   seal: () => (/* binding */ seal),\n/* harmony export */   stringToBuffer: () => (/* binding */ stringToBuffer),\n/* harmony export */   unseal: () => (/* binding */ unseal)\n/* harmony export */ });\n// src/utils.ts\nvar alphabetByEncoding = {};\nvar alphabetByValue = Array.from({ length: 64 });\nfor (let i = 0, start = \"A\".charCodeAt(0), limit = \"Z\".charCodeAt(0); i + start <= limit; i++) {\n  const char = String.fromCharCode(i + start);\n  alphabetByEncoding[char] = i;\n  alphabetByValue[i] = char;\n}\nfor (let i = 0, start = \"a\".charCodeAt(0), limit = \"z\".charCodeAt(0); i + start <= limit; i++) {\n  const char = String.fromCharCode(i + start);\n  const index = i + 26;\n  alphabetByEncoding[char] = index;\n  alphabetByValue[index] = char;\n}\nfor (let i = 0; i < 10; i++) {\n  alphabetByEncoding[i.toString(10)] = i + 52;\n  const char = i.toString(10);\n  const index = i + 52;\n  alphabetByEncoding[char] = index;\n  alphabetByValue[index] = char;\n}\nalphabetByEncoding[\"-\"] = 62;\nalphabetByValue[62] = \"-\";\nalphabetByEncoding[\"_\"] = 63;\nalphabetByValue[63] = \"_\";\nvar bitsPerLetter = 6;\nvar bitsPerByte = 8;\nvar maxLetterValue = 63;\nvar stringToBuffer = (value) => {\n  return new TextEncoder().encode(value);\n};\nvar bufferToString = (value) => {\n  return new TextDecoder().decode(value);\n};\nvar base64urlDecode = (_input) => {\n  const input = _input + \"=\".repeat((4 - _input.length % 4) % 4);\n  let totalByteLength = input.length / 4 * 3;\n  if (input.endsWith(\"==\")) {\n    totalByteLength -= 2;\n  } else if (input.endsWith(\"=\")) {\n    totalByteLength--;\n  }\n  const out = new ArrayBuffer(totalByteLength);\n  const dataView = new DataView(out);\n  for (let i = 0; i < input.length; i += 4) {\n    let bits = 0;\n    let bitLength = 0;\n    for (let j = i, limit = i + 3; j <= limit; j++) {\n      if (input[j] === \"=\") {\n        bits >>= bitsPerLetter;\n      } else {\n        if (!(input[j] in alphabetByEncoding)) {\n          throw new TypeError(`Invalid character ${input[j]} in base64 string.`);\n        }\n        bits |= alphabetByEncoding[input[j]] << (limit - j) * bitsPerLetter;\n        bitLength += bitsPerLetter;\n      }\n    }\n    const chunkOffset = i / 4 * 3;\n    bits >>= bitLength % bitsPerByte;\n    const byteLength = Math.floor(bitLength / bitsPerByte);\n    for (let k = 0; k < byteLength; k++) {\n      const offset = (byteLength - k - 1) * bitsPerByte;\n      dataView.setUint8(chunkOffset + k, (bits & 255 << offset) >> offset);\n    }\n  }\n  return new Uint8Array(out);\n};\nvar base64urlEncode = (_input) => {\n  const input = typeof _input === \"string\" ? stringToBuffer(_input) : _input;\n  let str = \"\";\n  for (let i = 0; i < input.length; i += 3) {\n    let bits = 0;\n    let bitLength = 0;\n    for (let j = i, limit = Math.min(i + 3, input.length); j < limit; j++) {\n      bits |= input[j] << (limit - j - 1) * bitsPerByte;\n      bitLength += bitsPerByte;\n    }\n    const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);\n    bits <<= bitClusterCount * bitsPerLetter - bitLength;\n    for (let k = 1; k <= bitClusterCount; k++) {\n      const offset = (bitClusterCount - k) * bitsPerLetter;\n      str += alphabetByValue[(bits & maxLetterValue << offset) >> offset];\n    }\n  }\n  return str;\n};\n\n// src/index.ts\nvar defaults = {\n  encryption: { saltBits: 256, algorithm: \"aes-256-cbc\", iterations: 1, minPasswordlength: 32 },\n  integrity: { saltBits: 256, algorithm: \"sha256\", iterations: 1, minPasswordlength: 32 },\n  ttl: 0,\n  timestampSkewSec: 60,\n  localtimeOffsetMsec: 0\n};\nvar clone = (options) => ({\n  ...options,\n  encryption: { ...options.encryption },\n  integrity: { ...options.integrity }\n});\nvar algorithms = {\n  \"aes-128-ctr\": { keyBits: 128, ivBits: 128, name: \"AES-CTR\" },\n  \"aes-256-cbc\": { keyBits: 256, ivBits: 128, name: \"AES-CBC\" },\n  sha256: { keyBits: 256, name: \"SHA-256\" }\n};\nvar macFormatVersion = \"2\";\nvar macPrefix = \"Fe26.2\";\nvar randomBytes = (_crypto, size) => {\n  const bytes = new Uint8Array(size);\n  _crypto.getRandomValues(bytes);\n  return bytes;\n};\nvar randomBits = (_crypto, bits) => {\n  if (bits < 1)\n    throw new Error(\"Invalid random bits count\");\n  const bytes = Math.ceil(bits / 8);\n  return randomBytes(_crypto, bytes);\n};\nvar pbkdf2 = async (_crypto, password, salt, iterations, keyLength, hash) => {\n  const passwordBuffer = stringToBuffer(password);\n  const importedKey = await _crypto.subtle.importKey(\n    \"raw\",\n    passwordBuffer,\n    { name: \"PBKDF2\" },\n    false,\n    [\"deriveBits\"]\n  );\n  const saltBuffer = stringToBuffer(salt);\n  const params = { name: \"PBKDF2\", hash, salt: saltBuffer, iterations };\n  const derivation = await _crypto.subtle.deriveBits(params, importedKey, keyLength * 8);\n  return derivation;\n};\nvar generateKey = async (_crypto, password, options) => {\n  var _a;\n  if (!(password == null ? void 0 : password.length))\n    throw new Error(\"Empty password\");\n  if (options == null || typeof options !== \"object\")\n    throw new Error(\"Bad options\");\n  if (!(options.algorithm in algorithms))\n    throw new Error(`Unknown algorithm: ${options.algorithm}`);\n  const algorithm = algorithms[options.algorithm];\n  const result = {};\n  const hmac = (_a = options.hmac) != null ? _a : false;\n  const id = hmac ? { name: \"HMAC\", hash: algorithm.name } : { name: algorithm.name };\n  const usage = hmac ? [\"sign\", \"verify\"] : [\"encrypt\", \"decrypt\"];\n  if (typeof password === \"string\") {\n    if (password.length < options.minPasswordlength)\n      throw new Error(\n        `Password string too short (min ${options.minPasswordlength} characters required)`\n      );\n    let { salt = \"\" } = options;\n    if (!salt) {\n      const { saltBits = 0 } = options;\n      if (!saltBits)\n        throw new Error(\"Missing salt and saltBits options\");\n      const randomSalt = randomBits(_crypto, saltBits);\n      salt = [...new Uint8Array(randomSalt)].map((x) => x.toString(16).padStart(2, \"0\")).join(\"\");\n    }\n    const derivedKey = await pbkdf2(\n      _crypto,\n      password,\n      salt,\n      options.iterations,\n      algorithm.keyBits / 8,\n      \"SHA-1\"\n    );\n    const importedEncryptionKey = await _crypto.subtle.importKey(\n      \"raw\",\n      derivedKey,\n      id,\n      false,\n      usage\n    );\n    result.key = importedEncryptionKey;\n    result.salt = salt;\n  } else {\n    if (password.length < algorithm.keyBits / 8)\n      throw new Error(\"Key buffer (password) too small\");\n    result.key = await _crypto.subtle.importKey(\"raw\", password, id, false, usage);\n    result.salt = \"\";\n  }\n  if (options.iv)\n    result.iv = options.iv;\n  else if (\"ivBits\" in algorithm)\n    result.iv = randomBits(_crypto, algorithm.ivBits);\n  return result;\n};\nvar getEncryptParams = (algorithm, key, data) => {\n  return [\n    algorithm === \"aes-128-ctr\" ? { name: \"AES-CTR\", counter: key.iv, length: 128 } : { name: \"AES-CBC\", iv: key.iv },\n    key.key,\n    typeof data === \"string\" ? stringToBuffer(data) : data\n  ];\n};\nvar encrypt = async (_crypto, password, options, data) => {\n  const key = await generateKey(_crypto, password, options);\n  const encrypted = await _crypto.subtle.encrypt(...getEncryptParams(options.algorithm, key, data));\n  return { encrypted: new Uint8Array(encrypted), key };\n};\nvar decrypt = async (_crypto, password, options, data) => {\n  const key = await generateKey(_crypto, password, options);\n  const decrypted = await _crypto.subtle.decrypt(...getEncryptParams(options.algorithm, key, data));\n  return bufferToString(new Uint8Array(decrypted));\n};\nvar hmacWithPassword = async (_crypto, password, options, data) => {\n  const key = await generateKey(_crypto, password, { ...options, hmac: true });\n  const textBuffer = stringToBuffer(data);\n  const signed = await _crypto.subtle.sign({ name: \"HMAC\" }, key.key, textBuffer);\n  const digest = base64urlEncode(new Uint8Array(signed));\n  return { digest, salt: key.salt };\n};\nvar normalizePassword = (password) => {\n  if (typeof password === \"string\" || password instanceof Uint8Array)\n    return { encryption: password, integrity: password };\n  if (\"secret\" in password)\n    return { id: password.id, encryption: password.secret, integrity: password.secret };\n  return { id: password.id, encryption: password.encryption, integrity: password.integrity };\n};\nvar seal = async (_crypto, object, password, options) => {\n  if (!password)\n    throw new Error(\"Empty password\");\n  const opts = clone(options);\n  const now = Date.now() + (opts.localtimeOffsetMsec || 0);\n  const objectString = JSON.stringify(object);\n  const pass = normalizePassword(password);\n  const { id = \"\", encryption, integrity } = pass;\n  if (id && !/^\\w+$/.test(id))\n    throw new Error(\"Invalid password id\");\n  const { encrypted, key } = await encrypt(_crypto, encryption, opts.encryption, objectString);\n  const encryptedB64 = base64urlEncode(new Uint8Array(encrypted));\n  const iv = base64urlEncode(key.iv);\n  const expiration = opts.ttl ? now + opts.ttl : \"\";\n  const macBaseString = `${macPrefix}*${id}*${key.salt}*${iv}*${encryptedB64}*${expiration}`;\n  const mac = await hmacWithPassword(_crypto, integrity, opts.integrity, macBaseString);\n  const sealed = `${macBaseString}*${mac.salt}*${mac.digest}`;\n  return sealed;\n};\nvar fixedTimeComparison = (a, b) => {\n  let mismatch = a.length === b.length ? 0 : 1;\n  if (mismatch)\n    b = a;\n  for (let i = 0; i < a.length; i += 1)\n    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);\n  return mismatch === 0;\n};\nvar unseal = async (_crypto, sealed, password, options) => {\n  if (!password)\n    throw new Error(\"Empty password\");\n  const opts = clone(options);\n  const now = Date.now() + (opts.localtimeOffsetMsec || 0);\n  const parts = sealed.split(\"*\");\n  if (parts.length !== 8)\n    throw new Error(\"Incorrect number of sealed components\");\n  const prefix = parts[0];\n  let passwordId = parts[1];\n  const encryptionSalt = parts[2];\n  const encryptionIv = parts[3];\n  const encryptedB64 = parts[4];\n  const expiration = parts[5];\n  const hmacSalt = parts[6];\n  const hmac = parts[7];\n  const macBaseString = `${prefix}*${passwordId}*${encryptionSalt}*${encryptionIv}*${encryptedB64}*${expiration}`;\n  if (macPrefix !== prefix)\n    throw new Error(\"Wrong mac prefix\");\n  if (expiration) {\n    if (!/^\\d+$/.test(expiration))\n      throw new Error(\"Invalid expiration\");\n    const exp = Number.parseInt(expiration, 10);\n    if (exp <= now - opts.timestampSkewSec * 1e3)\n      throw new Error(\"Expired seal\");\n  }\n  let pass = \"\";\n  passwordId = passwordId || \"default\";\n  if (typeof password === \"string\" || password instanceof Uint8Array)\n    pass = password;\n  else if (passwordId in password) {\n    pass = password[passwordId];\n  } else {\n    throw new Error(`Cannot find password: ${passwordId}`);\n  }\n  pass = normalizePassword(pass);\n  const macOptions = opts.integrity;\n  macOptions.salt = hmacSalt;\n  const mac = await hmacWithPassword(_crypto, pass.integrity, macOptions, macBaseString);\n  if (!fixedTimeComparison(mac.digest, hmac))\n    throw new Error(\"Bad hmac value\");\n  const encrypted = base64urlDecode(encryptedB64);\n  const decryptOptions = opts.encryption;\n  decryptOptions.salt = encryptionSalt;\n  decryptOptions.iv = base64urlDecode(encryptionIv);\n  const decrypted = await decrypt(_crypto, pass.encryption, decryptOptions, encrypted);\n  if (decrypted)\n    return JSON.parse(decrypted);\n  return null;\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaXJvbi13ZWJjcnlwdG8vZGlzdC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLG1DQUFtQyxZQUFZO0FBQy9DLHNFQUFzRSxvQkFBb0I7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0Usb0JBQW9CO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7QUFDQSxtQ0FBbUMsWUFBWTtBQUMvQztBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsbURBQW1ELFVBQVU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBO0FBQ0EsMkRBQTJELFdBQVc7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsK0VBQStFO0FBQy9GLGVBQWUsMEVBQTBFO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkMsZUFBZTtBQUNmLENBQUM7QUFDRDtBQUNBLG1CQUFtQiw0Q0FBNEM7QUFDL0QsbUJBQW1CLDRDQUE0QztBQUMvRCxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGdCQUFnQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxrQkFBa0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFDQUFxQyxJQUFJO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDJCQUEyQjtBQUNyRTtBQUNBLFVBQVUsWUFBWTtBQUN0QjtBQUNBLGNBQWMsZUFBZTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxnREFBZ0QsSUFBSSw2QkFBNkI7QUFDckg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsd0JBQXdCO0FBQzdFO0FBQ0EsNkNBQTZDLGNBQWM7QUFDM0Q7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxpQ0FBaUM7QUFDM0M7QUFDQTtBQUNBLFVBQVUsaUJBQWlCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixVQUFVLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsYUFBYSxHQUFHLFdBQVc7QUFDM0Y7QUFDQSxvQkFBb0IsY0FBYyxHQUFHLFNBQVMsR0FBRyxXQUFXO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLE9BQU8sR0FBRyxXQUFXLEdBQUcsZUFBZSxHQUFHLGFBQWEsR0FBRyxhQUFhLEdBQUcsV0FBVztBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osNkNBQTZDLFdBQVc7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlOIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvaXJvbi13ZWJjcnlwdG8vZGlzdC9pbmRleC5qcz80MDg4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy91dGlscy50c1xudmFyIGFscGhhYmV0QnlFbmNvZGluZyA9IHt9O1xudmFyIGFscGhhYmV0QnlWYWx1ZSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDY0IH0pO1xuZm9yIChsZXQgaSA9IDAsIHN0YXJ0ID0gXCJBXCIuY2hhckNvZGVBdCgwKSwgbGltaXQgPSBcIlpcIi5jaGFyQ29kZUF0KDApOyBpICsgc3RhcnQgPD0gbGltaXQ7IGkrKykge1xuICBjb25zdCBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShpICsgc3RhcnQpO1xuICBhbHBoYWJldEJ5RW5jb2RpbmdbY2hhcl0gPSBpO1xuICBhbHBoYWJldEJ5VmFsdWVbaV0gPSBjaGFyO1xufVxuZm9yIChsZXQgaSA9IDAsIHN0YXJ0ID0gXCJhXCIuY2hhckNvZGVBdCgwKSwgbGltaXQgPSBcInpcIi5jaGFyQ29kZUF0KDApOyBpICsgc3RhcnQgPD0gbGltaXQ7IGkrKykge1xuICBjb25zdCBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShpICsgc3RhcnQpO1xuICBjb25zdCBpbmRleCA9IGkgKyAyNjtcbiAgYWxwaGFiZXRCeUVuY29kaW5nW2NoYXJdID0gaW5kZXg7XG4gIGFscGhhYmV0QnlWYWx1ZVtpbmRleF0gPSBjaGFyO1xufVxuZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gIGFscGhhYmV0QnlFbmNvZGluZ1tpLnRvU3RyaW5nKDEwKV0gPSBpICsgNTI7XG4gIGNvbnN0IGNoYXIgPSBpLnRvU3RyaW5nKDEwKTtcbiAgY29uc3QgaW5kZXggPSBpICsgNTI7XG4gIGFscGhhYmV0QnlFbmNvZGluZ1tjaGFyXSA9IGluZGV4O1xuICBhbHBoYWJldEJ5VmFsdWVbaW5kZXhdID0gY2hhcjtcbn1cbmFscGhhYmV0QnlFbmNvZGluZ1tcIi1cIl0gPSA2MjtcbmFscGhhYmV0QnlWYWx1ZVs2Ml0gPSBcIi1cIjtcbmFscGhhYmV0QnlFbmNvZGluZ1tcIl9cIl0gPSA2MztcbmFscGhhYmV0QnlWYWx1ZVs2M10gPSBcIl9cIjtcbnZhciBiaXRzUGVyTGV0dGVyID0gNjtcbnZhciBiaXRzUGVyQnl0ZSA9IDg7XG52YXIgbWF4TGV0dGVyVmFsdWUgPSA2MztcbnZhciBzdHJpbmdUb0J1ZmZlciA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHZhbHVlKTtcbn07XG52YXIgYnVmZmVyVG9TdHJpbmcgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZSh2YWx1ZSk7XG59O1xudmFyIGJhc2U2NHVybERlY29kZSA9IChfaW5wdXQpID0+IHtcbiAgY29uc3QgaW5wdXQgPSBfaW5wdXQgKyBcIj1cIi5yZXBlYXQoKDQgLSBfaW5wdXQubGVuZ3RoICUgNCkgJSA0KTtcbiAgbGV0IHRvdGFsQnl0ZUxlbmd0aCA9IGlucHV0Lmxlbmd0aCAvIDQgKiAzO1xuICBpZiAoaW5wdXQuZW5kc1dpdGgoXCI9PVwiKSkge1xuICAgIHRvdGFsQnl0ZUxlbmd0aCAtPSAyO1xuICB9IGVsc2UgaWYgKGlucHV0LmVuZHNXaXRoKFwiPVwiKSkge1xuICAgIHRvdGFsQnl0ZUxlbmd0aC0tO1xuICB9XG4gIGNvbnN0IG91dCA9IG5ldyBBcnJheUJ1ZmZlcih0b3RhbEJ5dGVMZW5ndGgpO1xuICBjb25zdCBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhvdXQpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSA0KSB7XG4gICAgbGV0IGJpdHMgPSAwO1xuICAgIGxldCBiaXRMZW5ndGggPSAwO1xuICAgIGZvciAobGV0IGogPSBpLCBsaW1pdCA9IGkgKyAzOyBqIDw9IGxpbWl0OyBqKyspIHtcbiAgICAgIGlmIChpbnB1dFtqXSA9PT0gXCI9XCIpIHtcbiAgICAgICAgYml0cyA+Pj0gYml0c1BlckxldHRlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghKGlucHV0W2pdIGluIGFscGhhYmV0QnlFbmNvZGluZykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGNoYXJhY3RlciAke2lucHV0W2pdfSBpbiBiYXNlNjQgc3RyaW5nLmApO1xuICAgICAgICB9XG4gICAgICAgIGJpdHMgfD0gYWxwaGFiZXRCeUVuY29kaW5nW2lucHV0W2pdXSA8PCAobGltaXQgLSBqKSAqIGJpdHNQZXJMZXR0ZXI7XG4gICAgICAgIGJpdExlbmd0aCArPSBiaXRzUGVyTGV0dGVyO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjaHVua09mZnNldCA9IGkgLyA0ICogMztcbiAgICBiaXRzID4+PSBiaXRMZW5ndGggJSBiaXRzUGVyQnl0ZTtcbiAgICBjb25zdCBieXRlTGVuZ3RoID0gTWF0aC5mbG9vcihiaXRMZW5ndGggLyBiaXRzUGVyQnl0ZSk7XG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBieXRlTGVuZ3RoOyBrKyspIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IChieXRlTGVuZ3RoIC0gayAtIDEpICogYml0c1BlckJ5dGU7XG4gICAgICBkYXRhVmlldy5zZXRVaW50OChjaHVua09mZnNldCArIGssIChiaXRzICYgMjU1IDw8IG9mZnNldCkgPj4gb2Zmc2V0KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KG91dCk7XG59O1xudmFyIGJhc2U2NHVybEVuY29kZSA9IChfaW5wdXQpID0+IHtcbiAgY29uc3QgaW5wdXQgPSB0eXBlb2YgX2lucHV0ID09PSBcInN0cmluZ1wiID8gc3RyaW5nVG9CdWZmZXIoX2lucHV0KSA6IF9pbnB1dDtcbiAgbGV0IHN0ciA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpICs9IDMpIHtcbiAgICBsZXQgYml0cyA9IDA7XG4gICAgbGV0IGJpdExlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaiA9IGksIGxpbWl0ID0gTWF0aC5taW4oaSArIDMsIGlucHV0Lmxlbmd0aCk7IGogPCBsaW1pdDsgaisrKSB7XG4gICAgICBiaXRzIHw9IGlucHV0W2pdIDw8IChsaW1pdCAtIGogLSAxKSAqIGJpdHNQZXJCeXRlO1xuICAgICAgYml0TGVuZ3RoICs9IGJpdHNQZXJCeXRlO1xuICAgIH1cbiAgICBjb25zdCBiaXRDbHVzdGVyQ291bnQgPSBNYXRoLmNlaWwoYml0TGVuZ3RoIC8gYml0c1BlckxldHRlcik7XG4gICAgYml0cyA8PD0gYml0Q2x1c3RlckNvdW50ICogYml0c1BlckxldHRlciAtIGJpdExlbmd0aDtcbiAgICBmb3IgKGxldCBrID0gMTsgayA8PSBiaXRDbHVzdGVyQ291bnQ7IGsrKykge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gKGJpdENsdXN0ZXJDb3VudCAtIGspICogYml0c1BlckxldHRlcjtcbiAgICAgIHN0ciArPSBhbHBoYWJldEJ5VmFsdWVbKGJpdHMgJiBtYXhMZXR0ZXJWYWx1ZSA8PCBvZmZzZXQpID4+IG9mZnNldF07XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG4vLyBzcmMvaW5kZXgudHNcbnZhciBkZWZhdWx0cyA9IHtcbiAgZW5jcnlwdGlvbjogeyBzYWx0Qml0czogMjU2LCBhbGdvcml0aG06IFwiYWVzLTI1Ni1jYmNcIiwgaXRlcmF0aW9uczogMSwgbWluUGFzc3dvcmRsZW5ndGg6IDMyIH0sXG4gIGludGVncml0eTogeyBzYWx0Qml0czogMjU2LCBhbGdvcml0aG06IFwic2hhMjU2XCIsIGl0ZXJhdGlvbnM6IDEsIG1pblBhc3N3b3JkbGVuZ3RoOiAzMiB9LFxuICB0dGw6IDAsXG4gIHRpbWVzdGFtcFNrZXdTZWM6IDYwLFxuICBsb2NhbHRpbWVPZmZzZXRNc2VjOiAwXG59O1xudmFyIGNsb25lID0gKG9wdGlvbnMpID0+ICh7XG4gIC4uLm9wdGlvbnMsXG4gIGVuY3J5cHRpb246IHsgLi4ub3B0aW9ucy5lbmNyeXB0aW9uIH0sXG4gIGludGVncml0eTogeyAuLi5vcHRpb25zLmludGVncml0eSB9XG59KTtcbnZhciBhbGdvcml0aG1zID0ge1xuICBcImFlcy0xMjgtY3RyXCI6IHsga2V5Qml0czogMTI4LCBpdkJpdHM6IDEyOCwgbmFtZTogXCJBRVMtQ1RSXCIgfSxcbiAgXCJhZXMtMjU2LWNiY1wiOiB7IGtleUJpdHM6IDI1NiwgaXZCaXRzOiAxMjgsIG5hbWU6IFwiQUVTLUNCQ1wiIH0sXG4gIHNoYTI1NjogeyBrZXlCaXRzOiAyNTYsIG5hbWU6IFwiU0hBLTI1NlwiIH1cbn07XG52YXIgbWFjRm9ybWF0VmVyc2lvbiA9IFwiMlwiO1xudmFyIG1hY1ByZWZpeCA9IFwiRmUyNi4yXCI7XG52YXIgcmFuZG9tQnl0ZXMgPSAoX2NyeXB0bywgc2l6ZSkgPT4ge1xuICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICBfY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhieXRlcyk7XG4gIHJldHVybiBieXRlcztcbn07XG52YXIgcmFuZG9tQml0cyA9IChfY3J5cHRvLCBiaXRzKSA9PiB7XG4gIGlmIChiaXRzIDwgMSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJhbmRvbSBiaXRzIGNvdW50XCIpO1xuICBjb25zdCBieXRlcyA9IE1hdGguY2VpbChiaXRzIC8gOCk7XG4gIHJldHVybiByYW5kb21CeXRlcyhfY3J5cHRvLCBieXRlcyk7XG59O1xudmFyIHBia2RmMiA9IGFzeW5jIChfY3J5cHRvLCBwYXNzd29yZCwgc2FsdCwgaXRlcmF0aW9ucywga2V5TGVuZ3RoLCBoYXNoKSA9PiB7XG4gIGNvbnN0IHBhc3N3b3JkQnVmZmVyID0gc3RyaW5nVG9CdWZmZXIocGFzc3dvcmQpO1xuICBjb25zdCBpbXBvcnRlZEtleSA9IGF3YWl0IF9jcnlwdG8uc3VidGxlLmltcG9ydEtleShcbiAgICBcInJhd1wiLFxuICAgIHBhc3N3b3JkQnVmZmVyLFxuICAgIHsgbmFtZTogXCJQQktERjJcIiB9LFxuICAgIGZhbHNlLFxuICAgIFtcImRlcml2ZUJpdHNcIl1cbiAgKTtcbiAgY29uc3Qgc2FsdEJ1ZmZlciA9IHN0cmluZ1RvQnVmZmVyKHNhbHQpO1xuICBjb25zdCBwYXJhbXMgPSB7IG5hbWU6IFwiUEJLREYyXCIsIGhhc2gsIHNhbHQ6IHNhbHRCdWZmZXIsIGl0ZXJhdGlvbnMgfTtcbiAgY29uc3QgZGVyaXZhdGlvbiA9IGF3YWl0IF9jcnlwdG8uc3VidGxlLmRlcml2ZUJpdHMocGFyYW1zLCBpbXBvcnRlZEtleSwga2V5TGVuZ3RoICogOCk7XG4gIHJldHVybiBkZXJpdmF0aW9uO1xufTtcbnZhciBnZW5lcmF0ZUtleSA9IGFzeW5jIChfY3J5cHRvLCBwYXNzd29yZCwgb3B0aW9ucykgPT4ge1xuICB2YXIgX2E7XG4gIGlmICghKHBhc3N3b3JkID09IG51bGwgPyB2b2lkIDAgOiBwYXNzd29yZC5sZW5ndGgpKVxuICAgIHRocm93IG5ldyBFcnJvcihcIkVtcHR5IHBhc3N3b3JkXCIpO1xuICBpZiAob3B0aW9ucyA9PSBudWxsIHx8IHR5cGVvZiBvcHRpb25zICE9PSBcIm9iamVjdFwiKVxuICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBvcHRpb25zXCIpO1xuICBpZiAoIShvcHRpb25zLmFsZ29yaXRobSBpbiBhbGdvcml0aG1zKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gYWxnb3JpdGhtOiAke29wdGlvbnMuYWxnb3JpdGhtfWApO1xuICBjb25zdCBhbGdvcml0aG0gPSBhbGdvcml0aG1zW29wdGlvbnMuYWxnb3JpdGhtXTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGhtYWMgPSAoX2EgPSBvcHRpb25zLmhtYWMpICE9IG51bGwgPyBfYSA6IGZhbHNlO1xuICBjb25zdCBpZCA9IGhtYWMgPyB7IG5hbWU6IFwiSE1BQ1wiLCBoYXNoOiBhbGdvcml0aG0ubmFtZSB9IDogeyBuYW1lOiBhbGdvcml0aG0ubmFtZSB9O1xuICBjb25zdCB1c2FnZSA9IGhtYWMgPyBbXCJzaWduXCIsIFwidmVyaWZ5XCJdIDogW1wiZW5jcnlwdFwiLCBcImRlY3J5cHRcIl07XG4gIGlmICh0eXBlb2YgcGFzc3dvcmQgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZiAocGFzc3dvcmQubGVuZ3RoIDwgb3B0aW9ucy5taW5QYXNzd29yZGxlbmd0aClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFBhc3N3b3JkIHN0cmluZyB0b28gc2hvcnQgKG1pbiAke29wdGlvbnMubWluUGFzc3dvcmRsZW5ndGh9IGNoYXJhY3RlcnMgcmVxdWlyZWQpYFxuICAgICAgKTtcbiAgICBsZXQgeyBzYWx0ID0gXCJcIiB9ID0gb3B0aW9ucztcbiAgICBpZiAoIXNhbHQpIHtcbiAgICAgIGNvbnN0IHsgc2FsdEJpdHMgPSAwIH0gPSBvcHRpb25zO1xuICAgICAgaWYgKCFzYWx0Qml0cylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBzYWx0IGFuZCBzYWx0Qml0cyBvcHRpb25zXCIpO1xuICAgICAgY29uc3QgcmFuZG9tU2FsdCA9IHJhbmRvbUJpdHMoX2NyeXB0bywgc2FsdEJpdHMpO1xuICAgICAgc2FsdCA9IFsuLi5uZXcgVWludDhBcnJheShyYW5kb21TYWx0KV0ubWFwKCh4KSA9PiB4LnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIikpLmpvaW4oXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IGRlcml2ZWRLZXkgPSBhd2FpdCBwYmtkZjIoXG4gICAgICBfY3J5cHRvLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICBzYWx0LFxuICAgICAgb3B0aW9ucy5pdGVyYXRpb25zLFxuICAgICAgYWxnb3JpdGhtLmtleUJpdHMgLyA4LFxuICAgICAgXCJTSEEtMVwiXG4gICAgKTtcbiAgICBjb25zdCBpbXBvcnRlZEVuY3J5cHRpb25LZXkgPSBhd2FpdCBfY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXG4gICAgICBcInJhd1wiLFxuICAgICAgZGVyaXZlZEtleSxcbiAgICAgIGlkLFxuICAgICAgZmFsc2UsXG4gICAgICB1c2FnZVxuICAgICk7XG4gICAgcmVzdWx0LmtleSA9IGltcG9ydGVkRW5jcnlwdGlvbktleTtcbiAgICByZXN1bHQuc2FsdCA9IHNhbHQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IGFsZ29yaXRobS5rZXlCaXRzIC8gOClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIktleSBidWZmZXIgKHBhc3N3b3JkKSB0b28gc21hbGxcIik7XG4gICAgcmVzdWx0LmtleSA9IGF3YWl0IF9jcnlwdG8uc3VidGxlLmltcG9ydEtleShcInJhd1wiLCBwYXNzd29yZCwgaWQsIGZhbHNlLCB1c2FnZSk7XG4gICAgcmVzdWx0LnNhbHQgPSBcIlwiO1xuICB9XG4gIGlmIChvcHRpb25zLml2KVxuICAgIHJlc3VsdC5pdiA9IG9wdGlvbnMuaXY7XG4gIGVsc2UgaWYgKFwiaXZCaXRzXCIgaW4gYWxnb3JpdGhtKVxuICAgIHJlc3VsdC5pdiA9IHJhbmRvbUJpdHMoX2NyeXB0bywgYWxnb3JpdGhtLml2Qml0cyk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xudmFyIGdldEVuY3J5cHRQYXJhbXMgPSAoYWxnb3JpdGhtLCBrZXksIGRhdGEpID0+IHtcbiAgcmV0dXJuIFtcbiAgICBhbGdvcml0aG0gPT09IFwiYWVzLTEyOC1jdHJcIiA/IHsgbmFtZTogXCJBRVMtQ1RSXCIsIGNvdW50ZXI6IGtleS5pdiwgbGVuZ3RoOiAxMjggfSA6IHsgbmFtZTogXCJBRVMtQ0JDXCIsIGl2OiBrZXkuaXYgfSxcbiAgICBrZXkua2V5LFxuICAgIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiID8gc3RyaW5nVG9CdWZmZXIoZGF0YSkgOiBkYXRhXG4gIF07XG59O1xudmFyIGVuY3J5cHQgPSBhc3luYyAoX2NyeXB0bywgcGFzc3dvcmQsIG9wdGlvbnMsIGRhdGEpID0+IHtcbiAgY29uc3Qga2V5ID0gYXdhaXQgZ2VuZXJhdGVLZXkoX2NyeXB0bywgcGFzc3dvcmQsIG9wdGlvbnMpO1xuICBjb25zdCBlbmNyeXB0ZWQgPSBhd2FpdCBfY3J5cHRvLnN1YnRsZS5lbmNyeXB0KC4uLmdldEVuY3J5cHRQYXJhbXMob3B0aW9ucy5hbGdvcml0aG0sIGtleSwgZGF0YSkpO1xuICByZXR1cm4geyBlbmNyeXB0ZWQ6IG5ldyBVaW50OEFycmF5KGVuY3J5cHRlZCksIGtleSB9O1xufTtcbnZhciBkZWNyeXB0ID0gYXN5bmMgKF9jcnlwdG8sIHBhc3N3b3JkLCBvcHRpb25zLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGtleSA9IGF3YWl0IGdlbmVyYXRlS2V5KF9jcnlwdG8sIHBhc3N3b3JkLCBvcHRpb25zKTtcbiAgY29uc3QgZGVjcnlwdGVkID0gYXdhaXQgX2NyeXB0by5zdWJ0bGUuZGVjcnlwdCguLi5nZXRFbmNyeXB0UGFyYW1zKG9wdGlvbnMuYWxnb3JpdGhtLCBrZXksIGRhdGEpKTtcbiAgcmV0dXJuIGJ1ZmZlclRvU3RyaW5nKG5ldyBVaW50OEFycmF5KGRlY3J5cHRlZCkpO1xufTtcbnZhciBobWFjV2l0aFBhc3N3b3JkID0gYXN5bmMgKF9jcnlwdG8sIHBhc3N3b3JkLCBvcHRpb25zLCBkYXRhKSA9PiB7XG4gIGNvbnN0IGtleSA9IGF3YWl0IGdlbmVyYXRlS2V5KF9jcnlwdG8sIHBhc3N3b3JkLCB7IC4uLm9wdGlvbnMsIGhtYWM6IHRydWUgfSk7XG4gIGNvbnN0IHRleHRCdWZmZXIgPSBzdHJpbmdUb0J1ZmZlcihkYXRhKTtcbiAgY29uc3Qgc2lnbmVkID0gYXdhaXQgX2NyeXB0by5zdWJ0bGUuc2lnbih7IG5hbWU6IFwiSE1BQ1wiIH0sIGtleS5rZXksIHRleHRCdWZmZXIpO1xuICBjb25zdCBkaWdlc3QgPSBiYXNlNjR1cmxFbmNvZGUobmV3IFVpbnQ4QXJyYXkoc2lnbmVkKSk7XG4gIHJldHVybiB7IGRpZ2VzdCwgc2FsdDoga2V5LnNhbHQgfTtcbn07XG52YXIgbm9ybWFsaXplUGFzc3dvcmQgPSAocGFzc3dvcmQpID0+IHtcbiAgaWYgKHR5cGVvZiBwYXNzd29yZCA9PT0gXCJzdHJpbmdcIiB8fCBwYXNzd29yZCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpXG4gICAgcmV0dXJuIHsgZW5jcnlwdGlvbjogcGFzc3dvcmQsIGludGVncml0eTogcGFzc3dvcmQgfTtcbiAgaWYgKFwic2VjcmV0XCIgaW4gcGFzc3dvcmQpXG4gICAgcmV0dXJuIHsgaWQ6IHBhc3N3b3JkLmlkLCBlbmNyeXB0aW9uOiBwYXNzd29yZC5zZWNyZXQsIGludGVncml0eTogcGFzc3dvcmQuc2VjcmV0IH07XG4gIHJldHVybiB7IGlkOiBwYXNzd29yZC5pZCwgZW5jcnlwdGlvbjogcGFzc3dvcmQuZW5jcnlwdGlvbiwgaW50ZWdyaXR5OiBwYXNzd29yZC5pbnRlZ3JpdHkgfTtcbn07XG52YXIgc2VhbCA9IGFzeW5jIChfY3J5cHRvLCBvYmplY3QsIHBhc3N3b3JkLCBvcHRpb25zKSA9PiB7XG4gIGlmICghcGFzc3dvcmQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRW1wdHkgcGFzc3dvcmRcIik7XG4gIGNvbnN0IG9wdHMgPSBjbG9uZShvcHRpb25zKTtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKSArIChvcHRzLmxvY2FsdGltZU9mZnNldE1zZWMgfHwgMCk7XG4gIGNvbnN0IG9iamVjdFN0cmluZyA9IEpTT04uc3RyaW5naWZ5KG9iamVjdCk7XG4gIGNvbnN0IHBhc3MgPSBub3JtYWxpemVQYXNzd29yZChwYXNzd29yZCk7XG4gIGNvbnN0IHsgaWQgPSBcIlwiLCBlbmNyeXB0aW9uLCBpbnRlZ3JpdHkgfSA9IHBhc3M7XG4gIGlmIChpZCAmJiAhL15cXHcrJC8udGVzdChpZCkpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXNzd29yZCBpZFwiKTtcbiAgY29uc3QgeyBlbmNyeXB0ZWQsIGtleSB9ID0gYXdhaXQgZW5jcnlwdChfY3J5cHRvLCBlbmNyeXB0aW9uLCBvcHRzLmVuY3J5cHRpb24sIG9iamVjdFN0cmluZyk7XG4gIGNvbnN0IGVuY3J5cHRlZEI2NCA9IGJhc2U2NHVybEVuY29kZShuZXcgVWludDhBcnJheShlbmNyeXB0ZWQpKTtcbiAgY29uc3QgaXYgPSBiYXNlNjR1cmxFbmNvZGUoa2V5Lml2KTtcbiAgY29uc3QgZXhwaXJhdGlvbiA9IG9wdHMudHRsID8gbm93ICsgb3B0cy50dGwgOiBcIlwiO1xuICBjb25zdCBtYWNCYXNlU3RyaW5nID0gYCR7bWFjUHJlZml4fSoke2lkfSoke2tleS5zYWx0fSoke2l2fSoke2VuY3J5cHRlZEI2NH0qJHtleHBpcmF0aW9ufWA7XG4gIGNvbnN0IG1hYyA9IGF3YWl0IGhtYWNXaXRoUGFzc3dvcmQoX2NyeXB0bywgaW50ZWdyaXR5LCBvcHRzLmludGVncml0eSwgbWFjQmFzZVN0cmluZyk7XG4gIGNvbnN0IHNlYWxlZCA9IGAke21hY0Jhc2VTdHJpbmd9KiR7bWFjLnNhbHR9KiR7bWFjLmRpZ2VzdH1gO1xuICByZXR1cm4gc2VhbGVkO1xufTtcbnZhciBmaXhlZFRpbWVDb21wYXJpc29uID0gKGEsIGIpID0+IHtcbiAgbGV0IG1pc21hdGNoID0gYS5sZW5ndGggPT09IGIubGVuZ3RoID8gMCA6IDE7XG4gIGlmIChtaXNtYXRjaClcbiAgICBiID0gYTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSArPSAxKVxuICAgIG1pc21hdGNoIHw9IGEuY2hhckNvZGVBdChpKSBeIGIuY2hhckNvZGVBdChpKTtcbiAgcmV0dXJuIG1pc21hdGNoID09PSAwO1xufTtcbnZhciB1bnNlYWwgPSBhc3luYyAoX2NyeXB0bywgc2VhbGVkLCBwYXNzd29yZCwgb3B0aW9ucykgPT4ge1xuICBpZiAoIXBhc3N3b3JkKVxuICAgIHRocm93IG5ldyBFcnJvcihcIkVtcHR5IHBhc3N3b3JkXCIpO1xuICBjb25zdCBvcHRzID0gY2xvbmUob3B0aW9ucyk7XG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCkgKyAob3B0cy5sb2NhbHRpbWVPZmZzZXRNc2VjIHx8IDApO1xuICBjb25zdCBwYXJ0cyA9IHNlYWxlZC5zcGxpdChcIipcIik7XG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDgpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW5jb3JyZWN0IG51bWJlciBvZiBzZWFsZWQgY29tcG9uZW50c1wiKTtcbiAgY29uc3QgcHJlZml4ID0gcGFydHNbMF07XG4gIGxldCBwYXNzd29yZElkID0gcGFydHNbMV07XG4gIGNvbnN0IGVuY3J5cHRpb25TYWx0ID0gcGFydHNbMl07XG4gIGNvbnN0IGVuY3J5cHRpb25JdiA9IHBhcnRzWzNdO1xuICBjb25zdCBlbmNyeXB0ZWRCNjQgPSBwYXJ0c1s0XTtcbiAgY29uc3QgZXhwaXJhdGlvbiA9IHBhcnRzWzVdO1xuICBjb25zdCBobWFjU2FsdCA9IHBhcnRzWzZdO1xuICBjb25zdCBobWFjID0gcGFydHNbN107XG4gIGNvbnN0IG1hY0Jhc2VTdHJpbmcgPSBgJHtwcmVmaXh9KiR7cGFzc3dvcmRJZH0qJHtlbmNyeXB0aW9uU2FsdH0qJHtlbmNyeXB0aW9uSXZ9KiR7ZW5jcnlwdGVkQjY0fSoke2V4cGlyYXRpb259YDtcbiAgaWYgKG1hY1ByZWZpeCAhPT0gcHJlZml4KVxuICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIG1hYyBwcmVmaXhcIik7XG4gIGlmIChleHBpcmF0aW9uKSB7XG4gICAgaWYgKCEvXlxcZCskLy50ZXN0KGV4cGlyYXRpb24pKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBleHBpcmF0aW9uXCIpO1xuICAgIGNvbnN0IGV4cCA9IE51bWJlci5wYXJzZUludChleHBpcmF0aW9uLCAxMCk7XG4gICAgaWYgKGV4cCA8PSBub3cgLSBvcHRzLnRpbWVzdGFtcFNrZXdTZWMgKiAxZTMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBpcmVkIHNlYWxcIik7XG4gIH1cbiAgbGV0IHBhc3MgPSBcIlwiO1xuICBwYXNzd29yZElkID0gcGFzc3dvcmRJZCB8fCBcImRlZmF1bHRcIjtcbiAgaWYgKHR5cGVvZiBwYXNzd29yZCA9PT0gXCJzdHJpbmdcIiB8fCBwYXNzd29yZCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpXG4gICAgcGFzcyA9IHBhc3N3b3JkO1xuICBlbHNlIGlmIChwYXNzd29yZElkIGluIHBhc3N3b3JkKSB7XG4gICAgcGFzcyA9IHBhc3N3b3JkW3Bhc3N3b3JkSWRdO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgcGFzc3dvcmQ6ICR7cGFzc3dvcmRJZH1gKTtcbiAgfVxuICBwYXNzID0gbm9ybWFsaXplUGFzc3dvcmQocGFzcyk7XG4gIGNvbnN0IG1hY09wdGlvbnMgPSBvcHRzLmludGVncml0eTtcbiAgbWFjT3B0aW9ucy5zYWx0ID0gaG1hY1NhbHQ7XG4gIGNvbnN0IG1hYyA9IGF3YWl0IGhtYWNXaXRoUGFzc3dvcmQoX2NyeXB0bywgcGFzcy5pbnRlZ3JpdHksIG1hY09wdGlvbnMsIG1hY0Jhc2VTdHJpbmcpO1xuICBpZiAoIWZpeGVkVGltZUNvbXBhcmlzb24obWFjLmRpZ2VzdCwgaG1hYykpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGhtYWMgdmFsdWVcIik7XG4gIGNvbnN0IGVuY3J5cHRlZCA9IGJhc2U2NHVybERlY29kZShlbmNyeXB0ZWRCNjQpO1xuICBjb25zdCBkZWNyeXB0T3B0aW9ucyA9IG9wdHMuZW5jcnlwdGlvbjtcbiAgZGVjcnlwdE9wdGlvbnMuc2FsdCA9IGVuY3J5cHRpb25TYWx0O1xuICBkZWNyeXB0T3B0aW9ucy5pdiA9IGJhc2U2NHVybERlY29kZShlbmNyeXB0aW9uSXYpO1xuICBjb25zdCBkZWNyeXB0ZWQgPSBhd2FpdCBkZWNyeXB0KF9jcnlwdG8sIHBhc3MuZW5jcnlwdGlvbiwgZGVjcnlwdE9wdGlvbnMsIGVuY3J5cHRlZCk7XG4gIGlmIChkZWNyeXB0ZWQpXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjcnlwdGVkKTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgeyBhbGdvcml0aG1zLCBiYXNlNjR1cmxEZWNvZGUsIGJhc2U2NHVybEVuY29kZSwgYnVmZmVyVG9TdHJpbmcsIGNsb25lLCBkZWNyeXB0LCBkZWZhdWx0cywgZW5jcnlwdCwgZ2VuZXJhdGVLZXksIGhtYWNXaXRoUGFzc3dvcmQsIG1hY0Zvcm1hdFZlcnNpb24sIG1hY1ByZWZpeCwgcmFuZG9tQml0cywgc2VhbCwgc3RyaW5nVG9CdWZmZXIsIHVuc2VhbCB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/iron-webcrypto/dist/index.js\n");

/***/ })

};
;