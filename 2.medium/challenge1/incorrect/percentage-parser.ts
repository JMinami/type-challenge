namespace PercentageParser {
  type MySymbol = '+' | '-';
  type PercentageParser<
    A extends string
  > = A extends `${infer R}%` 
      ? R extends `${infer F extends MySymbol}${infer Rest}` 
        ? [F, Rest, '%'] 
        : ['', R, '%']
      : A extends `${infer F extends MySymbol}${infer Rest}` 
          ? [F, Rest, ''] 
          : ['', A, '']
  
  type PString1 = ''
  type PString2 = '+85%'
  type PString3 = '-85%'

  type R1 = PercentageParser<PString1>
  type R2 = PercentageParser<PString2>
  type R3 = PercentageParser<PString3>
}