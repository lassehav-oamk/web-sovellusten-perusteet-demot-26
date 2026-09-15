import React from 'react'

export default function DateNow() {

    let date = new Date();

  return (
    <div>Date: { date.toDateString() } </div>
  )
}

