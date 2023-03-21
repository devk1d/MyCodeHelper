const helper = {};

helper.uniqueArray = (arr) => {
    // 使用 Set 对象去重
    // let uniqueArray = Array.from(new Set(arr));
  
    // 使用 forEach() 和 indexOf() 方法去重
    // let uniqueArray = [];
    // arr.forEach((item) => {
    //   if (uniqueArray.indexOf(item) === -1) {
    //     uniqueArray.push(item);
    //   }
    // });
  
    // 使用 filter() 方法去重
    // let uniqueArray = arr.filter((item, index) => {
    //   return arr.indexOf(item) === index;
    // });
  
    // 使用 reduce() 方法去重
    let uniqueArray = arr.reduce((accumulator, currentValue) => {
      if (!accumulator.includes(currentValue)) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
  
    return uniqueArray;
}

module.exports = helper;
