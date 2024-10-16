import {
	Tag,
	Users,
	Settings,
	Bookmark,
	SquarePen,
	LayoutGrid,
	LucideIcon,
} from 'lucide-react'

type Submenu = {
	href: string
	label: string
	active: boolean
}

type Menu = {
	href: string
	label: string
	active: boolean
	icon: LucideIcon
	submenus: Submenu[]
}

type Group = {
	groupLabel: string
	menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
	return [
		{
			groupLabel: '',
			menus: [
				{
					href: '/dashboard',
					label: 'Dashboard',
					active: pathname.includes('/dashboard'),
					icon: LayoutGrid,
					submenus: [],
				},
			],
		},
		{
			groupLabel: 'Contents',
			menus: [
				{
					href: '/dashboard/candidates',
					label: 'Candidates',
					active: pathname.includes('/dashboard/candidates'),
					icon: SquarePen,
					submenus: [],
				},
				{
					href: '/dashboard/votes',
					label: 'Votes',
					active: pathname.includes('/dashboard/votes'),
					icon: Bookmark,
					submenus: [],
				},
			],
		},
		{
			groupLabel: 'Settings',
			menus: [
				{
					href: '/dashboard/users',
					label: 'Users',
					active: pathname.includes('/users'),
					icon: Users,
					submenus: [],
				},
				{
					href: '/dashboard/account',
					label: 'Account',
					active: pathname.includes('/dashboard/account'),
					icon: Settings,
					submenus: [],
				},
			],
		},
	]
}
