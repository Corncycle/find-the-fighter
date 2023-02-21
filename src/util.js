import cData from "./character-data.json"

export const charData = cData

export const charDataByName = {}
charData.characters.forEach((char) => {
  charDataByName[char.name] = char
})

export const charNames = charData.characters.map((char) => char.name)
