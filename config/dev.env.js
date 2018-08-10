var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = {
    NODE_ENV: '"development"',
    PUBLIC_KEY: '"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlnix2KuaKMyFOj3ZGPYNpRdPEarj6u8zUvy0RPATyPv346+x+9RoqHXH9uBJTsbQ2cBmYi0oEkHsqLTebff6PAvTfHiyBKJe1khmWtbwVJRXfRN/hK3jbobREm/GXoJKV7VZCVL3fkND7Pfhkc9WkhH7h0//4dH3vB0ww8o5jGtMn2Rh92eGylyoBd8KcS0+j7mywHe17KS+++MTCkU3Hnh4Xx2We0v3RSb/lC8/SdIe++3TsbPeQ5ICTM2K01oGiqqZGZqD5xLhXWQW5e8Ib6oems/iY2t/B6CosDkeHo0b6XBGis7J/ggjz0SJDA1/NbCF/cIANLlk6/Qwqk1SVwIDAQAB"',
    AES_KEY: '"aaaazzzzoooommmm"',
    Agent_ID: '"100003"',
    USER_KEY: '"823C2561D42946B98CE8652614C43FED"',
    BASE_URL: '"http://localhost:7002"'
}