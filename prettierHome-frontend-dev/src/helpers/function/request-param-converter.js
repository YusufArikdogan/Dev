export const prepareRequestParams = (params) => {
    const mapped =  Object.entries(params)
      .filter(([key, value]) => value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    return mapped ? `${mapped}` : "";
  };