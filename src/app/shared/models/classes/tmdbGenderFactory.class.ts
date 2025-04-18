import Gender from "../types/gender"

export default class TmdbGenderFactory {

    static create(num: number): Gender {
        const genderMap: {[key:number]: Gender} = {
            0: "Undefined",
            1: "Female",
            2: "Male",
            3: "Non-binary"
        }
        const gender: Gender = genderMap[num] || genderMap[0]
        return gender
    }
}

