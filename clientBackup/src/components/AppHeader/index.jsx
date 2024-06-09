import React from 'react'

import { Space } from 'antd'
import ProfileIcon from '../ProfileIcon'

import styled from 'styled-components'

const FlexedDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 10px;
  background: #fff;
`

const AppHeader = ({ courseNavigation }) => {
  return (
    <FlexedDiv>
      <Space>
        <ProfileIcon />
      </Space>
    </FlexedDiv>
  )
}

export default AppHeader
