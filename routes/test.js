const innerFunction3 = () => {
  throw new Error('oops');
}

const innerFunction2 = () => {
  try {
    innerFunction3();
    return true;
  } catch (error) {
    // if (error instanceof Error) {
    //   throw new Error('Inner Func Error');
    // }
    // throw error;    
    return false;
  }
}

const innerFunction = () => innerFunction2();

const main = () => {
  try {
    const result = innerFunction();
    console.log(result);
  } catch(error) {
    console.log(error);
    console.log('Something went wrong. Please try again later');
  }
}

main();

// Always define you