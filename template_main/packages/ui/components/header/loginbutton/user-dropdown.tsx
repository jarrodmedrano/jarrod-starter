import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
const links = ['stories', 'characters', 'locations', 'timelines']

const UserLinks: ({ user }: { user: any }) => JSX.Element = ({
  user,
}: {
  user: any
}) => {
  return (
    <>
      {links.map((link) => {
        return (
          <a key={'user' + link} href={`/user/${user?.id}/${link}`}>
            <DropdownMenuItem>{link}</DropdownMenuItem>
          </a>
        )
      })}
    </>
  )
}

const CreateLinks = () => {
  return (
    <>
      {links.map((link) => {
        return (
          <a key={'create' + link} href={`/create/${link}`}>
            <DropdownMenuItem>{link}</DropdownMenuItem>
          </a>
        )
      })}
    </>
  )
}

const UserDropdown = ({ user, logOut }: { user: any; logOut: () => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image || user?.imageUrl} />
          <AvatarFallback>
            {user?.name[0] + user?.name[1] || user?.firstName}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user?.name || user?.firstName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <a href={`/user/${user?.id}`}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </a>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <UserLinks user={user} />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Create New</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <CreateLinks />
                <DropdownMenuSeparator />
                <a href={`/create/`}>
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </a>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
