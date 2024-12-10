import {
  AuthenticationIcon,
  CalendarIcon,
  ChartIcon,
  DashboardIcon,
  FormsIcon,
  ProfileIcon,
  SettingsIcon,
  TablesIcon,
  UiElementIcon,
} from '../images/sidebar';

const sidebarItems = [
  {
    title: 'MENU',
    links: [
      {
        label: 'Dashboard',
        to: '/',
        icon: DashboardIcon,
        subLinks: [{ label: 'eCommerce', to: '/' }],
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
        label: 'Forms',
        to: '#',
        icon: FormsIcon,
        subLinks: [
          { label: 'Form Elements', to: '/forms/form-elements' },
          { label: 'Form Layout', to: '/forms/form-layout' },
        ],
      },
      {
        label: 'Tables',
        to: '/tables',
        icon: TablesIcon,
      },
      {
        label: 'Settings',
        to: '/settings',
        icon: SettingsIcon,
      },
    ],
  },
  {
    title: 'OTHERS',
    links: [
      {
        label: 'Chart',
        to: '/chart',
        icon: ChartIcon,
      },
      {
        label: 'UI Elements',
        to: '#',
        icon: UiElementIcon,
        subLinks: [
          { label: 'Alerts', to: '/ui/alerts' },
          { label: 'Buttons', to: '/ui/buttons' },
        ],
      },
      {
        label: 'Authentication',
        to: '#',
        icon: AuthenticationIcon,
        subLinks: [
          { label: 'Sign In', to: '/auth/signin' },
          { label: 'Sign Up', to: '/auth/signup' },
        ],
      },
    ],
  },
];

export default sidebarItems;
