

//make a type that has region, reason and rating
export type CoolPlaceType = {
    region: {
        latitude: number
        longitude: number
    }
    reason: string
    rating: number
    createdAt?:  Date | null
}
