import React from "react"
import Cuisine from "./Cuisine"
import { Grid } from "./Components"

export default () => {
  return (
    <Grid>
      <iframe src='https://www.videoask.com/f3ytzr0u3'
              allow='camera; microphone; autoplay; encrypted-media;'
              width='100%'
              height='650px'
              style={{
                border: 'none',
                borderRadius: '10px',
                gridColumn: '1/-1',
                boxShadow: '0 1px 6px 0 rgba(133,123,123,.75)',
                marginBottom: '0px'
              }}
      >
      </iframe>
    </Grid>
  )
}