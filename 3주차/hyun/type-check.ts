interface Brewery {
  id: string;
  name: string;
  ddd: string;
}

type Keys = keyof Brewery;

const brewery = {
  id: "string",
  name: "string",
} satisfies Partial<Brewery>;

function isKeyOfBrewery<T extends string | symbol>(str: T) {
  return str in brewery;
}

console.log(isKeyOfBrewery("id"));
