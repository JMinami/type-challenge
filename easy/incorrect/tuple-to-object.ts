// Given an array, transform it into an object type and the key/value
// must be in the provided array
namespace TupleToObject{

  type TuppleToObject<Arr extends readonly PropertyKey[]> = {
    [item in Arr[number]]: item
  }

  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

  type result = TuppleToObject<typeof tuple>

  const re: result = {
    tesla: 'tesla',
    "model 3": 'model 3',
    "model Y": 'model Y',
    "model X": "model X"
  }
  console.log(re)
}