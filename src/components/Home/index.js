import React from "react"
import Cuisine from "./Cuisine"
import { Grid } from "./Components"

export default (props) => {
  const cuisines = props.cuisines.filter(cuisine => cuisine.data.slug !== 'default')
  return (
    <Grid>
      <iframe src="https://www.videoask.com/f3ytzr0u3"
              allow="camera; microphone; autoplay; encrypted-media;"
              width="100%"
              height="600px"
              style={{
                border: 'none',
                borderRadius: '24px'
              }}
      >
      </iframe>
      {/*{cuisines.map(cuisine => (<Cuisine slug={cuisine.data.slug} name={cuisine.data.name} key={cuisine.recordId} />))}*/}
    </Grid>
  )
}