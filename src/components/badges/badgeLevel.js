
//function to determine the level of a badge

const badgeLevel = (count) => {
    let level = ''
    switch (true) {
        case count < 5:
            level = 'none'
            break
        case (count >= 5 && count < 10):
            level = 'novice'
            break
        case (count >= 10 && count < 15):
            level = 'junior'
            break
        case (count >= 15 && count < 20):
            level = 'master'
            break
        case (count >= 20):
            level = 'expert'
            break
        default:
            level = 'none' 
        
    }
    return level
}

export default badgeLevel