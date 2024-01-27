export const isValidOptions = (value) => {
    for (var key in value) {
      if (!value[key]) return false;
    }
    return true;
  };