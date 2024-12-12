import {
  CalendarIcon,
  DashboardIcon,
  ProfileIcon,
  SettingsIcon,
} from '../images/sidebar';

const sidebarItems = [
  {
    title: 'MENU',
    links: [
      {
        label: 'Dashboard',
        to: '/dashboard',
        icon: DashboardIcon,
      },
      {
        label: 'Calendar',
        to: '/calendar',
        icon: CalendarIcon,
      },
      {
        label: 'Profile',
        to: '/profile',
        icon: ProfileIcon,
      },
      {
        label: 'Categories',
        to: '/categories',
        icon: ProfileIcon,
      },
      {
        label: 'Products',
        to: '/products',
        icon: ProfileIcon,
      },
      {
        label: 'Settings',
        to: '/settings',
        icon: SettingsIcon,
      },
    ],
  },
];

export default sidebarItems;
