export const doApiCall = async (callback : Function, properties : unknown, mapProperty? : string)
  : Promise<any> => {
    const fetchedData = await callback(properties);
    return new Promise<any>((resolve, reject) => {
      switch(fetchedData.get('statusCode')){
        case 200:
        case 201:
        case 400:
        case 404:
        case 409:
          return (mapProperty) ?
            resolve(fetchedData.get(mapProperty)) :
            resolve(fetchedData)
        case 500:
        case 503:
          return reject(fetchedData)
      }
    })
}
