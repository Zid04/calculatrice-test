import { expect, test, describe } from 'vitest'

function puissance(nb:number, expo:number): number{
let result = 1;
if (expo != Math.floor(expo)){
    throw new Error("L'exposant doit être un entier:" + expo);
}
for (let i = 0; i < expo; i++) {
    result *= nb;
}
return result;
}

describe('Tests de la fonction puissance', () => {

test('power 2**3 = 8', () => {
    expect(puissance(2,3)).toBe(8);
});

test('power 4**0.5 = 2', () => {
    expect(() => puissance(4, 0.5)).toThrow("L'exposant doit être un entier:");
});

});
