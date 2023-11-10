// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<FizzBuzz<1>, ['1']>>,
  Expect<Equal<FizzBuzz<5>, ['1', '2', 'Fizz', '4', 'Buzz']>>,
  Expect<
    Equal<
      FizzBuzz<20>,
      [
        '1',
        '2',
        'Fizz',
        '4',
        'Buzz',
        'Fizz',
        '7',
        '8',
        'Fizz',
        'Buzz',
        '11',
        'Fizz',
        '13',
        '14',
        'FizzBuzz',
        '16',
        '17',
        'Fizz',
        '19',
        'Buzz',
      ]
    >
  >,
  Expect<
    Equal<
      FizzBuzz<100>,
      [
        '1',
        '2',
        'Fizz',
        '4',
        'Buzz',
        'Fizz',
        '7',
        '8',
        'Fizz',
        'Buzz',
        '11',
        'Fizz',
        '13',
        '14',
        'FizzBuzz',
        '16',
        '17',
        'Fizz',
        '19',
        'Buzz',
        'Fizz',
        '22',
        '23',
        'Fizz',
        'Buzz',
        '26',
        'Fizz',
        '28',
        '29',
        'FizzBuzz',
        '31',
        '32',
        'Fizz',
        '34',
        'Buzz',
        'Fizz',
        '37',
        '38',
        'Fizz',
        'Buzz',
        '41',
        'Fizz',
        '43',
        '44',
        'FizzBuzz',
        '46',
        '47',
        'Fizz',
        '49',
        'Buzz',
        'Fizz',
        '52',
        '53',
        'Fizz',
        'Buzz',
        '56',
        'Fizz',
        '58',
        '59',
        'FizzBuzz',
        '61',
        '62',
        'Fizz',
        '64',
        'Buzz',
        'Fizz',
        '67',
        '68',
        'Fizz',
        'Buzz',
        '71',
        'Fizz',
        '73',
        '74',
        'FizzBuzz',
        '76',
        '77',
        'Fizz',
        '79',
        'Buzz',
        'Fizz',
        '82',
        '83',
        'Fizz',
        'Buzz',
        '86',
        'Fizz',
        '88',
        '89',
        'FizzBuzz',
        '91',
        '92',
        'Fizz',
        '94',
        'Buzz',
        'Fizz',
        '97',
        '98',
        'Fizz',
        'Buzz',
      ]
    >
  >,
]
// Print "Fizz" if an integer is divisible by 3;
// Print "Buzz" if an integer is divisible by 5;
// Print "FizzBuzz" if an integer is divisible by both 3 and 5.
// ============= Your Code Here =============
type IsDivisibleByThree<Arr extends unknown[]> = Arr['length'] extends 2
  ? true
  : false

type IsDivisibleByFive<Arr extends unknown[]> = Arr['length'] extends 4
  ? true
  : false

type FizzBuzz<
  N extends number,
  Res extends unknown[] = [],
  Three extends unknown[] = [],
  Five extends unknown[] = [],
> = Res['length'] extends N
  ? Res
  : IsDivisibleByFive<Five> extends true
  ? IsDivisibleByThree<Three> extends true
    ? FizzBuzz<N, [...Res, 'FizzBuzz'], [], []>
    : FizzBuzz<N, [...Res, 'Buzz'], [...Three, unknown], []>
  : IsDivisibleByThree<Three> extends true
  ? FizzBuzz<N, [...Res, 'Fizz'], [], [...Five, unknown]>
  : FizzBuzz<
      N,
      [...Res, `${[...Res, unknown]['length']}`],
      [...Three, unknown],
      [...Five, unknown]
    >

type T = FizzBuzz<5>
