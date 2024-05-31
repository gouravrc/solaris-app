type IStorageKeys = "draft" | "user";

export const setLocalStorage = (key: IStorageKeys, object: any) => {
  if (key === "draft") {
    let arr = [];
    let data = localStorage.getItem(key);
    let pdata = [];
    if (!data) {
      arr.push(object);
    } else {
      pdata = JSON.parse(data);
      pdata.push(object);
      arr = pdata;
    }
    localStorage.setItem(key, JSON.stringify(arr));
  }
  else{
    console.log("setting storage....", JSON.stringify(object))
    localStorage.setItem(key, JSON.stringify(object));
  }
};

export const updateLocalStorage = (key: IStorageKeys, id: any) => {
  let arr: any = [];
  let data = localStorage.getItem(key);
  let pdata = [];
  if (data) {
    pdata = JSON.parse(data);
    pdata.forEach((element: any) => {
      if (element.id !== id) {
        arr.push({ ...element });
      }
    });
  }
  console.log("clearing....",arr)
  localStorage.setItem(key, JSON.stringify(arr));
};
export const getLocalStorage = (key: IStorageKeys) => {
  return localStorage.getItem(key);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};
