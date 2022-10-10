
class Print {
  static log(message: string): void {
    if (process.env.NODE_ENV != 'pro') {
      console.log(`Log : ${message}   ############### \n`);
    }
  }

  static error(message: string): void {
    if (process.env.NODE_ENV != 'pro') {
      console.error(
        `Error : ${message}   ############### \n`
      );
    }
  }
  static warning(message: string) {
    if (process.env.NODE_ENV != 'pro') {
      console.warn(
        `Warning : ${message}   s############### \n`
      );
    }
  }


}

export default Print

