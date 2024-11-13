import { useRef, useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import sidebarItems from '../../data/menu';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/logo.svg';
import { ChevronLeftIcon, DropDownIcon } from '../../images/sidebar/index';

const Sidebar = ({ sidebarOpen, setSidebarOpen }: any) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) document.body.classList.add('sidebar-expanded');
    else document.body.classList.remove('sidebar-expanded');
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {sidebarItems.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                {section.title}
              </h3>
              <ul className="mb-6 flex flex-col gap-1.5">
                {section.links.map((item, idx) =>
                  item.subLinks ? (
                    <SidebarLinkGroup
                      key={idx}
                      activeCondition={
                        pathname === item.to || pathname.includes(item.to)
                      }
                    >
                      {(handleClick, open) => (
                        <>
                          <NavLink
                            to={item.to}
                            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              pathname.includes(item.to) &&
                              'bg-graydark dark:bg-meta-4'
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            {item.icon && <item.icon />}
                            {item.label}
                            <DropDownIcon
                              className={`${open && 'rotate-180'}`}
                            />
                          </NavLink>
                          <div
                            className={`translate transform overflow-hidden ${
                              !open && 'hidden'
                            }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              {item.subLinks?.map(
                                (subItem: any, subIdx: number) => (
                                  <li key={subIdx}>
                                    <NavLink
                                      to={subItem.to}
                                      className={({ isActive }) =>
                                        'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                        (isActive && '!text-white')
                                      }
                                    >
                                      {subItem.label}
                                    </NavLink>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </>
                      )}
                    </SidebarLinkGroup>
                  ) : (
                    <li key={idx}>
                      <NavLink
                        to={item.to}
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes(item.to) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        {item.icon && <item.icon />}
                        {item.label}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
