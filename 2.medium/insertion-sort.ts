  const arr = [1, 2, 12, 3,10, 8]

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] > arr[j-1]) continue
      const temp = arr[j-1]
      arr[j-1] = arr[j]
      arr[j] = temp
    }
  }

  console.log(arr)
