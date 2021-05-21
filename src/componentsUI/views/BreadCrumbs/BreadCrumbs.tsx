import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import {
  BreadcrumbsRow,
  BreadCrumbsInner,
  BreadcrumbsItem,
} from './styled-components'

const BreadCrumbs = (props: BreadCrumbsProps) => {
  const { breadcrumbsList: breadcrumbsListProps } = props

  return (
    <>
      <BreadcrumbsRow className="breadcrumbs">
        <BreadCrumbsInner className="breadcrumbs__inner">
          {breadcrumbsListProps.map(
            (element: BreadCrumbsMapElement, index: number) => {
              const breadcrumbClass = classNames({
                breadcrumbs__item: true,
                start: index === 0,
                end: index === breadcrumbsListProps.length - 1,
                active: window.location.pathname === element.link,
              })
              return (
                //@ts-ignore-start
                <Link key={index + element} to={element.link}>
                  <BreadcrumbsItem className={breadcrumbClass} key={index}>
                    {element.name}
                  </BreadcrumbsItem>
                </Link>
              )
            }
          )}
        </BreadCrumbsInner>
      </BreadcrumbsRow>
    </>
  )
}
export default BreadCrumbs
