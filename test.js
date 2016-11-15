'use strict'

const inspect  = require('util').inspect,
      test     = require('tap'),
      error    = require('.'),
      MyError1 = error('MyError1'),
      MyError2 = error('MyError2', init),
      err1_1   = MyError1('test1'),
      err1_2   = new MyError1('test2'),
      err2_1   = MyError2('test3', 'test'),
      err2_2   = new MyError2('test4', 'test')

function init(message, extra) {
    this.extra = extra
}

test.type(MyError1, 'function', 'a constructor should be returned')
test.type(MyError1, 'function', 'a constructor should be returned')

test.equals(MyError1.name, 'MyError1', 'constructor name should be set')
test.equals(MyError2.name, 'MyError2', 'constructor name should be set')

test.type(err1_1, Error, 'error should be derived from Error')
test.type(err1_2, Error, 'error should be derived from Error')
test.type(err2_1, Error, 'error should be derived from Error')
test.type(err2_2, Error, 'error should be derived from Error')

test.type(err1_1, MyError1, 'error should be an instance of its constructor')
test.type(err1_2, MyError1, 'error should be an instance of its constructor')
test.type(err2_1, MyError2, 'error should be an instance of its constructor')
test.type(err2_2, MyError2, 'error should be an instance of its constructor')

test.equals(err1_1.name, 'MyError1', 'error name should be set')
test.equals(err1_2.name, 'MyError1', 'error name should be set')
test.equals(err2_1.name, 'MyError2', 'error name should be set')
test.equals(err2_2.name, 'MyError2', 'error name should be set')

test.equals(err1_1.message, 'test1', 'error message should be set')
test.equals(err1_2.message, 'test2', 'error message should be set')
test.equals(err2_1.message, 'test3', 'error message should be set')
test.equals(err2_2.message, 'test4', 'error message should be set')

test.equals(err2_1.extra, 'test', 'init function should be called')
test.equals(err2_2.extra, 'test', 'init function should be called')

test.match(err1_1.stack, /^(My)?Error1?: test1\n/, 'error stack trace should be correct')
test.match(err1_2.stack, /^(My)?Error1?: test2\n/, 'error stack trace should be correct')
test.match(err2_1.stack, /^(My)?Error2?: test3\n/, 'error stack trace should be correct')
test.match(err2_2.stack, /^(My)?Error2?: test4\n/, 'error stack trace should be correct')

test.equals(err1_1.toString(), 'MyError1: test1', 'string representation of the error should be correct')
test.equals(err1_2.toString(), 'MyError1: test2', 'string representation of the error should be correct')
test.equals(err2_1.toString(), 'MyError2: test3', 'string representation of the error should be correct')
test.equals(err2_2.toString(), 'MyError2: test4', 'string representation of the error should be correct')

test.equals(inspect(err1_1), err1_1.stack, 'inspection of an error should be equal to its stack')
test.equals(inspect(err1_2), err1_2.stack, 'inspection of an error should be equal to its stack')
test.equals(inspect(err2_1), err2_1.stack, 'inspection of an error should be equal to its stack')
test.equals(inspect(err2_2), err2_2.stack, 'inspection of an error should be equal to its stack')

const copy = new MyError1('test1'),
      rxp  = /^(My)?Error1?: test1\n.*at\s.*\(.*test\.js:[0-9]+:[0-9]+\)\n/

test.match(err1_1.stack, rxp, 'stack traces should be the same regardless of the use of `new` operator')
test.match(copy.stack, rxp, 'stack traces should be the same regardless of the use of `new` operator')
