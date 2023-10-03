type Brewery = { id: string; name: string };

const breweryList = [
  { id: "1", name: "버드나무 브루어리" },
  { id: "2", name: "크래프트 브로스", option: "옵션" },
];

function isBreweryList(datas: unknown): datas is Brewery[] {
  return Array.isArray(datas) && datas.every(isBrewery);
}

function isBrewery(data: unknown): data is Brewery {
  if (data && typeof data === "object") {
    return "id" in data && "name" in data;
  }
  return false;
}
