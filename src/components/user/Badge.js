import {  Grid, Image } from 'semantic-ui-react'
//badge image linkes
import imgSrc from '../shared/ImgSrc'

const Badge = ({badge}) => {

    const badgeImages = imgSrc.badgeImages
    const badgeName = `${badge.name[0].toUpperCase()}${badge.name.slice(1)}`
    return (       
        <Grid.Column >
            <Image 
                src={badgeImages[badge.name]} 
                size='big' 
                circular 
                alt='A picture of a badge'
            /> 
            {badgeName} Badge: {badge.level}
        </Grid.Column>
    )
}

export default Badge