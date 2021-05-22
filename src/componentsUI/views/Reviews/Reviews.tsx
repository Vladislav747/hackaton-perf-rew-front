import React from 'react'
import classNames from 'classnames'

import {
  BreadcrumbsRow,
  BreadCrumbsInner,
  BreadcrumbsItem,
} from './styled-components'

const Reviews = (props: BreadCrumbsProps) => {
  const { reviewsList: reviewsListProps = [{name: "Отзыв от Миши", id: 123}, {name: "Отзыв от Миши", id: 123}, {name: "Отзыв от Миши", id: 123}] } = props

  return (
    <>
      <BreadcrumbsRow className="reviews">
        <BreadCrumbsInner className="reviews__inner">
          {reviewsListProps.map(
            (element: BreadCrumbsMapElement, index: number) => {
              return (
                  <BreadcrumbsItem key={index}>
                    {element.name}
                  </BreadcrumbsItem>
              )
            }
          )}
        </BreadCrumbsInner>
      </BreadcrumbsRow>
    </>
  )
}
export default Reviews
