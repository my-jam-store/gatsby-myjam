import React from "react"
import Cuisine from "./Cuisine"
import { Grid } from "./Components"

export default (props) => {
  const cuisines = props.cuisines.filter(cuisine => cuisine.data.slug !== 'default')
  return (
    <Grid>
      {cuisines.map(cuisine => (
          <Cuisine slug={cuisine.data.slug} name={cuisine.data.name} key={cuisine.recordId} />
        ))}
    </Grid>
  )
}