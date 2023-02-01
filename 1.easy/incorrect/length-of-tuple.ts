namespace LengthOfTuple{
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

  type Length<T extends any[]> = T['length']

  type teslaLength = Length<tesla>
  const t:teslaLength = 4
}