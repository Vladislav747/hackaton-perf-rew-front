interface HeaderMenuProps {
  logOut: Function
  authorized?: boolean
  authInProgress?: boolean
  username?: string
}

const HeaderMenuDefault: HeaderMenuProps = {
  authorized: false,
  authInProgress: false,
}
